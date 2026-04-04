const ProNetLogo = ({ size = "md" }) => {
  const textSize =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
  const svgSize = size === "lg" ? 36 : size === "sm" ? 24 : 30;

  return (
    <div className="flex items-center gap-2">
      <svg width={svgSize} height={svgSize} viewBox="0 0 36 36" fill="none">
        <circle cx="9" cy="18" r="5" fill="#2563EB" />
        <circle cx="27" cy="9" r="4" fill="#60A5FA" />
        <circle cx="27" cy="27" r="4" fill="#93C5FD" />
        <line
          x1="13"
          y1="16"
          x2="23"
          y2="11"
          stroke="#3B82F6"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="13"
          y1="20"
          x2="23"
          y2="25"
          stroke="#3B82F6"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`${textSize} font-extrabold tracking-tight text-slate-900`}
      >
        Pro<span className="text-blue-600">net</span>
      </span>
    </div>
  );
};

export default ProNetLogo;
