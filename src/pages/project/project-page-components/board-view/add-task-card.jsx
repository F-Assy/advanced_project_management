import { useState } from "react";
import SelectAssignee from "../list-view/SelectAssignee";
import SelectPriority from "../list-view/SelectPriority";
import TaskStatus from "../list-view/TaskStatus";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../../redux/projects-slice/tasks-slice";
import { hasPermission } from "../../../../utils/utils";
import { useParams } from "react-router-dom";

function AddTaskCard({ status, onClose, containerRef }) {
  const [formData, setFormData] = useState({
    name: "",
    priority: null,
    assignee: null,
  });
  const dispatch = useDispatch();
  const params = useParams();
  const handleDataChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (formData.name) {
      dispatch(addTask({ projectId: params.projectId, ...formData, status }));
      onClose();
    }
  };
  const userRole = useSelector((state) => state.projects.selectedProject.role);
  const permission = hasPermission(userRole);
  return (
    <form className="task-card" ref={containerRef} onSubmit={handleSave}>
      <div className="new-task-card">
        <input
          type="text"
          onChange={handleDataChange}
          value={formData.name}
          name="name"
          autoFocus={true}
        />
        <div className="buttons">
          <button onClick={handleSave} className="save">
            Save
          </button>
          <div onClick={onClose} className="cancel">
            cancel
          </div>
        </div>
      </div>
      <TaskStatus taskData={{ status }} permission={permission} />
      <SelectAssignee onChange={handleDataChange} permission={permission} />
      <SelectPriority onChange={handleDataChange} permission={permission} />
    </form>
  );
}

export default AddTaskCard;
