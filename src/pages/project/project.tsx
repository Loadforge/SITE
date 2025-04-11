import { useParams } from "react-router-dom";

export function Project() {
  const { id } = useParams();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl text-text font-bold">Projeto ID: {id}</h1>
    </div>
  );
}
