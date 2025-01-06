export function millisecondsToDaysLeft(milliseconds) {
  const currentDate = Date.now();
  const timeLeft = milliseconds - currentDate;
  const millisecondsInADay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
  return Math.floor(timeLeft / millisecondsInADay);
}

export function getTimestampFromDateAndTime(dateString, timeString) {
  // Combine the date and time strings into a single datetime string
  const dateTimeString = `${dateString}T${timeString}`;

  // Convert to a Date object and get the timestamp in milliseconds
  const timestamp = new Date(dateTimeString).getTime();
  return timestamp;
}
