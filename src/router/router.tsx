import { Route, Routes } from "react-router-dom";

import { ListPage, ProjectPage } from "@/pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/project/" element={<ProjectPage />} />
    </Routes>
  );
};
