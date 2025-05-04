import React, { useRef, useState } from "react"
import { Button } from "@/components/atoms/ui/button"
import { Calendar } from "@/components/atoms/ui/calendar"
import { DynamicFormHandles, DynamicForm } from "../molecules/Dynamic-form"
import type { FormField } from "@/types/formTypes"
import { FormProvider, useForm } from "react-hook-form"
import { FormSection } from "@/components/organisms/FormSection"
import {FormField as ShadcnFormField, FormControl, FormItem, FormMessage } from "../atoms/ui/form"
import { Input } from "../atoms/ui/input-form"
import useGeneratePdfInvestigator from "@/hooks/pdf/useGeneratePdfByInvestigator"

export const CreateCaseTemplate: React.FC = () => {
  // --- react-hook-form para los campos custom en los fragments ---
  const methods = useForm<{ genero_doctor: string }>({
    defaultValues: { genero_doctor: "" },
    mode: "onChange" 
  })
  const { watch, getValues: getOuterValues } = methods
  const genero = watch("genero_doctor")
  const sufijo = genero === "Femenino" ? "investigadora" : "investigador"
  const tituloDoc = genero === "Femenino" ? "Dra." : "Dr."
  const { fetchPdfInvestigator, pdfUrl, loading } = useGeneratePdfInvestigator();
  // --- refs a cada segmento de DynamicForm ---
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
      label: "¿Por qué se debe realizar este estudio?",
      placeholder: "Describa brevemente el problema y la pertinencia del estudio",
      required: true,
    },
    {
      key: "objetivo",
      type: "textarea",
      label: "¿Cuál es el objetivo de este estudio?",
      placeholder: "Enuncie el objetivo general",
      required: true,
    },
    {
      key: "def_estudio",
      type: "textarea",
      label: "¿En qué consiste el estudio?",
      placeholder: "Describa procedimientos, intervenciones y propósito",
      required: true,
    },
    {
      key: "riesgos",
      type: "textarea",
      label: "¿Cuáles son los riesgos esperados?",
      placeholder: "Describa molestias y riesgos",
      required: true,
    },
    {
      key: "beneficios",
      type: "textarea",
      label: "¿Cuáles son los beneficios?",
      placeholder: "Enuncie beneficios",
      required: true,
    },
    {
      key: "confidencialidad",
      type: "textarea",
      label: "Manejo de datos personales",
      placeholder:
        "Explique almacenamiento, custodia, acceso, anonimización",
      required: true,
    },
    {
      key: "p_alternativos",
      type: "textarea",
      label: "¿Existen procedimientos alternativos?",
      placeholder: "Describa otras opciones médicas o terapéuticas",
      required: true,
    },
    {
      key: "compromiso_info",
      type: "textarea",
      label:
        "8. Expresar el compromiso de proporcionar información actualizada obtenida durante el estudio...",
      placeholder:
        "En caso de estudios que requieran entrega de resultados o consejería, explicar el proceso.",
      required: true,
    },
    {
      key: "ob_financiera",
      type: "textarea",
      label: "¿Existen costos para el participante?",
      placeholder: "Indique gastos cubiertos y no cubiertos",
      required: true,
    },
    {
      key: "duracion",
      type: "textarea",
      label: "Duración de la participación",
      placeholder: "Especifique duración y frecuencia",
      required: true,
    },
    {
      key: "afectaciones",
      type: "textarea",
      label: "¿Qué pasa si me retiro?",
      placeholder:
        "Indique que el retiro no afecta derechos ni tratamientos",
      required: true,
    },
    {
      key: "asentimiento_informado",
      type: "textarea",
      label:
        "Autorización para valoración de asentimiento informado – Res. 8430/1993",
      placeholder:
        "Explique que se solicitará Asentimiento Informado y valoración según Res. 8430.",
      required: true,
    },
    {
      key: "riesgo_salud_poliza",
      type: "textarea",
      label:
        "¿Qué sucede si esta investigación afecta directamente mi salud?",
      placeholder:
        "Explique cobertura de atención y póliza de responsabilidad civil",
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
        { value: "Femenino",  label: "Femenino" },
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
                         /* 1) actualiza el DynamicForm */
                         field.onChange(e)
                         /* 2) actualiza el formulario externo para el sufijo */
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
    { key:"nombre_estudio",       type:"text",     required:true, hidden:true },
    { key:"genero_inv_principal", type:"select",   required:true, hidden:true,
      options:[ {value:"Masculino",label:"Masculino"},
                {value:"Femenino", label:"Femenino"} ] },
    { key:"nombre_inv_principal",        type:"text",     required:true, hidden:true },
    { key:"cel_inv_principal",    type:"number",   required:true, hidden:true },
    { key:"ext_inv_principal",    type:"number",   required:true, hidden:true },
    { key:"tel_inv_principal",    type:"number",   required:true, hidden:true },
    { key:"nombre_presidente",    type:"text",     required:true, hidden:true },

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
  const url = await fetchPdfInvestigator(allData);
    if (url) {
      console.log("Datos recibidos PDF:", url) 

      // por ejemplo, abrir en una nueva pestaña
      //window.open(url, "_blank");
    }
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
        />

        <Button type="submit" variant="form" size="lg">
          Descargar en PDF
        </Button>
      </form>
    </FormProvider>
  )
}
