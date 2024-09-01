import BlankFlagIcon from "../../../../assets/BlankFlagIcon";
import FilledFlagIcon from "../../../../assets/FilledFlagIcon";
import { useRef, useState } from "react";
import "./select-priority.css";
import useClickOutside from "../../../../hooks/useClickOutside";

const priorities = ["urgent", "high", "medium", "low"];

function SelectPriority({ onChange, priority, permission }) {
  const [openList, setOpenList] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(priority);
  const containerRef = useRef();
  const handleSelectPriority = (priority) => {
    if (!permission) return;
    setSelectedPriority(priority);
    setOpenList(false);
    onChange({
      target: { name: "priority", value: priority },
    });
  };
  useClickOutside(containerRef, openList, () => {
    if (openList) setOpenList(false);
  });
  return (
    <div className="select-priority-container" ref={containerRef}>
      <div
        className="select-priority"
        onClick={(e) => {
          e.preventDefault();
          setOpenList(!openList);
        }}
      >
        {selectedPriority ? (
          <div className="current-priority">
            <div className={selectedPriority}>
              <FilledFlagIcon />
            </div>
            <div>{selectedPriority}</div>
          </div>
        ) : (
          <BlankFlagIcon />
        )}
      </div>
      {openList && permission && (
        <div className="priorities-list">
          {priorities.map((priority) => (
            <div
              className={`option ${priority}`}
              onClick={() => {
                handleSelectPriority(priority);
              }}
              key={priority}
            >
              <FilledFlagIcon />
              <div className="text">{priority}</div>
            </div>
          ))}
          <div
            className="option"
            onClick={() => {
              handleSelectPriority(null);
            }}
          >
            clear
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectPriority;
