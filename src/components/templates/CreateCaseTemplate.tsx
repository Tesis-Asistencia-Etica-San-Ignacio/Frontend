import React from "react";

interface Props {
  /* cabecera */
  headerTitle: string;
  description: string;

  /* bloques JSX ya preparados por la pantalla */
  cabeceraForm:   React.ReactNode;
  introSection:   React.ReactNode;
  infoSection:    React.ReactNode;
  authSection:    React.ReactNode;
  guardarButton:  React.ReactNode;

  /* extras opcionales */
  spellingWarnings?: React.ReactNode;
  modalForm?:        React.ReactNode;

  /* submit viene de la Screen */
  onFormSubmit: () => void;
}

export const CreateCaseTemplate: React.FC<Props> = ({
  headerTitle,
  description,
  cabeceraForm,
  introSection,
  infoSection,
  authSection,
  guardarButton,
  spellingWarnings,
  modalForm,
  onFormSubmit,
}) => (
  <form
      onSubmit={(e) => {
        e.preventDefault();      // ⬅️  ¡esto evita el refresh!
        onFormSubmit();          //    ya no pasamos el evento
      }}
    className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-6"
  >
    <h1 className="text-3xl font-bold text-center text-[#111827]">
      {headerTitle}
    </h1>

    <p className="text-center text-gray-500">{description}</p>

    {/* Cabecera */}
    {/* <div className="p-4 border border-gray-300 rounded-md mb-6">
      
    </div> */}

    {/* Secciones */}
    {cabeceraForm}
    {introSection}
    {infoSection}
    {authSection}

    {/* Botón guardar */}
    <div>{guardarButton}</div>

    {/* Warnings ortográficos */}
    {spellingWarnings}

    {/* Modal PDF */}
    {modalForm}
  </form>
);

export default CreateCaseTemplate;


