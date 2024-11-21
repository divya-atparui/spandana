import { FileQuestion } from "lucide-react";

interface NoDataStateProps {
  title?: string;
  message?: string;
}

export const NoDataState = ({
  title = "No Data Found",
  message = "We couldn't find the information you're looking for",
}: NoDataStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
      <FileQuestion className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2 text-center max-w-md">{message}</p>
    </div>
  );
};