import { classMerge } from "../utils/classMerge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "base" | "icon" | "iconSmall";
};

const variants = {
  button: {
    base: "h-12",
    icon: "h-12 w-12",
    iconSmall: "h-8 w-8",
  },
};

export function Button({
  children,
  isLoading,
  className,
  type = "button",
  variant = "base",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      {...rest}
      //permite concatenar as classes com este util 'classMerge'
      className={classMerge([
        "flex items-center justify-center bg-green-100 rounded-lg text-white cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50 ",variants.button[variant],
        // permite que atraves da prop 'className' definida no componente seja mesclada as demais(tem maior relevancia e deve ser passada no final)
        isLoading && "cursor-progress",
        className, 
      ])}
    >
      {children}
    </button>
  );
}
