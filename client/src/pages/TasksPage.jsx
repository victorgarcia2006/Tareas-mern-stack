import {useEffect} from 'react'
import { useTask } from "../context/TaskContext";
import Taskcard from '../components/TaskCard';

function TasksPage() {
  const { getTasks, tasks} = useTask();

  useEffect(() => {
    getTasks();
  }, [tasks]);

  if (tasks.length === 0) return <div>No tasks</div>;

  return <div className='grid lg:grid-cols-4 gap-8 md:grid-cols-2'>
    {tasks.map((task) => (
      <Taskcard key={task._id} task={task} />
    ))}
  </div>;
}

export default TasksPage;
