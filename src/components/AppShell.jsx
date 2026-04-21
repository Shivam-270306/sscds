import { useState } from "react";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar onOpenSidebar={() => setOpen(true)} />
      {open && <Sidebar onClose={() => setOpen(false)} />}
      <main>{children}</main>
    </>
  );
}
