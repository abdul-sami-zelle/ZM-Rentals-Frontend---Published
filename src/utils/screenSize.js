import { useEffect, useState } from "react";

const ScreenResize = (minWidth = 768, maxWidth = 1200) => {
  const [isInRange, setIsInRange] = useState(false);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResizer = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);
      setIsInRange(currentWidth >= minWidth && currentWidth <= maxWidth);
    };

    handleResizer();
    window.addEventListener("resize", handleResizer);
    return () => window.removeEventListener("resize", handleResizer);
  }, [minWidth, maxWidth]);

  return { isInRange, width };
};

export default ScreenResize