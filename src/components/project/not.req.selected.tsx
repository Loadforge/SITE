import Logo from "../../assets/Logo_black.svg";

import { Button } from "../ui";

export function NotReqSelected() {
  return (
    <div className="relative flex items-center justify-center w-full h-full ">
      <img
        src={Logo}
        alt="Logo de fundo"
        className="absolute opacity-10 w-full "
      />

      <div className="z-10 flex flex-col items-center justify-center w-full text-center">
        <h1 className="text-4xl font-bold ">Nenhuma requisição selecionada</h1>
        <p className="mt-2 mb-4 text-text/50">
          Selecione uma requisição ou crie uma nova para começar a trabalhar.
        </p>
        <Button>Criar nova requisição</Button>
      </div>
    </div>
  );
}
