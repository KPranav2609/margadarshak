import { Rocket } from "lucide-react";

const Logo = ({ center = false, size = "large" }) => {
  const isLarge = size === "large";

  return (
    <div
      className={`flex flex-col ${
        center ? "items-center text-center" : "items-start"
      }`}
    >
      {/* 🔥 ICON + NAME (ALIGNED PERFECTLY) */}
      <div className="flex items-center gap-2">
        <Rocket
          className={`text-blue-400 ${
            isLarge ? "w-8 h-8" : "w-6 h-6"
          } animate-pulse`}
        />

        <h1
          className={`font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent ${
            isLarge ? "text-3xl" : "text-xl"
          }`}
        >
          MargaDarshak
        </h1>
      </div>

      {/* 🔥 TAGLINE */}
      <p className="text-[var(--muted)] text-sm mt-1">
        Your personal growth companion
      </p>
    </div>
  );
};

export default Logo;