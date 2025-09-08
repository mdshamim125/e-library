import * as React from "react";
import { useId } from "react";

// ✅ Forward ref and allow props like onChange
const InputFile = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const id = useId();
  return (
    <input
      id={id}
      type="file"
      ref={ref}
      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                 focus:outline-none file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 
                 file:py-1 file:text-sm file:font-medium hover:file:bg-gray-200
                 dark:text-gray-300 dark:border-gray-600 dark:file:bg-gray-800 dark:file:text-gray-200 
                 dark:hover:file:bg-gray-700"
      {...props}
    />
  );
});

InputFile.displayName = "InputFile";

export default InputFile;
