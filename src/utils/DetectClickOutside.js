import { useEffect } from "react";

/**
 * Detects clicks outside the passed ref and calls the callback
 * @param {React.RefObject} ref - The element reference to watch
 * @param {Function} onOutsideClick - Callback to run when clicked outside
 */
export const useOutsideClick = (ref, onOutsideClick) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onOutsideClick]);
};
