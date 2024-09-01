import { useSidebarContext } from "../../contexts/useSidebarContext";
import ProjectsView from "./ProjectsView";
import ProjectSettingsView from "./ProjectSettingsView";

function SideBar() {
  const { currentView } = useSidebarContext();
  return (
    <>
      {currentView === "projects" && <ProjectsView />}
      {currentView === "settings" && <ProjectSettingsView />}
    </>
  );
}

export default SideBar;
