import TasksList from "./TasksList";
import { statuses } from "../../../../utils/constants";

function RenderTasksLists({ groupTasks }) {
  const RenderLists = Object.keys(groupTasks).map((key) => (
    <TasksList
      name={statuses[key].name}
      Icon={statuses[key].Icon}
      tasks={groupTasks[key]}
      status={key}
      key={key}
    />
  ));
  return <>{RenderLists}</>;
}

export default RenderTasksLists;
