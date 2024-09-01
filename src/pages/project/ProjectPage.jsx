import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { fetchSingleProject } from "../../redux/projects-slice/projects-slice";
import AddTaskModal from "./project-page-components/list-view/AddTaskModal";
import RenderCurrentView from "./project-page-components/RenderCurrentView";
import SettingsIcon from "../../assets/SettingsIcon.jsx";
import { hasPermission } from "../../utils/utils.js";
import useAuthRedirect from "../../hooks/useAuthRedirect.js";
import AddIcon from "../../assets/AddIcon.jsx";

import "./projects-styles.css";
import { useSidebarContext } from "../../contexts/useSidebarContext.js";

function ProjectPage() {
  const { selectedProject: currentProject, status } = useSelector(
    (state) => state.projects
  );
  const userSession = useSelector((state) => state.user.userInfo);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const { setCurrentView } = useSidebarContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();

  useAuthRedirect("home");

  useEffect(() => {
    if (status !== "succeeded")
      dispatch(fetchSingleProject({ projectId, userId: userSession?.id }));
    if (status === "succeeded" && !currentProject) navigate("/");
    else if (status === "succeeded") setCurrentView("projects");
  }, [currentProject, userSession]);

  return (
    <>
      {currentProject && (
        <>
          <div className="projects-page-container">
            <header className="page-header">
              <div className="project-name"> {currentProject.name} </div>
              <div className="buttons-container">
                <button
                  className={`add-task-button ${
                    !hasPermission(currentProject.role) && "disabled"
                  }`}
                  disabled={!hasPermission(currentProject.role)}
                  onClick={() => {
                    if (hasPermission(currentProject.role))
                      setShowAddTaskModal(true);
                  }}
                >
                  <div>add task </div>
                  <AddIcon />
                </button>
                {hasPermission(currentProject.role, "access-settings") && (
                  <Link to={`settings`} className="settings-button">
                    <div>settings</div> <SettingsIcon />
                  </Link>
                )}
              </div>
            </header>
            <RenderCurrentView />
          </div>
          {showAddTaskModal && (
            <AddTaskModal
              closeModal={() => {
                setShowAddTaskModal(false);
              }}
            />
          )}
        </>
      )}
    </>
  );
}

export { ProjectPage };
