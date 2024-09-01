import TasksTable from "./TasksTable";
import { useSelector } from "react-redux";
import { hasPermission } from "../../../../utils/utils.js";

function TasksList({ name, Icon, tasks, status }) {
  const userRole = useSelector((state) => state.projects.selectedProject.role);
  if (tasks.length === 0 && name !== "to do") return;

  return (
    <div className="tasks-list">
      <header className="tasks-list-header">
        <div className={`status ${name}`}>
          <Icon primary={true} />
          <div>{name}</div>
        </div>
      </header>

      <TasksTable
        tasks={tasks}
        status={status}
        permission={hasPermission(userRole)}
      />
    </div>
  );
}

export default TasksList;
