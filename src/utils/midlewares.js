export const useDisableBodyScroll = (...states) => {
  useEffect(() => {
    const shouldDisableScroll = states.some(state => state);
    document.body.style.overflow = shouldDisableScroll ? "hidden" : "auto";
  }, [...states]);
};

export const handleScrolllTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

export const getNZNow = () => {
  return new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Pacific/Auckland",
    })
  );
};

export const toNZMidnight = (date) => {
  const nz = new Date(
    new Date(date).toLocaleString("en-US", {
      timeZone: "Pacific/Auckland",
    })
  );
  nz.setHours(0, 0, 0, 0);
  return nz;
};

export // Convert NZ date + time → UTC ISO string
const nzDateTimeToUTCISO = (date, time) => {
  const [hourMin, meridiem] = time.split(" ");
  let [hour, minute] = hourMin.split(":").map(Number);

  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;

  // Create date as NZ local
  const nzLocal = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    minute
  );

  // Convert NZ local → UTC
  const utc = new Date(
    nzLocal.toLocaleString("en-US", { timeZone: "UTC" })
  );

  return utc.toISOString();
};


export const getDateAtNZ10AM_UTC = (date) => {
  const nz10AM = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    10,
    0,
    0
  );

  const utc = new Date(
    nz10AM.toLocaleString("en-US", { timeZone: "UTC" })
  );

  return utc.toISOString();
};

