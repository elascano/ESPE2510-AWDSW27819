/**
 * Date calculation utilities for student business rules
 */

/**
 * Calculate the difference between two dates in years, months, and days
 * @param {Date} startDate - The start date
 * @param {Date} endDate - The end date (default: today)
 * @returns {Object} Object with years, months, days, and totalDays
 */
export function calculateDateDifference(startDate, endDate = new Date()) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate total days
  const timeDiff = end.getTime() - start.getTime();
  const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  // Calculate years, months, days
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  
  // Adjust for negative days
  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  
  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return {
    years,
    months,
    days,
    totalDays
  };
}

/**
 * Calculate days until next birthday
 * @param {Date} birthDate - The birth date
 * @param {Date} today - Current date (default: today)
 * @returns {Object} Object with daysUntil and nextBirthday
 */
export function calculateBirthdayCountdown(birthDate, today = new Date()) {
  const birth = new Date(birthDate);
  const current = new Date(today);
  
  // Get next birthday
  const nextBirthday = new Date(
    current.getFullYear(),
    birth.getMonth(),
    birth.getDate()
  );
  
  // If birthday has passed this year, move to next year
  if (nextBirthday < current) {
    nextBirthday.setFullYear(current.getFullYear() + 1);
  }
  
  // Calculate days until
  const timeDiff = nextBirthday.getTime() - current.getTime();
  const daysUntil = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  return {
    daysUntil,
    nextBirthday: nextBirthday.toISOString().split('T')[0]
  };
}

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}
