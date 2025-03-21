import FileInput from "@/components/organisms/File-input";
import { Toaster } from "../atoms/ui/sonner";

export default function DropFilesTemplate() {
    return (
        <div className="min-h-[calc(100vh-4.8rem)] flex p-8">
            <Toaster />
            <div className="w-full h-full">
                <h1 className="text-xl font-bold mb-4">Subir Archivos</h1>
                <div></div>
                    <FileInput />
            </div>
        </div>
    );
}
