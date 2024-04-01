import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTask();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).format("YYYY-MM-DD"));
      }
    };
    loadTask();
  });
  const onSubmit = handleSubmit((data) => {
    const dataValid ={
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    }
    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    navigate("/tasks");
  });
  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md ">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          />
          <textarea
            rows="3"
            placeholder="Description"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            {...register("description")}
          ></textarea>
          <input
            type="date"
            {...register("date")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 w-full py-2 px-4 rounded-md font-semibold shadow-lg"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
