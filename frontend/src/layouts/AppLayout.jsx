import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Receipt,
  LogOut,
} from "lucide-react";

export default function AppLayout() {
  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      label: "Invoices",
      icon: <FileText size={20} />,
      path: "/invoices",
    },
    {
      label: "Clients",
      icon: <Users size={20} />,
      path: "/clients",
    },
    {
      label: "Expenses",
      icon: <Receipt size={20} />,
      path: "/expenses",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex bg-[#1a1a1a] text-white min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111] p-6 flex flex-col border-r border-[#333]">
        <h1 className="text-2xl font-bold text-center mb-10">
          ET<span className="text-[#3194A0]">Invoice</span>
        </h1>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
                 transition-all 
                 ${
                   isActive
                     ? "bg-[#3194A0] text-white"
                     : "hover:bg-[#222] text-gray-300"
                 }`
              }
            >
              {item.icon} <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 mt-6"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-auto bg-[#1a1a1a]">
        <Outlet />
      </main>
    </div>
  );
}
