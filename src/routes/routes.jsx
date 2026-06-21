import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Weekly } from "../pages/Weekly";
import { Tasks } from "../pages/Tasks";
import { Pomodoro } from "../pages/Pomodoro";
import { Topbar } from "../components/Topbar";
import { Settings } from "../pages/Settings";

export function Rotas() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Weekly />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </BrowserRouter>
  );
}
