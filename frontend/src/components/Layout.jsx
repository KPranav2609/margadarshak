import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Mentor", path: "/mentor" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-8 tracking-wide">MargaDarshak</h1>

        <nav className="space-y-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-blue-600 shadow-md"
                    : "hover:bg-gray-700 hover:translate-x-1"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => {
            localStorage.removeItem("userInfo");
            window.location.href = "/login";
          }}
          className="mt-10 w-full bg-red-500 py-2 rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default Layout;
