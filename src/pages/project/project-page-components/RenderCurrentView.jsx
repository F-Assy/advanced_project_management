import { useEffect, useState } from "react";
import ChangeViewBar from "./ChangeViewBar";
import RenderTasksLists from "./list-view/RenderTaskLists";
import RenderTasksGroups from "./board-view/RenderTasksGroups";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectTasks } from "../../../redux/projects-slice/tasks-slice";
import { useParams } from "react-router-dom";

function groupTasksByStatus(tasksArray) {
  const groupTasks = { todo: [], progress: [], complete: [] };
  tasksArray.forEach((task) => {
    groupTasks[task.status].push(task);
  });
  return groupTasks;
}

function RenderCurrentView() {
  const tasks = useSelector((state) => state.tasks.tasks);

  const [currentView, setCurrentView] = useState(() => {
    const current_view = localStorage.getItem("current-view");
    return current_view ? current_view : "list-view";
  });

  const params = useParams();
  const dispatch = useDispatch();

  const groupTasks = groupTasksByStatus(tasks);

  useEffect(() => {
    dispatch(fetchProjectTasks(params.projectId));
  }, []);

  return (
    <>
      <ChangeViewBar
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      {currentView === "board-view" ? (
        <RenderTasksGroups groupTasks={groupTasks} />
      ) : (
        <RenderTasksLists groupTasks={groupTasks} />
      )}
    </>
  );
}

export default RenderCurrentView;
