import TodoCircleIcon from "../../../../assets/TodoIcon";
import InProgressIcon from "../../../../assets/InProgressIcon";
import CompleteIcon from "../../../../assets/CompleteIcon";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../../../redux/projects-slice/tasks-slice";
import { useParams } from "react-router-dom";
function NewTaskInput({ status, onClose, containerRef }) {
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
  return (
    <form
      className="new-task-container"
      onSubmit={handleSave}
      ref={containerRef}
    >
      <div className="inner-container">
        {status === "todo" ? (
          <TodoCircleIcon />
        ) : status === "progress" ? (
          <InProgressIcon />
        ) : (
          <CompleteIcon />
        )}
        <input
          type="text"
          onChange={handleDataChange}
          value={formData.name}
          name="name"
          placeholder="new task"
          className="text-input"
          autoFocus={true}
        />
      </div>
      <div className="buttons">
        <div className="cancel" onClick={onClose}>
          cancel
        </div>
        <button className="save" onClick={handleSave}>
          save
        </button>
      </div>
    </form>
  );
}

export default NewTaskInput;
