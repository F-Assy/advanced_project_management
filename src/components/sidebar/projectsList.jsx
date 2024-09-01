import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProjects,
  selectProject,
} from "../../redux/projects-slice/projects-slice";
import LoadingSpinner from "../LoadingSpinner";
import BulletListIcon from "../../assets/BulletListIcon";
import { Link } from "react-router-dom";
import { fetchProjectTasks } from "../../redux/projects-slice/tasks-slice";

function ProjectsList() {
  const dispatch = useDispatch();

  const { projects, status, selectedProject } = useSelector(
    (state) => state.projects
  );

  const userSession = useSelector((state) => state.user.userInfo);

  const handleSelectProject = (project) => {
    dispatch(selectProject({ project, userId: userSession.id }));

    dispatch(fetchProjectTasks(project.id));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProjects(userSession.id));
    }
  }, [userSession, status]);

  return (
    <div className="projects-list">
      {status === "loading" && <LoadingSpinner theme="big" />}
      {status === "succeeded" &&
        projects.map((project) => (
          <Link
            className={`project-label ${
              selectedProject?.id === project.id ? "selected" : ""
            }`}
            to={`project/${project.id}`}
            onClick={() => handleSelectProject(project)}
            key={project.id}
          >
            <BulletListIcon />
            <div>{project.name}</div>
          </Link>
        ))}
      {projects.length === 0 && status === "succeeded" && (
        <div className="no-projects-message">no projects</div>
      )}
    </div>
  );
}

export default ProjectsList;
