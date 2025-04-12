import { Route, Routes } from "react-router-dom";

import { ListPage } from "@/pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/SITE" element={<ListPage />} />
      {/*<Route path="/project/:id" element={<Project />} /> */}
    </Routes>
  );
};
