import { ListPage } from "@/pages";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route path="/SITE" element={<ListPage />} />
      {/*<Route path="/project/:id" element={<Project />} /> */}
    </Routes>
  );
};
