import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//O clsx pega como um Array e unifica tudo passado no className
//O twMerge valida e organiza as classes usadas pelo tailwind sem duplicidade

export function classMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
