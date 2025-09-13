import { format } from 'date-fns'

/**
 * Formats a date object with year, month, day properties to display format
 * @param {Object} dateObject - Object with year, month, day properties
 * @param {number} dateObject.year - The year
 * @param {number} dateObject.month - The month (1-12)
 * @param {number} dateObject.day - The day
 * @returns {string} Formatted date string (e.g., "15 June 2025")
 */
export const formatDateObjectToDisplay = (dateObject) => {
  const date = new Date(dateObject.year, dateObject.month - 1, dateObject.day)
  return format(date, 'd MMMM yyyy')
}

/**
 * Formats an ISO date string to display format
 * @param {string} submissionDate - ISO date string
 * @returns {string} Formatted date string (e.g., "15 Jan 2025")
 */
export const formatSubmissionDateForDisplay = (submissionDate) => {
  return format(new Date(submissionDate), 'd MMM yyyy')
}
