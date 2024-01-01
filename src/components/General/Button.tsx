import { FC, ReactNode } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      onKeyDown={(e) => e.preventDefault()}
      className={`relative p-4 w-max rounded-md duration-100 hover:bg-[#ffffff21] hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
