import XIcon from "../../../../assets/x-icon.svg";
import AuthInput from "../../../../components/AuthInput";
import SelectPriority from "./SelectPriority";
import SelectAssignee from "./SelectAssignee";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../../redux/projects-slice/tasks-slice";
import Portal from "../../../../components/Portal";
import { hasPermission } from "../../../../utils/utils";

function AddTaskModal({ closeModal }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    priority: null,
    assignee: null,
  });
  const currentProject = useSelector((state) => state.projects.selectedProject);
  const permission = hasPermission(currentProject.role);
  const handleDataChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = () => {
    if (formData.name) {
      dispatch(
        addTask({ projectId: currentProject.id, ...formData, status: "todo" })
      );
      closeModal();
    }
  };
  return (
    <Portal>
      <div className="overlay">
        <div className="add-task-modal">
          <header>
            <div>Add Task</div>
            <img src={XIcon} alt="x icon" onClick={closeModal} />
          </header>
          <div className="inputs-container">
            <AuthInput
              handleInputChange={handleDataChange}
              value={formData.name}
              config={{
                label: "Task name",
                type: "text",
                placeholder: "Task",
                key: "name",
              }}
            />
            <div className="select-container">
              <SelectPriority
                onChange={handleDataChange}
                permission={permission}
              />
              <SelectAssignee
                onChange={handleDataChange}
                permission={permission}
              />
            </div>
          </div>
          <div className="buttons">
            <button className="cancel" onClick={closeModal}>
              Cancel
            </button>
            <button className="create" onClick={handleSubmit}>
              Add Task
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default AddTaskModal;
