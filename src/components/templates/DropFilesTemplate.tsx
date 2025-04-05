import FileInput from "@/components/organisms/File-input";
import { Toaster } from "../atoms/ui/sonner";

export default function DropFilesTemplate() {
    return (
        <section className="min-h-[calc(100vh-4.8rem)] ">
            <Toaster />
            <div className="w-full h-full">
                <h1 className="text-2xl font-bold tracking-tight mb-4">Subir Archivos</h1>
                <FileInput />
            </div>
        </section>
    );
}
