import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./modules/landing-page";
import { Protect } from "@clerk/clerk-react";
import NotFound from "./components/NotFound";
import Dashboard from "./modules/Dashboard";

export const routes = {
  home: "/",
  onBoarding: "/on-boarding",
  dashboard: "/dashboard",
  notFound: "*",
};

function RedirectToDashboard() {
  return <Navigate to={routes.home} />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<LandingPage />} />
        <Route
          path={routes.dashboard}
          element={
            <Protect fallback={<RedirectToDashboard />}>
              <Dashboard />
            </Protect>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
