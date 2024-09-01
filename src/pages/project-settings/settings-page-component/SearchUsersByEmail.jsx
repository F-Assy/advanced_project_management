import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../redux/user-slice/users-slice";
import useClickOutside from "../../../hooks/useClickOutside";

const SearchUserByEmail = ({ handleChange }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isOpenList, setOpenList] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const containerRef = useRef();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (email) {
      const filtered = users.filter((user) =>
        user.email.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [email, users]);
  useClickOutside(containerRef, isOpenList, () => {
    if (isOpenList) setOpenList(false);
  });
  return (
    <div ref={containerRef}>
      <input
        type="text"
        placeholder="choose users by email"
        className="email-input"
        name="email"
        value={email}
        onClick={() => {
          setOpenList(true);
        }}
        onChange={handleEmailChange}
      />
      {filteredUsers.length > 0 && isOpenList && (
        <ul className="user-emails-list">
          {filteredUsers.map((user) => (
            <li
              className="user-email-option"
              key={user.id}
              onClick={() => {
                handleChange({ target: { name: "email", value: user.email } });
                setEmail(user.email);
                setOpenList(false);
              }}
            >
              {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUserByEmail;
