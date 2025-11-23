interface AttendanceData {
   attendanceData: Array<{
        date: Date;
        attended: boolean;
    }>;
}

export function attendatePerDateMetrics(attendanceData: AttendanceData) {
  const chartData: { Date: string; present: number; absent: number }[] = [];
  for (const record of attendanceData.attendanceData) {
    const date = new Date(record.date).toLocaleDateString();
    const existingEntry = chartData.find((entry) => entry.Date === date);
    if (existingEntry) {
      if (record.attended) {
        existingEntry.present += 1;
      } else {
        existingEntry.absent += 1;
      }
    } else {
      chartData.push({
        Date: date,
        present: record.attended ? 1 : 0,
        absent: record.attended ? 0 : 1,
      });
    }
  }
    return chartData;
}
