import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProject } from "../../redux/projects-slice/projects-slice";
import UsersTable from "./settings-page-component/UsersTable";
import "./settings-page.css";
import UserForm from "./settings-page-component/UserForm";
import { useSidebarContext } from "../../contexts/useSidebarContext";
import { hasPermission } from "../../utils/utils";
import useAuthRedirect from "../../hooks/useAuthRedirect";

function SettingsPage() {
  const currentProject = useSelector((state) => state.projects.selectedProject);
  const userSession = useSelector((state) => state.user.userInfo);
  const { projectId } = useParams();
  const { setCurrentView } = useSidebarContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useAuthRedirect("home");
  useEffect(() => {
    if (currentProject) {
      if (!hasPermission(currentProject.role, "access-settings")) {
        navigate(`/project/${projectId}`);
      } else {
        setCurrentView("settings");
      }
    }
  }, [currentProject, projectId]);

  useEffect(() => {
    dispatch(fetchSingleProject({ projectId, userId: userSession.id }));
  }, [projectId, userSession]);

  return (
    <>
      {currentProject && (
        <div className="settings-page">
          <div className="title">Manage people</div>
          <UserForm project={currentProject} />
          <UsersTable users={currentProject.users} project={currentProject} />
        </div>
      )}
    </>
  );
}

export { SettingsPage };
