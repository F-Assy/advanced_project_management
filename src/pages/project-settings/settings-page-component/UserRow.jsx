import { useDispatch, useSelector } from "react-redux";
import SelectMembership from "./SelectMembership";
import {
  deleteUserFromProject,
  updateUserProjectRole,
} from "../../../redux/projects-slice/projects-slice";
import TrashIcon from "../../../assets/three-dots";

function UserRow({ user, project }) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.user.userInfo);

  const handleUpdate = ({ target }) => {
    if (user.role !== "owner" && userSession.id !== user.id) {
      dispatch(
        updateUserProjectRole({
          projectId: project.id,
          userId: user.id,
          role: target.value,
          currRole: project.role,
        })
      );
    }
  };
  const handleDelete = () => {
    if (user.role !== "owner" && userSession.id !== user.id) {
      dispatch(
        deleteUserFromProject({
          projectId: project.id,
          userId: user.id,
          role: project.role,
        })
      );
    }
  };
  return (
    <div className="user-row">
      <div className="medium-width">{user.full_name}</div>
      <div className="medium-width">{user.email}</div>
      <SelectMembership
        membership={user.role}
        handleChange={handleUpdate}
        userId={user.id}
      />
      {user.role !== "owner" && userSession.id !== user.id ? (
        <div onClick={handleDelete} className="trash-icon">
          <TrashIcon />
        </div>
      ) : (
        <div>
          <div className="owner-text">
            {user.role === "owner" ? "owner" : "you"}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserRow;
