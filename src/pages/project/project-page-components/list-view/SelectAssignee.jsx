import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectUsers } from "../../../../redux/user-slice/users-slice";
import "./select-user.css";
import useClickOutside from "../../../../hooks/useClickOutside";
import { useParams } from "react-router-dom";

function SelectAssignee({ onChange, assignee, permission }) {
  const users = useSelector((state) => state.users.users);
  const [openList, setOpenList] = useState(false);
  const [selectedUser, setSelectedUser] = useState(assignee);
  const dispatch = useDispatch();
  const params = useParams();
  const containerRef = useRef();

  const handleSelectUser = (name) => {
    setSelectedUser(name);
    onChange({
      target: { name: "assignee", value: name },
    });
    setOpenList(false);
  };

  useClickOutside(containerRef, openList, () => {
    if (openList) setOpenList(false);
  });
  useEffect(() => {
    if (permission) dispatch(fetchProjectUsers(params.projectId));
  }, []);

  return (
    <div ref={containerRef}>
      <div
        className="select-user"
        onClick={(e) => {
          e.preventDefault();
          setOpenList(!openList);
        }}
      >
        {selectedUser ? (
          <div>{selectedUser}</div>
        ) : (
          <div className="empty">empty</div>
        )}
      </div>
      {openList && permission && (
        <div className="users-list">
          {users.map((user) => (
            <div
              className="option"
              key={user.id}
              onClick={() => {
                handleSelectUser(user.full_name);
              }}
            >
              <div className="user-option">{user.full_name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectAssignee;
