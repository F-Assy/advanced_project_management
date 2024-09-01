import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//this is redirection for: /project/ path
function Redirector() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);
}

export default Redirector;
