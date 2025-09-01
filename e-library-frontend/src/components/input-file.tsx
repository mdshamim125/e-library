
import * as React from "react";
import { useId } from "react";
import { Input } from "@/components/ui/input";

// ✅ Forward ref and allow props like onChange
const InputFile = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Input
        id={id}
        type="file"
        className="p-1 pe-3 file:me-3 file:border-0 file:border-e"
        ref={ref}
        {...props} // forward all other props like onChange
      />
    </div>
  );
});

InputFile.displayName = "InputFile";

export default InputFile;
