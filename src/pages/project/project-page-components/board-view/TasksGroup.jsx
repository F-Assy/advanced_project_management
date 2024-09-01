import { useRef, useState } from "react";
import TaskCard from "./single-task-card.jsx";
import AddTaskCard from "./add-task-card.jsx";
import { useSelector } from "react-redux";
import { hasPermission } from "../../../../utils/utils.js";
import useClickOutside from "../../../../hooks/useClickOutside.js";

function TasksGroup({ name, Icon, tasks, status }) {
  const [isAddTaskActive, setIsAddTaskActive] = useState(false);
  const scrollRef = useRef();
  const userRole = useSelector((state) => state.projects.selectedProject.role);
  const containerRef = useRef();

  useClickOutside(containerRef, isAddTaskActive, () => {
    if (isAddTaskActive) setIsAddTaskActive(false);
  });
  return (
    <div className={`tasks-group ${name}`} ref={scrollRef}>
      <header className="group-header tasks-list-header">
        <div className={`status ${name}`}>
          <Icon primary={true} />
          {name}
        </div>
        <div>{tasks.length}</div>
      </header>
      <div className="cards-container">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
        {isAddTaskActive && (
          <AddTaskCard
            onClose={() => {
              setIsAddTaskActive(false);
            }}
            status={status}
            containerRef={containerRef}
          />
        )}
      </div>
      <div>
        {hasPermission(userRole) && (
          <button
            onClick={() => {
              setIsAddTaskActive(true);
            }}
            className="add-task"
          >
            + add task
          </button>
        )}
      </div>
    </div>
  );
}

export default TasksGroup;
