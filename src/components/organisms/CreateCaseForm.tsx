import { useRef, useState } from "react";
import { Button } from "@/components/atoms/ui/button";
import { Calendar } from "@/components/atoms/ui/calendar";
import { Input } from "@/components/atoms/ui/input-form"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/atoms/ui/collapsible";
import { DynamicFormHandles, DynamicForm } from "../molecules/Dynamic-form";
import type { FormField } from "@/types/formTypes";
import { FormProvider, useForm } from "react-hook-form";
import { FormField as ShadcnFormField, FormItem, FormControl, FormMessage } from "../atoms/ui/form";

export const CreateCaseForm = () => {
  const formRef = useRef<DynamicFormHandles>(null);

  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const methods = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [openIntro, setOpenIntro] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const [openAuth, setOpenAuth] = useState(false)

  const [openSections, setOpenSections] = useState({
    intro: true,
    info: true,
    auth: true,
  });

  const handleToggle = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const validateCustomFields = () => {
    const requiredFields = [
      "nombrePatrocinador",
      "nombreCompania",
      "direccionCompania",
      "nombreInvestigador",
      "celularInvestigador",
      "nombreDirectoraInvestigaciones",
      "contactoDirectoraInvestigaciones",
      "nombreEstudio",
      "nombreInvestigadorAutorizacion",
      "celularInvestigadorAutorizacion",
      "nombrePresidenteEtica",
    ];
  
    const errors: { [key: string]: string } = {};
    requiredFields.forEach((field) => {
      if (!formValues[field]?.trim()) {
        errors[field] = "Este campo es requerido";
      }
    });
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleInputChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };
 
  

  const cabeceraFields: FormField[] = [
    {
      key: "version",
      type: "text",
      label: "Versión",
      placeholder: "Ingresa la versión del FCI",
      required: true,
    },
  ];
  
  const introduccionFields: FormField[] = [
    { key: "codigoSujeto", type: "text", label: "Código del Sujeto", placeholder: "Ingrese el código del sujeto asignado", required: true },
    { key: "nombreProyecto", type: "text", label: "Nombre del Proyecto", placeholder: "Ingrese el nombre completo del proyecto", required: true },
    { key: "institucionesParticipantes", type: "text", label: "Institución(es) Participantes", placeholder: "Ingrese el nombre de la(s) institución(es) participante(s)", required: true },
  ];

  const informacionGeneralFields: FormField[] = [
    { key: "problemaEstudio", type: "textarea", label: "¿Por qué se debe realizar este estudio?", placeholder: "Describa brevemente el problema y la pertinencia del estudio", required: true },
    { key: "objetivoEstudio", type: "textarea", label: "¿Cuál es el objetivo de este estudio?", placeholder: "Enuncie el objetivo general", required: true },
    { key: "descripcionEstudio", type: "textarea", label: "¿En qué consiste el estudio?", placeholder: "Describa procedimientos, intervenciones y propósito", required: true },
    { key: "riesgos", type: "textarea", label: "¿Cuáles son los riesgos esperados?", placeholder: "Describa molestias y riesgos", required: true },
    { key: "beneficios", type: "textarea", label: "¿Cuáles son los beneficios?", placeholder: "Enuncie beneficios", required: true },
    { key: "manejoDatos", type: "textarea", label: "Manejo de datos personales", placeholder: "Explique almacenamiento, custodia, acceso, anonimización", required: true },
    { key: "procedimientosAlternativos", type: "textarea", label: "¿Existen procedimientos alternativos?", placeholder: "Describa otras opciones médicas o terapéuticas", required: true },
    { key: "obligacionesFinancieras", type: "textarea", label: "¿Existen costos para el participante?", placeholder: "Indique gastos cubiertos y no cubiertos", required: true },
    { key: "duracionParticipacion", type: "textarea", label: "Duración de la participación", placeholder: "Especifique duración y frecuencia", required: true },
    { key: "retiroEstudio", type: "textarea", label: "¿Qué pasa si me retiro?", placeholder: "Indique que el retiro no afecta derechos ni tratamientos", required: true },
    { key: "asentimientoInformado", type: "textarea", label: "Autorización para valoración de asentimiento informado - En estudios en los que se involucran menores de edad o discapacitados físicos y mentales adultos, que propongan intervenciones o procedimientos que superan el riesgo mínimo ", placeholder:
          "Explique que al menor de edad o la persona representada se le solicitará su aceptación para ingresar al estudio mediante un Asentimiento Informado. Debe aclarar que se hará una valoración por parte de psicólogo, neurólogo o psiquiatra según la Resolución 8430 de 1993.", required: true },
    { key: "riesgoSaludYPoliza", type: "textarea", label: "¿Qué sucede si esta investigación afecta directamente mi salud?", placeholder:
          "Explique que el estudio está diseñado para evitar efectos nocivos, y que en caso de presentarse, el equipo investigador garantizará atención en salud. Si es un ensayo clínico, indique que existe una póliza de responsabilidad civil y detalle la aseguradora.", required: true },
    {
      key: "textoLegal",
      type: "custom",
      component: (
        <div className="text-sm text-gray-700 leading-[2] space-y-3 border-t pt-4 mt-4">
          <p>
            Si bien es poco probable que se produzca una lesión, el/la{" "}
            <ShadcnFormField
                name="nombrePatrocinador"
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
                />

            realizará el pago de los gastos médicos relacionados con una lesión directamente causada por medicamentos administrados o procedimientos realizados.
          </p>
          <p>
            Para garantizar la cobertura,{" "}
            <ShadcnFormField
                name="nombrePatrocinador"
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
                )} /> ha contratado un seguro con la compañía{" "}
             <ShadcnFormField
                name="nombreCompania"
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
                /> ubicada en{" "}
            <ShadcnFormField
                name="direccionCompania"
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
            />.
          </p>
          <p>
            En caso de emergencia, contacte al/la investigador/a{" "}
            <ShadcnFormField
                name="nombreInvestigador"
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
            />, celular{" "}
            <ShadcnFormField
                name="celularInvestigador"
                render={({ field }) => (
                    <FormItem className="inline-block">
                    <FormControl>
                        <Input
                        {...field}
                        inputType="text"
                        placeholder="Celular"
                        className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                        />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 ml-1" />
                    </FormItem>
                )}
                />. También puede contactar a la directora de la Oficina de Investigaciones:{" "}
            <ShadcnFormField
                name="nombreDirectoraInvestigaciones"
                render={({ field }) => (
                    <FormItem className="inline-block">
                    <FormControl>
                        <Input
                        {...field}
                        inputType="text"
                        placeholder="Nombre directora"
                        className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                        />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 ml-1" />
                    </FormItem>
                )}
                />,{" "}
            <ShadcnFormField
                name="contactoDirectoraInvestigaciones"
                render={({ field }) => (
                    <FormItem className="inline-block">
                    <FormControl>
                        <Input
                        {...field}
                        inputType="text"
                        placeholder="Contacto"
                        className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                        />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 ml-1" />
                    </FormItem>
                )}
                />.
          </p>
          <p>
            Al firmar este formulario usted no renuncia a ningún derecho legal, ni acepta pagar los gastos médicos.
          </p>
        </div>
      ),
    },
  ];

  const autorizacionFields: FormField[] = [
    {
      key: "textoAutorizacion",
      type: "custom",
      component: (
        <div className="text-sm text-gray-700 leading-[2] space-y-4 border-t pt-4 mt-4">
          <p>
            He comprendido las explicaciones que en un lenguaje claro y sencillo se me han brindado. El investigador me ha permitido expresar todas mis observaciones y ha aclarado todas las dudas y preguntas que he planteado respecto a los fines, métodos, ventajas, inconvenientes y pronóstico de participar en el estudio. Se me ha proporcionado una copia de este documento.
          </p>
          <p>
            Al firmar este documento doy mi consentimiento voluntario para participar en el estudio{" "}
            <ShadcnFormField
              name="nombreEstudio"
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
          </p>
          <p className="pt-4">
            Si usted tiene dudas acerca de su participación en este estudio puede comunicarse con el investigador principal: Dr./Dra.{" "}
            <ShadcnFormField
              name="nombreInvestigadorAutorizacion"
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
              name="celularInvestigadorAutorizacion"
              render={({ field }) => (
                <FormItem className="inline-block">
                  <FormControl>
                    <Input
                      {...field}
                      inputType="text"
                      placeholder="número de celular"
                      className="inline text-sm px-1 py-[2px] h-6 border rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 ml-1" />
                </FormItem>
              )}
            />.
          </p>
          <p>
            También puede comunicarse con el Presidente del Comité de Ética Institucional:{" "}
            <ShadcnFormField
              name="nombrePresidenteEtica"
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
          </p>
        </div>
      ),
    },
  ];

const handleSubmit = (data: { [key: string]: any }) => {
  setSubmitted(true); // activa el modo validación visual
  const isValid = validateCustomFields();
  if (!isValid) return;
  console.log("Datos enviados:", { ...data, ...formValues });
};

  
  

  return (
    <FormProvider {...methods}>
        <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-6"
        >
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-[#111827]">Crear nuevo caso</h1>
      <p className="text-center text-gray-500 mb-6">
        Llena cada uno de los campos requeridos del consentimiento informado
      </p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-6">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#111827]"></label>
                <DynamicForm
                    ref={formRef}
                    formDataConfig={cabeceraFields}
                    onSubmit={handleSubmit}
                    containerClassName="flex flex-col gap-6"
                />

                </div>
                <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#111827]">Fecha</label>
                <Calendar mode="single" />
                </div>
            </div>

            <div className="flex flex-col gap-4">
            <Collapsible open={openSections.intro} onOpenChange={() => handleToggle("intro")}>
                <CollapsibleTrigger asChild>
                <button
                    type="button"
                    className="w-full bg-white text-[#111827] p-4 rounded-md shadow border border-gray-300 text-left font-semibold"
                >
                    Introducción
                </button>
                </CollapsibleTrigger>
                <CollapsibleContent  className="p-4 border border-gray-300 rounded-md flex flex-col gap-4">
                <DynamicForm
                    ref={formRef}
                    formDataConfig={introduccionFields}
                    initialData={formValues}
                    onChange={(values) => setFormValues(prev => ({ ...prev, ...values }))}
                    onSubmit={handleSubmit}
                    containerClassName="flex flex-col gap-6"
                />
                </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openSections.info} onOpenChange={() => handleToggle("info")}>
                <CollapsibleTrigger asChild>
                    <button
                    type="button"
                    className="w-full bg-white text-[#111827] p-4 rounded-md shadow border border-gray-300 text-left font-semibold"
                    >
                    Información general
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border border-gray-300 rounded-md flex flex-col gap-4">
                    <DynamicForm
                    ref={formRef}
                    formDataConfig={informacionGeneralFields}
                    initialData={formValues}
                    onChange={(values) => setFormValues(prev => ({ ...prev, ...values }))}
                    onSubmit={handleSubmit}
                    containerClassName="flex flex-col gap-6"
                    />
                </CollapsibleContent>
                </Collapsible>

                <Collapsible open={openSections.auth} onOpenChange={() => handleToggle("auth")}>
                <CollapsibleTrigger asChild>
                    <button
                    type="button"
                    className="w-full bg-white text-[#111827] p-4 rounded-md shadow border border-gray-300 text-left font-semibold"
                    >
                    Autorización
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border border-gray-300 rounded-md flex flex-col gap-4">
                    <DynamicForm
                    ref={formRef}
                    formDataConfig={autorizacionFields}
                    initialData={formValues}
                    onChange={(values) => setFormValues(prev => ({ ...prev, ...values }))}
                    onSubmit={handleSubmit}
                    containerClassName="flex flex-col gap-6"
                    />
                </CollapsibleContent>
                </Collapsible>

            </div>
        </form>
     </FormProvider>

      <Button variant="form" size="lg"
        onClick={() => formRef.current?.handleSubmit(handleSubmit)()}
      >
        Descargar en PDF
      </Button>
    </div>
    </form>
    </FormProvider>
  );
};

