import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../redux/projects-slice/projects-slice";
import "./confirm-delete.css";
import Portal from "../Portal";
import { useNavigate } from "react-router-dom";

function ConfirmDeleteModal({ onClose }) {
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProject(selectedProject.id));
    navigate("/");
    onClose();
  };
  return (
    <Portal>
      <div className="overlay">
        <div className="confirm-delete-modal">
          <header>Delete: {selectedProject.name}</header>
          <div className="main-text">
            are you sure you want to delete this project? all your tasks will be
            permanently deleted.
          </div>
          <div className="buttons">
            <div className="cancel" onClick={onClose}>
              cancel
            </div>
            <div className="delete" onClick={handleDelete}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default ConfirmDeleteModal;
