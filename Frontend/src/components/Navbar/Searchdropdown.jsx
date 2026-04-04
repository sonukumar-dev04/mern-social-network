import { useNavigate } from "react-router-dom";

const SearchDropdown = ({ users, onSelect }) => {
  const navigate = useNavigate();

  const handleClick = (userId) => {
    navigate(`/profile/${userId}`);
    onSelect();
  };

  return (
    <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-100 overflow-hidden z-50">
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            onClick={() => handleClick(user._id)}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <img
              src={
                user.profilePicture
                  ? `http://localhost:4000/uploads/${user.profilePicture}`
                  : "http://localhost:4000/uploads/default_profile.jpg"
              }
              alt="user"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="text-sm font-medium text-slate-800">
              {user.name}
            </span>
          </div>
        ))
      ) : (
        <div className="px-4 py-3 text-sm text-slate-400">No users found</div>
      )}
    </div>
  );
};

export default SearchDropdown;
