// Generate available time slots for an artist on a given date
export interface TimeSlot {
  time: string;
  available: boolean;
  bookedBy?: string;
}

export interface DayAvailability {
  date: string;
  day: string;
  slots: TimeSlot[];
  isWeekend: boolean;
  isToday: boolean;
}

const WORKING_HOURS = {
  start: 9,
  end: 20, // 8 PM
};

// Mock: some dates/times are "booked" — seeded by artistId + date
function isBooked(artistId: string, date: string, hour: number): boolean {
  const seed = artistId.length + date.charCodeAt(8) + date.charCodeAt(9) + hour;
  return seed % 7 === 0 || seed % 11 === 0;
}

export function getAvailability(
  artistId: string,
  startDate: Date = new Date(),
  days: number = 7
): DayAvailability[] {
  const result: DayAvailability[] = [];

  for (let i = 1; i <= days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);

    const dateStr = d.toISOString().split("T")[0];
    const now = new Date();
    const isToday = dateStr === now.toISOString().split("T")[0];
    const currentHour = now.getHours();

    const slots: TimeSlot[] = [];
    for (let h = WORKING_HOURS.start; h < WORKING_HOURS.end; h++) {
      const time = `${h.toString().padStart(2, "0")}:00`;
      const isPast = isToday && h <= currentHour;
      const booked = !isPast && isBooked(artistId, dateStr, h);

      slots.push({
        time,
        available: !isPast && !booked,
        bookedBy: booked ? "reserved" : undefined,
      });
    }

    result.push({
      date: dateStr,
      day: d.toLocaleDateString("en-MY", { weekday: "short" }),
      slots,
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
      isToday,
    });
  }

  return result;
}

export function getNextAvailable(artistId: string): string | null {
  const avail = getAvailability(artistId);
  for (const day of avail) {
    const firstFree = day.slots.find((s) => s.available);
    if (firstFree) return `${day.date} ${firstFree.time}`;
  }
  return null;
}
