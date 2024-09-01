import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProjectModal from "./AddProjectModal";
import ProjectsList from "./projectsList";
import AddIcon from "../../assets/AddIcon";
import LogoutIcon from "../../assets/LogoutIcon";
import { logout } from "../../redux/user-slice/user-session-slice";
import { resetState } from "../../redux/projects-slice/projects-slice";

function ProjectsView() {
  const userSession = useSelector((state) => state.user.userInfo);
  const [showAddProjectModal, setAddProjectModal] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetState());
  };
  return (
    <>
      {userSession && (
        <>
          <nav className="sidebar">
            <h1 className="sidebar-title">
              {userSession.name.trim().split(" ")[0]}&apos;s Workspace
            </h1>
            <div className="projects-title-container">
              <div>Projects</div>
              <button
                className="add-project-button"
                onClick={() => {
                  setAddProjectModal(true);
                }}
              >
                <AddIcon />
              </button>
            </div>
            <ProjectsList />
            <div className="logout-button" onClick={handleLogout}>
              <LogoutIcon /> logout
            </div>
          </nav>
          {showAddProjectModal && (
            <AddProjectModal
              closeModal={() => {
                setAddProjectModal(false);
              }}
            />
          )}
        </>
      )}
    </>
  );
}

export default ProjectsView;
