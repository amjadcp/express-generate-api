export const getDate = ({date, offsetDays=0, includeTime=false}: {date: Date, offsetDays?: number, includeTime?: boolean}): Date => {
  date.setDate(date.getDate() + offsetDays);
  if(includeTime){
    date = new Date(date.toISOString());
  }else{
    date = new Date(date.toISOString().split("T")[0]);
  }
  return date;
};

export const splitTimeSlot = (startTime: Date, endTime: Date, interval?: number): {startTime: Date, endTime: Date}[] => {
  if (!interval) {
      interval = 30 * 60 * 1000; // 30 minutes in milliseconds
  }
  const slots : {startTime: Date, endTime: Date}[]= [];
  for (let time = startTime; time < endTime; time = new Date(time.getTime() + interval)) {
      const nextTime = new Date(time.getTime() + interval);
      slots.push({
          startTime: time,
          endTime: nextTime,
      });
  }
  return slots;
};

export const getLocalTime = (date: Date): string => {
  return date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
};

export const getTimeDifferenceInMinutes = (startTime: Date, endTime: Date): number => {
  const diffInMilliseconds = endTime.getTime() - startTime.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  return diffInMinutes;
};
