import { useState } from "react";
import SearchUserByEmail from "./SearchUsersByEmail";
import SelectMembership from "./SelectMembership";
import { useDispatch } from "react-redux";
import { addUserToProject } from "../../../redux/projects-slice/projects-slice";

function UserForm({ project }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    membership: "member",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addUserToProject({
        projectId: project.id,
        currRole: project.role,
        user: formData,
      })
    );
    setFormData({
      full_name: "",
      email: "",
      membership: "member",
    });
  };
  return (
    <form className="user-input-container" onSubmit={handleSubmit}>
      <SearchUserByEmail handleChange={handleChange} email={formData.email} />
      <SelectMembership
        handleChange={handleChange}
        membership={formData.membership}
      />
      <button
        className={`${formData.email === "" && "disabled"} add-button`}
        disabled={formData.email === ""}
      >
        add
      </button>
    </form>
  );
}

export default UserForm;
