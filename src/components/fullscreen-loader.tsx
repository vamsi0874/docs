import { LoaderIcon } from "lucide-react";

interface FullscreenLoaderProps {
    label?: string;
}

export const FullscreenLoader: React.FC<FullscreenLoaderProps> = ({ label }: FullscreenLoaderProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
            <LoaderIcon className="w-12 h-12 text-gray-500 animate-spin" />
            {label && <div className="ml-4 text-gray-500">{label}</div>}
        </div>
    );
}