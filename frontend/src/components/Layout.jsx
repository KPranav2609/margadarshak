import { Link, useLocation, useNavigate } from "react-router-dom";
import { Rocket } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { ui } from "../styles/ui";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Mentor", path: "/mentor" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={ui.layout}>
      {/* Sidebar */}
      <aside className={ui.sidebar}>
        <div className={ui.sidebarGlass} />

        <div className={ui.sidebarContent}>
          <div>
            {/* Logo */}
            <div className={ui.brandContainer}>
              <div className={ui.brandRow}>
                <Rocket className={ui.logoIcon} />

                <h1 className={ui.brandTitle}>MargaDarshak</h1>
              </div>

              <p className={ui.brandSubtitle}>
                Your personal growth companion
              </p>
            </div>

            {/* Navigation */}
            <nav className={ui.nav}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${ui.navItem} ${
                      isActive ? ui.activeNav : ui.inactiveNav
                    }`}
                  >
                    {isActive && <span className={ui.navIndicator} />}

                    <span
                      className={`${ui.navBackground} ${
                        isActive ? ui.activeNavBg : ui.inactiveNavBg
                      }`}
                    />

                    <span className={ui.navText}>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <button onClick={handleLogout} className={ui.btnDanger}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={ui.main}>{children}</main>
    </div>
  );
};

export default Layout;