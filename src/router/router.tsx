import { HomePage } from "@/pages";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route path="/SITE" element={<HomePage />} />
    </Routes>
  );
};
