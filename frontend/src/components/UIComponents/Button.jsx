import { forwardRef } from "react";

const Button = (
  {
    children,
    type = "button",
    className = "",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    ...props
  },
  ref
) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 ${bgColor} ${textColor} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);
