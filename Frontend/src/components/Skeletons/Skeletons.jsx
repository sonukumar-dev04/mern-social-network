export const PostSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-3 w-32 bg-gray-200 rounded" />
            <div className="h-2.5 w-20 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-4/5 bg-gray-200 rounded" />
        </div>
        <div className="h-48 w-full bg-gray-200 rounded-lg" />
        <div className="flex gap-4 mt-4">
          <div className="h-3 w-14 bg-gray-200 rounded" />
          <div className="h-3 w-14 bg-gray-200 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 space-y-6 animate-pulse">
    {/* HEADER CARD */}
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="h-32 sm:h-48 w-full bg-gray-200" />
      <div className="px-6 pb-6 relative">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gray-300 border-4 border-white -mt-14 sm:-mt-16" />
        <div className="h-5 w-40 bg-gray-200 rounded mt-4" />
        <div className="h-3 w-56 bg-gray-200 rounded mt-3" />
        <div className="h-3 w-24 bg-gray-200 rounded mt-3" />
      </div>
    </div>

    {/* ABOUT */}
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="h-3 w-full bg-gray-200 rounded" />
      <div className="h-3 w-4/5 bg-gray-200 rounded" />
    </div>

    {/* SKILLS */}
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
      <div className="h-4 w-20 bg-gray-200 rounded" />
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-7 w-20 bg-gray-200 rounded-full" />
        ))}
      </div>
    </div>

    {/* EDUCATION */}
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
      <div className="h-4 w-28 bg-gray-200 rounded" />
      <div className="h-3 w-2/3 bg-gray-200 rounded" />
      <div className="h-3 w-1/2 bg-gray-200 rounded" />
    </div>
  </div>
);

export const NetworkCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm animate-pulse">
    <div className="h-16 sm:h-20 w-full bg-gray-200" />
    <div className="px-4 pb-4 text-center -mt-8">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto bg-gray-300 border-4 border-white" />
      <div className="h-3 w-20 bg-gray-200 rounded mx-auto mt-3" />
      <div className="h-2.5 w-16 bg-gray-200 rounded mx-auto mt-2" />
      <div className="h-7 w-full bg-gray-200 rounded-full mt-3" />
    </div>
  </div>
);

export const NotificationSkeletonRow = () => (
  <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-gray-100 animate-pulse">
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-200 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-3/5 bg-gray-200 rounded" />
      <div className="h-2.5 w-24 bg-gray-200 rounded" />
    </div>
  </div>
);

export const SkeletonAvatar = () => (
  <div className="flex flex-col items-center gap-2 shrink-0 animate-pulse">
    <div className="w-[57px] h-[57px] rounded-full bg-slate-100" />
    <div className="w-10 h-2 rounded-full bg-slate-100" />
  </div>
);
