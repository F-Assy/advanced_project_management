import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// utility hook to redirect user if authenticated/ not authenticated

const useAuthRedirect = (currentPage) => {
  const userSession = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userSession && (currentPage === "login" || currentPage === "signup")) {
      navigate("/");
    } else if (!userSession && currentPage === "home") {
      navigate("/login");
    }
  }, [userSession, currentPage]);
};
export default useAuthRedirect;
