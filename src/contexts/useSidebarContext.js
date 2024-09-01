import { useContext } from "react";
import { SidebarViewContext } from "./ContextProvider";

export const useSidebarContext = () => {
  return useContext(SidebarViewContext);
};
