import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-neutral text-white shadow-lg z-50">
      <div className="navbar px-5 flex justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-400 hover:text-green-300 transition">
          DevTinder 🔥
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-green-400 font-semibold px-4 py-2 rounded-xl shadow-md text-center">
              👋 Welcome, {user.firstName}!
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-gray-700 transition"
              >
                <div className="w-10 rounded-full border border-gray-500">
                  <img alt="User Photo" src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-900 text-gray-300 border border-gray-700 rounded-md shadow-lg mt-3 w-52 p-2 right-0 z-50"
              >
                <li>
                  <Link to="/profile" className="justify-between hover:bg-gray-800 rounded-md p-2">
                    Profile <span className="badge badge-success">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="justify-between hover:bg-gray-800 rounded-md p-2">
                    Connections <span className="badge badge-error">💗</span>
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="justify-between hover:bg-gray-800 rounded-md p-2">
                    Requests <span className="badge badge-warning">👁️</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 hover:bg-gray-800 w-full p-2 rounded-md"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
