import { useEffect, useState } from "react";


export default function useDropdownNavigationWithSearch(ref, isOpen, itemClass, onSelect) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchChar, setSearchChar] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const container = ref.current;
    const items = container.querySelectorAll(`.${itemClass}`);

    const handleKeyDown = (e) => {
      if (items.length === 0) return;

      // 🔽 Arrow navigation
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();

        setActiveIndex((prev) => {
          let newIndex = prev;

          if (e.key === "ArrowDown") {
            newIndex = prev < items.length - 1 ? prev + 1 : prev;
          } else if (e.key === "ArrowUp") {
            newIndex = prev > 0 ? prev - 1 : 0;
          }

          items[newIndex]?.scrollIntoView({
            block: "nearest",
            inline: "nearest",
            behavior: "smooth",
          });

          return newIndex;
        });
      }

      // 🔽 Letter key navigation
      if (/^[a-z]$/i.test(e.key)) {
        const char = e.key.toLowerCase();

        if (searchChar === char) {
          setCharIndex((prev) => prev + 1);
        } else {
          setSearchChar(char);
          setCharIndex(0);
        }

        const matches = Array.from(items)
          .map((el, i) => ({ el, index: i }))
          .filter((c) => c.el.textContent.trim().toLowerCase().startsWith(char));

        if (matches.length > 0) {
          const match = matches[charIndex % matches.length];
          setActiveIndex(match.index);

          items[match.index]?.scrollIntoView({
            block: "nearest",
            inline: "nearest",
            behavior: "smooth",
          });
        }
      }

      // 🔽 Select with Enter/Space
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (activeIndex >= 0 && items[activeIndex]) {
          items[activeIndex].click();
          if (onSelect) {
            onSelect(items[activeIndex], activeIndex);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, ref, itemClass, activeIndex, onSelect, searchChar, charIndex]);

  useEffect(() => {
    if (!isOpen) setActiveIndex(-1);
  }, [isOpen]);

  return activeIndex;
}

export function useDropdownNavigation(ref, isOpen, itemClass, onSelect) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const container = ref.current;
    const items = container.querySelectorAll(`.${itemClass}`);

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(); // prevent page scroll

        if (items.length === 0) return;

        setActiveIndex((prev) => {
          let newIndex = prev;

          if (e.key === "ArrowDown") {
            newIndex = prev < items.length - 1 ? prev + 1 : items.length - 1;
          } else if (e.key === "ArrowUp") {
            newIndex = prev > 0 ? prev - 1 : 0;
          }

          // Scroll active item into view
          items[newIndex]?.scrollIntoView({
            block: "nearest",
            inline: "nearest",
            behavior: "smooth",
          });

          return newIndex;
        });
      }

      // ✅ Trigger click on active item with Enter/Space
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();

        if (activeIndex >= 0 && items[activeIndex]) {
          items[activeIndex].click(); // simulate click
          if (onSelect) {
            onSelect(items[activeIndex], activeIndex);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, ref, itemClass, activeIndex, onSelect]);

  // reset index when closed
  useEffect(() => {
    if (!isOpen) setActiveIndex(-1);
  }, [isOpen]);

  return activeIndex;
}
