import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  title?: string;
  message?: string;
}

export const LoadingState = ({
  title = "Loading...",
  message = "Please wait while we fetch the data",
}: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h p-4">
      <Loader2 className="h-12 w-12 animate-spin text-violet-600 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2 text-center">{message}</p>
    </div>
  );
};