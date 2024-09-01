import { useState } from "react";
import ProfileIcon from "../../assets/ProfileIcon";
import TrashIcon from "../../assets/three-dots";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { hasPermission } from "../../utils/utils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSidebarContext } from "../../contexts/useSidebarContext";

function ProjectSettingsView() {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const currentProject = useSelector((state) => state.projects.selectedProject);
  const { setCurrentView } = useSidebarContext();
  let permission = null;
  if (currentProject)
    permission = hasPermission(currentProject.role, "delete-project");

  return (
    <>
      <nav className="sidebar">
        <Link
          to={`/project/${currentProject?.id}`}
          onClick={() => {
            setCurrentView("projects");
          }}
        >
          <h1 className="sidebar-title">{"<-"} Back to workspace</h1>
        </Link>
        <div className="sidebar-content">
          <div className="selected">
            <ProfileIcon /> People
          </div>
          {permission && (
            <div
              onClick={() => {
                setShowConfirmDeleteModal(true);
              }}
              className="delete-container"
            >
              <TrashIcon /> delete project?
            </div>
          )}
        </div>
      </nav>
      {showConfirmDeleteModal && (
        <ConfirmDeleteModal
          onClose={() => {
            setShowConfirmDeleteModal(false);
          }}
        />
      )}
    </>
  );
}

export default ProjectSettingsView;
