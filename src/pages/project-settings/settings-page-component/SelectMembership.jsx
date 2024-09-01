import { useRef, useState } from "react";
import Checkmark from "../../../assets/Checkmark";
import useClickOutside from "../../../hooks/useClickOutside";
import { useSelector } from "react-redux";

function SelectMembership({ handleChange, membership, userId }) {
  if (!membership) membership = "member";
  const [isOpenList, setIsOpenList] = useState(false);
  const userSession = useSelector((state) => state.user.userInfo);
  const handleSelectMembership = (newRole) => {
    handleChange({ target: { name: "membership", value: newRole } });
    membership = newRole;
    setIsOpenList(false);
  };
  const containerRef = useRef();
  useClickOutside(containerRef, isOpenList, () => {
    if (isOpenList) setIsOpenList(false);
  });
  return (
    <div
      className={`select-membership ${
        (membership === "owner" || userSession.id === userId) && "disabled"
      }`}
      ref={containerRef}
    >
      <div
        className="current-membership"
        onClick={() => setIsOpenList(!isOpenList)}
      >
        {membership}
        <div className="list-mark"></div>
      </div>
      {isOpenList && membership !== "owner" && (
        <div className="memberships-list">
          <div className="outer">
            <div
              className={`${
                membership === "member" && "selected"
              } membership-container`}
              onClick={() => {
                handleSelectMembership("member");
              }}
            >
              <div className="label">Member</div>
              <div className="description">
                Create, edit and delete tasks in the project
              </div>
              {membership === "member" && (
                <div className="absolute-div">
                  <Checkmark />
                </div>
              )}
            </div>
          </div>
          <div className="outer">
            <div
              className={`${
                membership === "guest" && "selected"
              } membership-container`}
              onClick={() => {
                handleSelectMembership("guest");
              }}
            >
              <div className="label">Guest</div>
              <div className="description">
                Navigate through the different views of the project, limited
                ability to change data
              </div>
              {membership === "guest" && (
                <div className="absolute-div">
                  <Checkmark />
                </div>
              )}
            </div>
          </div>
          <div className="outer">
            <div
              className={`${
                membership === "admin" && "selected"
              } membership-container`}
              onClick={() => {
                handleSelectMembership("admin");
              }}
            >
              <div className="label">Admin</div>
              <div className="description">
                Create, edit, delete tasks, add and remove users from the
                project
              </div>
              {membership === "admin" && (
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

export default SelectMembership;
