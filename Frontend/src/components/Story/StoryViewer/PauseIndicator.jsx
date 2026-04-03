const PauseIndicator = ({ visible }) =>
  !visible ? null : (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
        <div className="flex gap-1.5">
          <div className="w-1 h-5 bg-white rounded-full" />
          <div className="w-1 h-5 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );

export default PauseIndicator;
