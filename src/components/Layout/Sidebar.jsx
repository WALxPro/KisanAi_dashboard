import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  FileText,
  Settings,
  BookOpen,
  Leaf,
  Menu,
  X,
} from "lucide-react";
import NavItem from "../UI/NavItem";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "ADS Management", path: "/dashboard/ads", icon: Megaphone },
  { title: "Farmers", path: "/dashboard/farmers", icon: Users },
  { title: "Blogs", path: "/dashboard/blogs", icon: FileText },
  { title: "Tutorial", path: "/dashboard/tutorial", icon: BookOpen },
  { title: "Settings", path: "/dashboard/settings", icon: Settings },
];

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  mobileOpen,
  setMobileOpen,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar transition-all duration-300 lg:relative lg:z-auto ${
          sidebarOpen ? "w-[260px]" : "w-[76px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <Logo sidebarOpen={sidebarOpen} setMobileOpen={setMobileOpen}/>

        <nav className="flex-1 space-y-1 px-3 pt-4">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              path={item.path}
              title={item.title}
              icon={item.icon}
              sidebarOpen={sidebarOpen}
              onClick={handleNav}
              isActive={isActive}
            />
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer"
          >
            <Menu className="h-5 w-5" />
            {sidebarOpen && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
};


export default Sidebar;

const Logo = ({sidebarOpen,setMobileOpen}) => {
  return(
    <div className="flex h-[72px] items-center gap-3 px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <Leaf className="h-5 w-5 text-[#ffffff]" />
          </div>
          {sidebarOpen && (
            <span className="text-2xl font-bold text-sidebar-accent-foreground tracking-tight">
              Kisan AI
            </span>
          )}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto text-sidebar-muted lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
  )
}
