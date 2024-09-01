import SelectPriority from "./SelectPriority";
import SelectAssignee from "./SelectAssignee";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  editTask,
} from "../../../../redux/projects-slice/tasks-slice";
import TaskStatus from "./TaskStatus";
import TrashIcon from "../../../../assets/three-dots";

function SingleTableTask({ task, permission }) {
  const dispatch = useDispatch();

  const handleUpdate = (event) => {
    const newData = { [event.target.name]: event.target.value };
    dispatch(editTask({ ...newData, id: task.id }));
  };

  const handleDelete = () => {
    if (permission) dispatch(deleteTask(task.id));
  };

  return (
    <div className="list-task">
      <div className="task-name">
        <TaskStatus
          onChange={handleUpdate}
          status={task.status}
          permission={permission}
        />
        {task.name}
      </div>
      <div className="columns">
        <div className="column">
          <SelectPriority
            onChange={handleUpdate}
            priority={task.priority}
            permission={permission}
          />
        </div>
        <div className="column">
          <SelectAssignee
            onChange={handleUpdate}
            assignee={task.assignee}
            permission={permission}
          />
        </div>
        <div className="column delete-container" onClick={handleDelete}>
          <TrashIcon />
        </div>
      </div>
    </div>
  );
}

export default SingleTableTask;
