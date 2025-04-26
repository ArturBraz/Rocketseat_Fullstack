import { useActionState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(onSignIn, {email:"",password:""});

  async function onSignIn(prevState: any, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    // console.log(prevState);

    return {email,password}
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input
        required
        legend="E-mail"
        type="email"
        placeholder="seu@email.com"
        name="email"
        defaultValue={String(state?.email)}
      />

      <Input
        required
        legend="Senha"
        type="password"
        placeholder="123456"
        name="password"
        defaultValue={String(state?.password)}

      />

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>
      <a
        href="/signup"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
  );
}
