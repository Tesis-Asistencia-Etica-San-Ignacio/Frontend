import { CreateCaseForm } from "../organisms/CreateCaseForm";

export const CreateCaseTemplate = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
     
    
      <main className="flex-1 flex justify-center p-8">
        <CreateCaseForm />
      </main>
    </div>
  );
};
