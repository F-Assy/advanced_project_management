import { useDispatch, useSelector } from "react-redux";
import useAuthRedirect from "../hooks/useAuthRedirect";
import "../main-css/home-styles.css";
import { useEffect, useState } from "react";
import {
  fetchSingleProject,
  fetchUserProjects,
} from "../redux/projects-slice/projects-slice";
import { useNavigate } from "react-router-dom";
import AddIcon from "../assets/AddIcon";
import AddProjectModal from "../components/sidebar/AddProjectModal";
import LoadingSpinner from "../components/LoadingSpinner";

function HomePage() {
  const userSession = useSelector((state) => state.user.userInfo);
  const { projects, status } = useSelector((state) => state.projects);

  const [showAddProjectModal, setAddProjectModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProjects(userSession?.id));
  }, []);

  useEffect(() => {
    //directly navigate to a project after landing on home
    if (projects.length > 0) {
      dispatch(
        fetchSingleProject({
          projectId: projects[0].id,
          userId: userSession?.id,
        })
      );
      navigate(`/project/${projects[0].id}`);
    }
  }, [projects]);

  useAuthRedirect("home");
  return (
    <>
      {projects.length === 0 && (
        <>
          <div className="create-project-message">
            {status === "succeeded" ? (
              <>
                <div>You are not currently participating in any project</div>
                <button
                  className="add-project"
                  onClick={() => setAddProjectModal(true)}
                >
                  Create your first project <AddIcon />
                </button>
              </>
            ) : (
              <LoadingSpinner theme="big" />
            )}
          </div>
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

export { HomePage };
