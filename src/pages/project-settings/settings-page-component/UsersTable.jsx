import UserRow from "./UserRow";

function UsersTable({ users, project }) {
  return (
    <div className="users-table">
      <div className="table-header">
        <div className="medium-width">Name</div>
        <div className="medium-width">Email</div>
        <div>Role</div>
        <div>remove</div>
      </div>
      {users.map((user) => (
        <UserRow user={user} project={project} key={user.id} />
      ))}
    </div>
  );
}

export default UsersTable;
