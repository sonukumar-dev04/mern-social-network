const ProgressBars = ({ total, current, progress }) => (
  <div className="absolute top-4 left-4 right-4 z-20 flex gap-1 pointer-events-none">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="flex-1 h-[3px] bg-white/25 rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-white rounded-full"
          style={{
            width: i < current ? "100%" : i === current ? `${progress}%` : "0%",
            transition: i === current ? "width 0.1s linear" : "none",
          }}
        />
      </div>
    ))}
  </div>
);

export default ProgressBars;
