import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./modules/landing-page";

export const routes = {
  home: "/",
  notFound: "*",
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
