import { statuses } from "../../../../utils/constants";
import TasksGroup from "./TasksGroup";
import "./board-view.css";

function RenderTasksGroups({ groupTasks }) {
  const RenderGroups = Object.keys(groupTasks).map((key) => (
    <TasksGroup
      name={statuses[key].name}
      Icon={statuses[key].Icon}
      tasks={groupTasks[key]}
      status={key}
      key={key}
    />
  ));
  return <div className="groups-container">{RenderGroups}</div>;
}

export default RenderTasksGroups;
