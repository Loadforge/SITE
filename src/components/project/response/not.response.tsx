import Logo from "../../../assets/Logo_black.svg";

export function NotResponse() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center select-none px-4">
      <img
        src={Logo}
        alt="Logo da aplicação"
        className="w-24 h-24 mb-6 "
      />

      <h1 className="text-2xl sm:text-3xl font-bold text-text">
        Click Send to get a response
      </h1>
      <p className="mt-2 text-sm text-text/50">
        When you send a request, the response will appear here.
      </p>
    </div>
  );
}
