const Avatar = ({ src, name, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
  };

  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0 bg-slate-200 flex items-center justify-center font-semibold text-slate-500`}
    >
      {src ? (
        <img
          src={`http://localhost:4000/uploads/${src}`}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
