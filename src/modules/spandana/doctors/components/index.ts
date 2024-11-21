import { format, parse } from "date-fns";



type TimeRange = "morning" | "afternoon" | "evening";

export const filterSlotsByTimeRange = (
  slots: AppointmentTimeSlot[],
  date: Date | null,
  timeRange: TimeRange | null
): AppointmentTimeSlot[] => {
  const now = new Date();
  const isToday = date && format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");

  return slots.filter((slot) => {
    const slotTime = parse(slot.startTime, "HH:mm", new Date());

    const isMorning = slotTime.getHours() < 12;
    const isAfternoon = slotTime.getHours() >= 12 && slotTime.getHours() < 17;
    const isEvening = slotTime.getHours() >= 17;

    if (isToday) {
      if (timeRange === "morning" && now.getHours() >= 12) {
        // Filter out slots that are in the past, but only if today
        return slotTime.getHours() < 12; // Keep only morning slots
      }
      if (timeRange === "afternoon" && now.getHours() >= 17) {
        // Filter out slots that are in the past, but only if today
        return slotTime.getHours() >= 12 && slotTime.getHours() < 17; // Keep only afternoon slots
      }
      if (timeRange === "evening") {
        return slotTime.getHours() >= 17; // Keep only evening slots
      }
    }

    // For other days or default, filter by timeRange normally
    switch (timeRange) {
      case "morning":
        return isMorning;
      case "afternoon":
        return isAfternoon;
      case "evening":
        return isEvening;
      default:
        return true; // Return all slots if no timeRange is provided
    }
  });
};
