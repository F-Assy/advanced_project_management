import TaskStatus from "../list-view/TaskStatus";
import SelectAssignee from "../list-view/SelectAssignee";
import SelectPriority from "../list-view/SelectPriority";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  editTask,
} from "../../../../redux/projects-slice/tasks-slice";
import { useRef, useState } from "react";
import { hasPermission } from "../../../../utils/utils";
import useClickOutside from "../../../../hooks/useClickOutside";
import TrashIcon from "../../../../assets/three-dots";

function TaskCard({ task }) {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const [isEditNameActive, setEditNameActive] = useState();
  const handleUpdate = (event) => {
    const newData = { [event.target.name]: event.target.value };
    dispatch(editTask({ ...newData, id: task.id }));
  };
  const userRole = useSelector((state) => state.projects.selectedProject.role);
  const formRef = useRef();
  const permission = hasPermission(userRole);

  const handleNameSubmit = (event) => {
    event.preventDefault();
    if (nameInputRef.current.value) {
      dispatch(editTask({ ...task, name: nameInputRef.current.value }));
      setEditNameActive(false);
    }
  };
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };
  useClickOutside(formRef, isEditNameActive, () => {
    if (isEditNameActive) setEditNameActive(false);
  });
  return (
    <div className="task-card">
      {isEditNameActive ? (
        <form onSubmit={handleNameSubmit} ref={formRef}>
          <input
            type="text"
            ref={nameInputRef}
            defaultValue={task.name}
            autoFocus={true}
          />
        </form>
      ) : (
        <div
          onClick={() => {
            setEditNameActive(true);
          }}
          className="task-name"
        >
          {task.name}
        </div>
      )}
      <TaskStatus
        onChange={handleUpdate}
        status={task.status}
        permission={permission}
      />
      <SelectAssignee
        onChange={handleUpdate}
        assignee={task.assignee}
        permission={permission}
      />
      <SelectPriority
        onChange={handleUpdate}
        priority={task.priority}
        permission={permission}
      />
      {!isEditNameActive && permission && (
        <div className="delete-icon" onClick={handleDelete}>
          <TrashIcon />
        </div>
      )}
    </div>
  );
}

export default TaskCard;
