const PromoCard = () => {
  return (
    <div className="sticky top-6 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="text-base font-semibold text-gray-900 mb-3">
        About ProNet
      </h3>

      <ul className="space-y-2 text-sm text-gray-600">
        <li>• Build meaningful professional connections</li>
        <li>• Share ideas, posts and achievements</li>
        <li>• Discover opportunities from your network</li>
        <li>• Stay updated with industry conversations</li>
      </ul>

      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
        ProNet © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default PromoCard;
