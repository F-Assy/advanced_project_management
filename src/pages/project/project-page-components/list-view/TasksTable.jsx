import SingleTableTask from "./SingleTableTask";
import NewTaskInput from "./NewTaskInput";
import { useRef, useState } from "react";
import useClickOutside from "../../../../hooks/useClickOutside";

function TasksTable({ tasks, status, permission }) {
  const [isAddTaskActive, setIsAddTaskActive] = useState(false);
  const containerRef = useRef();

  useClickOutside(containerRef, isAddTaskActive, () => {
    if (isAddTaskActive) setIsAddTaskActive(false);
  });

  return (
    <div className="tasks-table">
      <header className="table-header">
        <div className="name-column">Name</div>
        <div className="columns">
          <div className="column">Priority</div>
          <div className="column">Assignee</div>
          <div className="column remove">Remove</div>
        </div>
      </header>

      <div className="tasks">
        {tasks.map((task) => (
          <SingleTableTask task={task} permission={permission} key={task.id} />
        ))}
      </div>

      {isAddTaskActive && permission ? (
        <NewTaskInput
          onClose={() => {
            setIsAddTaskActive(false);
          }}
          status={status}
          containerRef={containerRef}
        />
      ) : (
        permission && (
          <div onClick={() => setIsAddTaskActive(true)} className="add-task">
            + add task
          </div>
        )
      )}
    </div>
  );
}

export default TasksTable;
