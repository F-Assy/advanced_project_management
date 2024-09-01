import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../redux/projects-slice/projects-slice";
import XIcon from "../../assets/x-icon.svg";
import AuthInput from "../AuthInput";
import Portal from "../Portal";

function AddProjectModal({ closeModal }) {
  const userSession = useSelector((state) => state.user.userInfo);

  const [projectName, setProjectName] = useState("");

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSubmit = () => {
    if (projectName) {
      dispatch(addProject({ ownerId: userSession.id, name: projectName }));
      closeModal();
    }
  };

  return (
    <Portal>
      <div className="overlay">
        <form className="add-task-modal" onSubmit={handleSubmit}>
          <header>
            <div>Add Project</div>
            <img src={XIcon} alt="x icon" onClick={closeModal} />
          </header>
          <div className="inputs-container">
            <AuthInput
              handleInputChange={handleNameChange}
              value={projectName}
              config={{
                label: "Project name",
                type: "text",
                placeholder: "Project",
                key: "name",
              }}
            />
          </div>
          <div className="buttons">
            <div className="cancel" onClick={closeModal}>
              Cancel
            </div>
            <button className="create">Add Project</button>
          </div>
        </form>
      </div>
    </Portal>
  );
}

export default AddProjectModal;
