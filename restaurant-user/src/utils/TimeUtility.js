export const convertToAMPM = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(":");

  let hoursInt = parseInt(hours, 10);

  const period = hoursInt >= 12 ? "PM" : "AM";

  hoursInt = hoursInt % 12 || 12;

  const hours12 = String(hoursInt).padStart(2, "0");
  const minutes12 = String(minutes).padStart(2, "0");

  return `${hours12}:${minutes12} ${period}`;
};

export const isCurrentTimeBetween = (startTime, endTime) => {
  const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });

  const startDate = new Date(`1970-01-01T${startTime}`);
  const endDate = new Date(`1970-01-01T${endTime}`);
  const currentTimeDate = new Date(`1970-01-01T${currentTime}`);

  return currentTimeDate >= startDate && currentTimeDate <= endDate;
};

export const formatTimestampToDDMMMYYYY = (timestamp) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${day < 10 ? "0" : ""}${day} ${month} ${year}`;

  return formattedDate;
};

export const convertTimeToHHMMSS = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
    seconds
  )}`;

  return formattedTime;
};

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}
