export const getDate = ({date, offsetDays=0, includeTime=false}) => {
  date.setDate(date.getDate() + offsetDays);
  if(includeTime){
    date = new Date(date.toISOString());
  }else{
    date = new Date(date.toISOString().split("T")[0]);
  }
  return date;
};

export const splitTimeSlot = (startTime, endTime, interval) => {
  if (!interval) {
      interval = 30 * 60 * 1000; // 30 minutes in milliseconds
  }
  const slots = [];
  for (let time = startTime; time < endTime; time = new Date(time.getTime() + interval)) {
      const nextTime = new Date(time.getTime() + interval);
      slots.push({
          startTime: time,
          endTime: nextTime,
      });
  }
  return slots;
};

export const getLocalTime = (date) => {
  return date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
};

export const getTimeDifferenceInMinutes = (startTime, endTime) => {
  const diffInMilliseconds = endTime.getTime() - startTime.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  return diffInMinutes;
};
