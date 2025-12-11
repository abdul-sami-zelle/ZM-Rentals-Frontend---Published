export const useDisableBodyScroll = (...states) => {
  useEffect(() => {
    const shouldDisableScroll = states.some(state => state);
    document.body.style.overflow = shouldDisableScroll ? "hidden" : "auto";
  }, [...states]);
};

export const handleScrolllTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

