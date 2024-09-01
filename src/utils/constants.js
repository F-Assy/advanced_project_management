import CompleteIcon from "../assets/CompleteIcon";
import InProgressIcon from "../assets/InProgressIcon";
import TodoCircleIcon from "../assets/TodoIcon";

export const server_url = "http://localhost:3000";

export const statuses = {
  todo: {
    name: "to do",
    Icon: TodoCircleIcon,
  },
  progress: {
    name: "in progress",
    Icon: InProgressIcon,
  },
  complete: {
    name: "complete",
    Icon: CompleteIcon,
  },
};
