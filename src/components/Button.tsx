import { VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "./buttonStyles";

type ButtonProps = VariantProps<typeof buttonStyles> &
  React.ComponentProps<"button">;

function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
}

export default Button;
