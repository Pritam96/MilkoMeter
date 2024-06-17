import { useId, forwardRef } from "react";

const Input = ({ label, type = "text", className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="mt-3">
      {label && (
        <label htmlFor={id} className="text-base font-medium">
          {" "}
          {label}{" "}
        </label>
      )}
      <div className="mt-2">
        <input
          type={type}
          className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
};

export default forwardRef(Input);
