import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const container = document.getElementById("portal");

  return container ? createPortal(children, container) : null;
};

export default Portal;
