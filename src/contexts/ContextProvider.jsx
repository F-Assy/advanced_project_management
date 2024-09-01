import { createContext, useState } from "react";

export const SidebarViewContext = createContext();

const SidebarViewProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState("projects");

  return (
    <SidebarViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </SidebarViewContext.Provider>
  );
};
export { SidebarViewProvider };
