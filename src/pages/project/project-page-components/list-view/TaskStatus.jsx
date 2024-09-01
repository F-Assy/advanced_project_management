import { useRef, useState } from "react";
import TodoCircleIcon from "../../../../assets/TodoIcon";
import InProgressIcon from "../../../../assets/InProgressIcon";
import CompleteIcon from "../../../../assets/CompleteIcon";
import useClickOutside from "../../../../hooks/useClickOutside";
import Checkmark from "../../../../assets/Checkmark";

function TaskStatus({ onChange, taskData, permission }) {
  const [isOpenList, setIsOpenList] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(() =>
    taskData ? taskData.status : "todo"
  );
  const containerRef = useRef();
  const handleSelectStatus = (status) => {
    if (!permission) return;
    setSelectedStatus(status);
    setIsOpenList(false);
    onChange({
      target: { name: "status", value: status },
      id: taskData?.id,
    });
  };
  useClickOutside(containerRef, isOpenList, () => {
    if (isOpenList) setIsOpenList(false);
  });
  return (
    <div ref={containerRef}>
      <div
        onClick={() => {
          setIsOpenList(!isOpenList);
        }}
        className="current-status"
      >
        {selectedStatus === "todo" ? (
          <TodoCircleIcon />
        ) : selectedStatus === "progress" ? (
          <InProgressIcon />
        ) : (
          <CompleteIcon />
        )}
      </div>
      {isOpenList && permission && (
        <div className="statuses-list">
          <div className="section">
            <div className="section-title">Not started</div>
            <div
              onClick={() => {
                handleSelectStatus("todo");
              }}
              className="section-name"
            >
              <TodoCircleIcon /> To do
              {taskData?.status === "todo" && (
                <div className="absolute-div">
                  <Checkmark />
                </div>
              )}
            </div>
          </div>
          <div className="section">
            <div className="section-title">Active</div>
            <div
              onClick={() => {
                handleSelectStatus("progress");
              }}
              className="section-name"
            >
              <InProgressIcon /> In progress
              {taskData?.status === "progress" && (
                <div className="absolute-div">
                  <Checkmark />
                </div>
              )}
            </div>
          </div>
          <div className="section" style={{ border: "none" }}>
            <div
              onClick={() => {
                handleSelectStatus("complete");
              }}
              className="section-name"
            >
              <CompleteIcon /> Complete
              {taskData?.status === "complete" && (
                <div className="absolute-div">
                  <Checkmark />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskStatus;
