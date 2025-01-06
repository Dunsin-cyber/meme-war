export function millisecondsToDaysLeft(milliseconds) {
  const currentDate = Date.now();
  const timeLeft = milliseconds - currentDate;
  const millisecondsInADay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
  return Math.floor(timeLeft / millisecondsInADay);
}
