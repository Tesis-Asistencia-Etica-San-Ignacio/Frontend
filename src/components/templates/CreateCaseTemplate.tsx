import React, { useRef, useState } from "react"
import { Button } from "@/components/atoms/ui/button"
import { Calendar } from "@/components/atoms/ui/calendar"
import { DynamicFormHandles, DynamicForm } from "../molecules/Dynamic-form"
import type { FormField } from "@/types/formTypes"
import { FormProvider, useForm } from "react-hook-form"
import { FormSection } from "@/components/organisms/FormSection"
import { FormField as ShadcnFormField, FormControl, FormItem, FormMessage } from "../atoms/ui/form"
import { Input } from "../atoms/ui/input-form"
import { LTMatch, checkSpellingWithLT } from "@/lib/api/languageApi"
import ModalForm from "../organisms/dialogs/ModalForm"
interface CreateCaseTemplateProps {
  onPreviewPdf: (allData: Record<string, any>) => Promise<void>;
  modalOpen: boolean;
  onModalOpenChange: (open: boolean) => void;
  onModalSubmit?: (data: any) => Promise<void> | void;
  modalFormFields: FormField[][];
  pdfUrl: string;
  loading: boolean;
}

export const CreateCaseTemplate: React.FC<CreateCaseTemplateProps> = ({
  onPreviewPdf,
  modalOpen,
  onModalOpenChange,
  onModalSubmit,
  modalFormFields,
}
) => {
  const methods = useForm<{ genero_doctor: string }>({
    defaultValues: { genero_doctor: "" },
    mode: "onChange"
  })
  const { watch, getValues: getOuterValues } = methods
  const genero = watch("genero_doctor")
  const sufijo = genero === "Femenino" ? "investigadora" : "investigador"
  const tituloDoc = genero === "Femenino" ? "Dra." : "Dr."

  const cabeceraRef = useRef<DynamicFormHandles>(null!)
  const introRef = useRef<DynamicFormHandles>(null!)
  const infoRef = useRef<DynamicFormHandles>(null!)
  const authRef = useRef<DynamicFormHandles>(null!)


  // --- estado global de valores y controles de secciones ---
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [fecha, setFecha] = useState<Date | undefined>(undefined)
  const [openSections, setOpenSections] = useState({
    intro: true,
    info: true,
    auth: true,
  })

  const [spellingWarnings, setSpellingWarnings] = useState<Record<string, LTMatch[]>>({})

  const handleToggle = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }


  const handleDateSelect = (date: Date | undefined) => {
    setFecha(date)
    if (date) {
      setFormValues(prev => ({
        ...prev,
        fecha: date.toISOString().split("T")[0]
      }))
    }
  }

  // recoge los cambios de cualquier DynamicForm
  const handleSectionChange = (vals: Record<string, string>) => {
    setFormValues((prev) => ({ ...prev, ...vals }))
  }

  const handleSpellCheck = (fieldKey: string, matches: LTMatch[]) => {
    setSpellingWarnings(prev => ({ ...prev, [fieldKey]: matches }))
  }

  const doSpellCheck = async (fieldKey: string, text: string, cb: (key: string, matches: LTMatch[]) => void) => {
    if (!text || text.trim() === "") return

    try {
      const matches = await checkSpellingWithLT(text)
      console.log("Matches para", fieldKey, matches)
      cb(fieldKey, matches)
    } catch (err) {
      console.error("Error al verificar ortografía:", err)
    }
  }
  // Configuración de campos
  const cabeceraFields: FormField[] = [
    {
      key: "version",
      type: "number",
      label: "Versión",
      placeholder: "Ingresa la versión del FCI",
      required: true,
    },
    {
      key: "codigo",
      type: "text",
      label: "Código",
      placeholder: "Ingresa el código del FCI",
      required: true,
    },
  ]

  const introduccionFields: FormField[] = [
    {
      key: "codigo_sujeto",
      type: "text",
      label: "Código del Sujeto",
      placeholder: "Ingrese el código del sujeto asignado",
      required: true,
    },
    {
      key: "nombre_proyecto",
      type: "text",
      label: "Nombre del Proyecto",
      placeholder: "Ingrese el nombre completo del proyecto",
      required: true,
    },
    {
      key: "instituciones",
      type: "text",
      label: "Institución(es) Participantes",
      placeholder: "Ingrese el nombre de la(s) institución(es) participante(s)",
      required: true,
    },
  ]

  const informacionGeneralFields: FormField[] = [
    {
      key: "problema",
      type: "textarea",
      label: "1.  ¿Por qué se debe realizar este estudio?",
      placeholder: "Describa brevemente el problema y la pertinencia del estudio",
      required: true,
    },
    {
      key: "objetivo",
      type: "textarea",
      label: "2.  ¿Cuál es el objetivo de este estudio?",
      placeholder: "Enuncie el objetivo general",
      required: true,
    },
    {
      key: "def_estudio",
      type: "textarea",
      label: "3.  ¿En qué consiste el estudio?",
      placeholder: "Describa de manera clara y sencilla los procedimientos, intervenciones y su propósito, incluyendo los experimentales (aleatorización, cegamiento, uso de placebo, etc.). ",
      required: true,
    },
    {
      key: "riesgos",
      type: "textarea",
      label: "4.	¿Cuáles son las molestias o los riesgos esperados? ",
      placeholder: "Describir molestias y riesgos. En caso de que no existan molestias o riesgos igualmente se debe informar.",
      required: true,
    },
    {
      key: "beneficios",
      type: "textarea",
      label: "5.	¿Cuáles son los beneficios que puedo obtener por participar? Enunciar ",
      placeholder: "Enunciar beneficios. En caso de que no existan beneficios igualmente se debe informar. ",
      required: true,
    },
    {
      key: "confidencialidad",
      type: "textarea",
      label: "6.	¿Existe confidencialidad en el manejo de mis datos? Este proyecto se acoge a la ley 1581 de 2012 (Hábeas Data) que aplica para el tratamiento de datos personales.",
      placeholder:
        "Indique brevemente cómo se manejarán los datos: Describa en dónde se almacenarán los datos e información, los mecanismos de custodia y seguridad de los mismos y el tiempo de custodia Describa quiénes tendrán acceso a la información y bajo qué parámetros de seguridad se accederá a ello Describa cómo se llevará a cabo la anonimización de los datos tanto para los análisis como para la publicación de los resultados. Describa la posibilidad de conocer los datos personales registrados en la base de datos del estudio, solicitar rectificación de los mismos y de retirar su consentimiento para el tratamiento de los datos en cualquier momento del estudio, excepto a partir de la anonimización.  -  Describa los procesos de transferencia de datos a terceros, en caso de estudios colaborativos, y la garantía de mantener la privacidad, confidencialidad y seguridad en el tratamiento por parte del tercero.",
      required: true,
    },
    {
      key: "p_alternativos",
      type: "textarea",
      label: "7.	¿Existen procedimientos alternativos que pudieran ser ventajosos para mi?",
      placeholder: "En caso de que se realicen intervenciones con dispositivos, procedimiento médico-quirúrgico o medicamentos explicar si existen otras intervenciones que puedan realizarse para la patología del paciente. ",
      required: true,
    },
    {
      key: "compromiso_info",
      type: "textarea",
      label:
        "8.  Expresar el compromiso de proporcionar información actualizada obtenida durante el estudio, aunque ésta pudiera afectar la voluntad del sujeto para continuar participando.",
      placeholder:
        "En caso de realización de estudios que requieran entrega de resultados de procedimiento o consejería (genética, por ejemplo), explicar el proceso.",
      required: true,
    },
    {
      key: "ob_financiera",
      type: "textarea",
      label: "9.	¿Existe alguna obligación financiera? Participar en este estudio no tiene ningún costo económico para usted",
      placeholder: "En caso contrario, enunciar costos generados por participar en el estudio, describir cuáles: transporte, alimentación etc. y la forma cómo serán asumidos con cargo al presupuesto del proyecto. ",
      required: true,
    },
    {
      key: "duracion",
      type: "textarea",
      label: "10.	¿Cuánto tiempo durará mi participación en el estudio? ",
      placeholder: "Indique el tiempo de participación y en caso de ser necesario la frecuencia de las intervenciones. ",
      required: true,
    },
    {
      key: "afectaciones",
      type: "textarea",
      label: "11.	¿Qué sucede si no deseo participa o me retiro del estudio? Usted puede decidir no participar o retirarse en cualquier momento del estudio, sin que esto afecte de manera alguna el tratamiento médico que necesita.",
      placeholder:
        "Indique que el retiro no afecta derechos ni tratamientos",
      required: true,
    },
    {
      key: "asentimiento_informado",
      type: "textarea",
      label:
        "12.	 Al menor de edad o la persona que usted representa se le solicitará informar su aceptación para ingresar al estudio a través de un Asentimiento Informado.  De acuerdo a la Resolución 8430 de 1993, el proceso de asentimiento debe estar precedido de una valoración de razonamiento entendimiento y lógica realizada por un psicólogo, neurólogo o psiquiatra.  A través de este documento se solicita su autorización para realizar la valoración. ",
      placeholder:
        "En estudios en los que se involucran menores de edad o discapacitados físicos y mentales adultos, que propongan intervenciones o procedimientos que superan el riesgo mínimo (no hacen parte del estándar de manejo), se debe evaluar la capacidad de entendimiento de acuerdo a la Res. 8430 de 1993. (Mantener o retirar el numeral 12 de acuerdo a la naturaleza del estudio)",
      required: true,
    },
    {
      key: "riesgo_salud_poliza",
      type: "textarea",
      label:
        "13.  ¿Qué sucede si esta investigación afecta directamente mi salud?",
      placeholder:
        "En estudios en los que se involucran menores de edad o discapacitados físicos y mentales adultos, que propongan intervenciones o procedimientos que superan el riesgo mínimo (no hacen parte del estándar de manejo), se debe evaluar la capacidad de entendimiento de acuerdo a la Res. 8430 de 1993. (Mantener o retirar el numeral 12 de acuerdo a la naturaleza del estudio)",
      required: true,
    },
    {
      key: "patrocinador",
      type: "text",
      required: true,
      hidden: true,
    },
    {
      key: "compania_seguro",
      type: "text",
      required: true,
      hidden: true,
    },
    {
      key: "dir_seguro",
      type: "text",
      required: true,
      hidden: true,
    },
    {
      key: "genero_doctor",
      type: "select",               // o "text"
      required: true,
      hidden: true,
      options: [
        { value: "Masculino", label: "Masculino" },
        { value: "Femenino", label: "Femenino" },
      ],
    },
    {
      key: "nombre_doctor",
      type: "text",
      required: true,
      hidden: true,
    },
    {
      key: "cel_doctor",
      type: "number",
      required: true,
      hidden: true,
    },
    {
      key: "nombre_dir_investigaciones",
      type: "text",
      required: true,
      hidden: true,
    },

    {
      key: "cel_correo_dir_investigaciones",
      type: "text",
      required: true,
      hidden: true,
    },
    {
      key: "textoLegal",
      type: "custom",
      component: (
        <div className="text-sm text-gray-700 leading-[2] space-y-3 border-t pt-4 mt-4">
          <div>
            Si bien es poco probable que se produzca una lesión, el/la{" "}
            <ShadcnFormField
              name="patrocinador"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="text"
                      placeholder="Nombre del patrocinador"
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                      onBlur={(e) => doSpellCheck("patrocinador", e.target.value, handleSpellCheck)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />{" "}
            realizará el pago de los gastos médicos relacionados con una lesión directamente causada por medicamentos administrados o procedimientos realizados.
          </div>
          <div>
            Para garantizar la cobertura,{" "}
            <ShadcnFormField
              name="compania_seguro"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="text"
                      placeholder="Nombre de la compañía"
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                      onBlur={async (e) => {
                        const texto = (e.target as HTMLInputElement).value;
                        const matches: LTMatch[] = await checkSpellingWithLT(texto);
                        handleSpellCheck("compania_seguro", matches);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />{" "}
            ubicada en{" "}
            <ShadcnFormField
              name="dir_seguro"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="text"
                      placeholder="Dirección"
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />
            .
          </div>
          <div>
            En caso que necesite información o emergencia, póngase en contacto con{" "}
            <ShadcnFormField

              name="genero_doctor"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        methods.setValue("genero_doctor", e.target.value, {
                          shouldValidate: false, // no lo validamos dos veces
                        })
                      }}
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                    >
                      <option value=""></option>
                      <option value="Masculino">el</option>
                      <option value="Femenino">la</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />{" "}
            {sufijo} {tituloDoc}{" "}
            <ShadcnFormField
              name="nombre_doctor"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="text"
                      placeholder="Nombre del investigador"
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                      onBlur={async (e) => {
                        const texto = (e.target as HTMLInputElement).value;
                        const matches: LTMatch[] = await checkSpellingWithLT(texto);
                        handleSpellCheck("nombre_doctor", matches);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />
            , celular{" "}
            <ShadcnFormField
              name="cel_doctor"
              render={({ field }) => (<FormItem className="inline-block">
                <FormControl>
                  <Input
                    {...field}
                    inputType="number"
                    placeholder="Celular del investigador"
                    className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 ml-1" />
              </FormItem>)}
            />
            . A fin de activar la póliza la investigadora contactará a la Directora de la Oficina de Investigaciones del Hospital Universitario San Ignacio,
            <ShadcnFormField
              name="nombre_dir_investigaciones"
              render={({ field }) => (<FormItem className="inline-block">
                <FormControl>
                  <Input
                    {...field}
                    inputType="text"
                    placeholder="Director/a Of. Investigaciones"
                    className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                    onBlur={async (e) => {
                      const texto = (e.target as HTMLInputElement).value;
                      const matches: LTMatch[] = await checkSpellingWithLT(texto);
                      handleSpellCheck("nombre_dir_investigaciones", matches);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 ml-1" />
              </FormItem>)}
            />{" "}
            <ShadcnFormField
              name="cel_correo_dir_investigaciones"
              render={({ field }) => (<FormItem className="inline-block">
                <FormControl>
                  <Input
                    {...field}
                    inputType="text"
                    placeholder="celular o correo email"
                    className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 ml-1" />
              </FormItem>)}
            />.
          </div>

          <p>
            Al firmar este formulario usted no renuncia a ningún derecho legal, ni acepta pagar los gastos médicos.
          </p>
        </div>
      ),
    },
  ]

  const autorizacionFields: FormField[] = [
    { key: "nombre_estudio", type: "text", required: true, hidden: true },
    {
      key: "genero_inv_principal", type: "select", required: true, hidden: true,
      options: [{ value: "Masculino", label: "Masculino" },
      { value: "Femenino", label: "Femenino" }]
    },
    { key: "nombre_inv_principal", type: "text", required: true, hidden: true },
    { key: "cel_inv_principal", type: "number", required: true, hidden: true },
    { key: "ext_inv_principal", type: "number", required: true, hidden: true },
    { key: "tel_inv_principal", type: "number", required: true, hidden: true },
    { key: "nombre_presidente", type: "text", required: true, hidden: true },

    {
      key: "textoAutorizacion",
      type: "custom",
      component: (
        <div className="text-sm text-gray-700 leading-[2] space-y-4 border-t pt-4 mt-4">
          <p>
            He comprendido las explicaciones que en un lenguaje claro y sencillo se me han brindado. El investigador me ha permitido expresar todas mis observaciones y ha aclarado todas las dudas y preguntas que he planteado respecto a los fines, métodos, ventajas, inconvenientes y pronóstico de participar en el estudio. Se me ha proporcionado una copia de este documento.
          </p>
          <div>
            Al firmar este documento doy mi consentimiento voluntario para participar en el estudio{" "}
            <ShadcnFormField
              name="nombre_estudio"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="text"
                      placeholder="nombre del estudio"
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                      onBlur={async (e) => {
                        const texto = (e.target as HTMLInputElement).value;
                        const matches: LTMatch[] = await checkSpellingWithLT(texto);
                        handleSpellCheck("nombre_estudio", matches);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />.
          </div>
          <div className="pt-4">
            Si usted tiene dudas acerca de su participación en este estudio puede comunicarse con el investigador principal:
            <ShadcnFormField
              name="genero_inv_principal"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <select
                      {...field}
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                    >
                      <option value=""></option>
                      <option value="Masculino">Dr.</option>
                      <option value="Femenino">Dra.</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />{" "}
            <ShadcnFormField
              name="nombre_inv_principal"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="text"
                      placeholder="nombre"
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                      onBlur={async (e) => {
                        const texto = (e.target as HTMLInputElement).value;
                        const matches: LTMatch[] = await checkSpellingWithLT(texto);
                        handleSpellCheck("nombre_inv_principal", matches);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />, celular{" "}
            <ShadcnFormField
              name="cel_inv_principal"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="number"
                      placeholder="número de celular"
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />, telefono{" "}
            <ShadcnFormField
              name="tel_inv_principal"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="number"
                      placeholder="télefono"
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />, ext.{" "}
            <ShadcnFormField
              name="ext_inv_principal"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="number"
                      placeholder="ext. "
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />.
          </div>
          <div>
            También puede comunicarse con el Presidente del Comité de Ética Institucional:{" "}
            <ShadcnFormField
              name="nombre_presidente"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="text"
                      placeholder="nombre presidente"
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                      onBlur={async (e) => {
                        const texto = (e.target as HTMLInputElement).value;
                        const matches: LTMatch[] = await checkSpellingWithLT(texto);
                        handleSpellCheck("nombre_presidente", matches);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />, Calle 42 No. 4–49, oficina 507. Teléfono 5946161 ext. 2470.
          </div>
        </div>
      ),
    },
  ]

  // Submit: recoge valores de todos los formularios + fecha
  /*const handleSubmitForm = async () => {
    let allData: Record<string, any> = { fecha, ...formValues }

    const refs = [cabeceraRef, introRef, infoRef, authRef]
    for (const ref of refs) {
      const inst = (ref.current as any)?.__formInstance
      if (inst) {
        Object.assign(allData, inst.getValues())
      }
    }
    Object.assign(allData, getOuterValues())

    console.log("Datos enviados:", allData)
    // Aquí podrías llamar a tu API o generar PDF, etc.
  }*/

  // dentro de handleSubmitForm
  const handleSubmitForm = async () => {
    /* 1)  validamos el “formulario externo” (los selects de género, etc.) */
    const outerValid = await methods.trigger()
    if (!outerValid) return               // aborta, se pintan los errores

    /* 2)  validamos cada DynamicForm */
    const refs = [cabeceraRef, introRef, infoRef, authRef]

    let everyValid = true
    for (const ref of refs) {
      if (ref.current) {
        const ok = await ref.current.trigger()   //  ←  usa el nuevo método
        if (!ok) everyValid = false
      }
    }
    if (!everyValid) return

    /* 3)  todas las secciones son válidas → ya podemos recolectar datos */
    const allData: Record<string, any> = { fecha, ...methods.getValues() }

    for (const ref of refs) {
      const inst = (ref.current as any)?.__formInstance
      if (inst) Object.assign(allData, inst.getValues())
    }

    console.log("Datos enviados:", allData)
    /*const url = await fetchPdfInvestigator(allData);
      if (url) {
        console.log("Datos recibidos PDF:", url) 
  */
    await onPreviewPdf(allData)
    // por ejemplo, abrir en una nueva pestaña
    //window.open(url, "_blank");
  }


  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmitForm()
        }}
        className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-6"
      >
        <h1 className="text-3xl font-bold text-center text-[#111827]">
          Crear nuevo caso
        </h1>
        <p className="text-center text-gray-500">
          Llena cada uno de los campos requeridos del consentimiento informado
        </p>

        <div className="p-4 border border-gray-300 rounded-md mb-6">
          <DynamicForm
            ref={cabeceraRef}
            formDataConfig={cabeceraFields}
            initialData={formValues}
            onChange={handleSectionChange}
            containerClassName="flex flex-col gap-4"
          />
        </div>

        {/* Fecha */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#111827]">Fecha</label>
          <Calendar
            mode="single"
            selected={fecha}
            onSelect={handleDateSelect}
          />
        </div>

        {/* Secciones */}
        <FormSection
          sectionKey="intro"
          title="Introducción"
          open={openSections.intro}
          onToggle={() => handleToggle("intro")}
          formRef={introRef}
          fields={introduccionFields}
          initialData={formValues}
          onChange={handleSectionChange}
          onSpellCheck={(key, text) => doSpellCheck(key, text, handleSpellCheck)}
          spellWarnings={spellingWarnings}

        />
        <FormSection
          sectionKey="info"
          title="Información general"
          open={openSections.info}
          onToggle={() => handleToggle("info")}
          formRef={infoRef}
          fields={informacionGeneralFields}
          initialData={formValues}
          onChange={handleSectionChange}
          onSpellCheck={(key, text) => doSpellCheck(key, text, handleSpellCheck)}
          spellWarnings={spellingWarnings}

        />
        <FormSection
          sectionKey="auth"
          title="Autorización"
          open={openSections.auth}
          onToggle={() => handleToggle("auth")}
          formRef={authRef}
          fields={autorizacionFields}
          initialData={formValues}
          onChange={handleSectionChange}
          onSpellCheck={(key, text) => doSpellCheck(key, text, handleSpellCheck)}
          spellWarnings={spellingWarnings}

        />
        <Button onClick={() => onModalOpenChange(true)}>
          Guardar
        </Button>

        {modalFormFields && onModalSubmit && (
          <ModalForm
            open={modalOpen}
            onOpenChange={onModalOpenChange}
            title={{ text: "Visualizador PDF consentimiento informado", align: "left" }}
            formDataConfig={modalFormFields}
            onSubmit={onModalSubmit}
            submitButtonText="Descargar"
            width="70%"
            height="90%"
          />
        )
        }
        {/* {modalFormFields && onModalSubmit && (
          <ModalForm
            open={open}
            onOpenChange={onOpenChange}
            title={{ text: "Enviar resultado de la evaluación", align: "left" }}
            formDataConfig={modalFormFields}
            onSubmit={onModalSubmit}
            submitButtonText="Enviar resultado"
            width="70%"
            height="80%"
          />
        )} */}

        {Object.entries(spellingWarnings).map(([key, matches]) =>
          matches.length > 0 ? (
            <div key={key} className="text-xs text-red-600 mb-2">
              <strong>{key}:</strong>
              <ul>
                {matches.map((m, i) => (
                  <li key={i}>
                    {m.message} → <em>{m.replacements.map(r => r.value).join(", ")}</em>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}

      </form>
    </FormProvider>
  )
}

