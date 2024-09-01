import BoardViewIcon from "../../../assets/BoardIcon.jsx";
import BulletListIcon from "../../../assets/BulletListIcon.jsx";

function ChangeViewBar({ currentView, setCurrentView }) {
  const handleSelectView = (view) => {
    setCurrentView(view);
    localStorage.setItem("current-view", view);
  };

  return (
    <nav className="change-view-bar">
      <div
        className={`view-element ${
          currentView === "list-view" ? "selected" : ""
        }`}
        onClick={() => handleSelectView("list-view")}
      >
        <BulletListIcon />
        <div>List</div>
      </div>
      <div
        className={`view-element ${
          currentView === "board-view" ? "selected" : ""
        }`}
        onClick={() => handleSelectView("board-view")}
      >
        <BoardViewIcon />
        <div>Board</div>
      </div>
    </nav>
  );
}

export default ChangeViewBar;
