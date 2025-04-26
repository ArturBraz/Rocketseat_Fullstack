import { Routes, Route } from "react-router";

import { NotFound } from "../pages/NotFound";
import { Refund } from "../pages/Refund";
import { AppLayout } from "../components/AppLayout";
import { Confirm } from "../pages/Confirm";

export default function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Refund />} />
        <Route path="/confirm" element={<Confirm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
