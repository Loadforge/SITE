import Logo from "../../../assets/Logo_black.svg";

export function InDevelopment() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <img src={Logo} alt="Logo da aplicação" className="w-24 h-24 mb-6 " />
      <h1 className="text-2xl font-bold text-text mb-2">
        Feature under development
      </h1>
      <p className="text-text">
        We’re currently working on this feature. Stay tuned for updates!
      </p>
    </div>
  );
}

