import { useTask } from "../context/TaskContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function Taskcard({ task }) {
  const { deleteTask } = useTask();
  return (
    <div className="bg-zinc-800 p-5 rounded-md mb-5 shadow-lg flex flex-col gap-y-3">
      <header className="flex gap-x-5 justify-between">
        <h1 className="text-white text-xl font-semibold">{task.title}</h1>
        <div className="flex gap-x-3 items-center">
          <button
            onClick={() => {
              deleteTask(task._id);
            }}
            className="bg-red-600 hover:bg-red-700 px-2 rounded-md font-semibold shadow-lg"
          >
            Delete
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 px-2 rounded-md font-semibold shadow-lg">
            <Link to = {`/tasks/${task._id}`}>
                Edit
            </Link>
          </button>
        </div>
      </header>
      <p className="text-gray-400">{task.description}</p>
      <p className="text-blue-500">
        {dayjs(task.date).utc().format("DD/MM/YYYY")}
      </p>
    </div>
  );
}

export default Taskcard;
