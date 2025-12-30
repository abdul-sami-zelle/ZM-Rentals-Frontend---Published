export const useDisableBodyScroll = (...states) => {
  useEffect(() => {
    const shouldDisableScroll = states.some(state => state);
    document.body.style.overflow = shouldDisableScroll ? "hidden" : "auto";
  }, [...states]);
};

export const handleScrolllTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

// export const convertToNZDate = (date) => {
//   const parts = new Intl.DateTimeFormat("en-NZ", {
//     timeZone: "Pacific/Auckland",
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//   }).formatToParts(date);

//   const year = Number(parts.find(p => p.type === "year").value);
//   const month = Number(parts.find(p => p.type === "month").value);
//   const day = Number(parts.find(p => p.type === "day").value);

//   // UTC date representing NZ midnight
//   return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
// };

// NZ Today Date 
export const nzToday = new Date(
  new Date().toLocaleString("en-US", {
    timeZone: "Pacific/Auckland",
  })
);

// Start of today in nz
export const nzStartOfToday = new Date(nzToday);
nzStartOfToday.setHours(0, 0, 0, 0);


export const convertToNZDate = (date) => {
  const nzDate = new Date(
    new Date(date).toLocaleString("en-US", { timeZone: "Pacific/Auckland" })
  );
  nzDate.setHours(0, 0, 0, 0); // normalize to start of day
  return nzDate;
};
