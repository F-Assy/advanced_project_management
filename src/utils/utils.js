export function hasPermission(role, action) {
  const restricted = ["guest", "member", "admin"];
  if (restricted.includes(role)) {
    if (action === "delete-project") return false;

    if (role === "member" || role === "guest") {
      if (action === "access-settings") return false;

      if (role === "guest") {
        return false;
      }
    }
    return true;
  }
  if (role === "owner") return true;
}
