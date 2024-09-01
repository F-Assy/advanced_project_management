import { useEffect } from "react";

function useClickOutside(ref, isOpen, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click is outside the referenced element
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, isOpen]);
}

export default useClickOutside;
