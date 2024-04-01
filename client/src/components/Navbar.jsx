import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={
        isAuthenticated ? "/tasks" : "/"
      }>
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-5">
        {isAuthenticated ? (
          <>
            <li className="font-semibold">Welcome {user.username}!</li>
            <li>
              <Link to="/tasks" className="bg-amber-600 hover:bg-amber-700 py-2 px-4 rounded-md font-semibold shadow-lg">Tasks</Link>
            </li>
            <li>
              <Link to="/add-task" className="bg-sky-600 hover:bg-sky-700 py-2 px-4 rounded-md font-semibold shadow-lg">Add Task</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
                className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md font-semibold shadow-lg"
              >
                Log Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md font-semibold shadow-lg"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md font-semibold shadow-lg"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
