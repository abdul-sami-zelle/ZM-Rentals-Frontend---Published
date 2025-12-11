import { useEffect, useState } from "react";

export default function useCalendarNavigation(ref, isOpen, onSelect) {
  const [activeDate, setActiveDate] = useState(null);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const container = ref.current;
    const tiles = container.querySelectorAll(".react-calendar__tile");

    const handleKeyDown = (e) => {
      // ✅ Only handle keys if focus is inside the calendar container
      if (!container.contains(document.activeElement)) return;

      // ✅ Only process relevant keys
      if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Enter", " "].includes(e.key)) return;

      e.preventDefault(); // stop page scroll

      if (tiles.length === 0) return;

      // Default to first enabled tile if none is active
      if (activeDate === null) {
        const firstEnabled = Array.from(tiles).findIndex((tile) => !tile.disabled);
        if (firstEnabled !== -1) {
          setActiveDate(firstEnabled);
          tiles[firstEnabled].focus();
        }
        return;
      }

      let newIndex = activeDate;

      if (e.key === "ArrowRight") newIndex = Math.min(activeDate + 1, tiles.length - 1);
      if (e.key === "ArrowLeft") newIndex = Math.max(activeDate - 1, 0);
      if (e.key === "ArrowDown") newIndex = Math.min(activeDate + 7, tiles.length - 1);
      if (e.key === "ArrowUp") newIndex = Math.max(activeDate - 7, 0);

      if (e.key === "Enter" || e.key === " ") {
        tiles[activeDate]?.click();
        if (onSelect) onSelect(tiles[activeDate]);
      } else {
        tiles[newIndex]?.focus();
        setActiveDate(newIndex);
      }
    };

    // ✅ Attach to document (so keyboard still works), but only react when calendar is focused
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, ref, activeDate, onSelect]);

  useEffect(() => {
    if (!isOpen) setActiveDate(null);
  }, [isOpen]);

  return activeDate;
}
