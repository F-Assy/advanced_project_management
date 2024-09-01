import { useSelector } from "react-redux";
import ProjectsList from "./sidebar/projectsList";
import AddIcon from "../assets/AddIcon";
import { useState } from "react";
import AddProjectModal from "./sidebar/AddProjectModal";

function SideBar() {
  const userSession = useSelector((state) => state.user.userInfo);
  const [showAddProjectModal, setAddProjectModal] = useState(false);
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

export default SideBar;
