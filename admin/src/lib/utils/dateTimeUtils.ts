/**
 * Utility functions for date and time formatting
 */
import { format } from "date-fns";

/**
 * Formats a time string from 24-hour format to 12-hour AM/PM format
 * @param timeString - Time string in format "HH:MM" (e.g., "09:00", "14:30")
 * @returns Formatted time string (e.g., "9:00 AM", "2:30 PM")
 */
export function formatTime(timeString: string | undefined): string {
  if (!timeString) return "N/A";
  
  try {
    // Parse time string (assuming format like "09:00" or "14:30")
    const [hours, minutes] = timeString.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes)) {
      return timeString; // Return original if parsing fails
    }
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const displayMinutes = minutes.toString().padStart(2, '0');
    
    return `${displayHours}:${displayMinutes} ${period}`;
  } catch (error) {
    console.warn("Time formatting error:", error, "for time string:", timeString);
    return timeString; // Return original if formatting fails
  }
}

/**
 * Formats a time string to short AM/PM format (e.g., "9 AM", "2:30 PM")
 * @param timeString - Time string in format "HH:MM"
 * @returns Short formatted time string
 */
export function formatTimeShort(timeString: string | undefined): string {
  if (!timeString) return "N/A";
  
  try {
    const [hours, minutes] = timeString.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes)) {
      return timeString;
    }
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    
    // Only show minutes if they're not zero
    if (minutes === 0) {
      return `${displayHours} ${period}`;
    }
    
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${period}`;
  } catch (error) {
    console.warn("Time formatting error:", error, "for time string:", timeString);
    return timeString;
  }
}

/**
 * Safely formats a date string with error handling
 * @param dateString - Date string (ISO format preferred)
 * @param formatString - Date-fns format string
 * @returns Formatted date string or fallback
 */
export function formatDateSafely(dateString: string | undefined, formatString: string): string {
  if (!dateString) return "N/A";
  
  try {
    // Try parsing as ISO string first
    const  date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    
    // Import date-fns dynamically to avoid bundle issues
    return format(date, formatString);
  } catch (error) {
    console.warn("Date formatting error:", error, "for date string:", dateString);
    return "Invalid Date";
  }
}

/**
 * Formats a date to a readable string (e.g., "Monday, January 15, 2024")
 * @param dateString - Date string
 * @returns Formatted date string
 */
export function formatDateReadable(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    console.warn("Date formatting error:", error, "for date string:", dateString);
    return "Invalid Date";
  }
}

/**
 * Formats a date to a short readable string (e.g., "Jan 15, 2024")
 * @param dateString - Date string
 * @returns Short formatted date string
 */
export function formatDateShort(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  } catch (error) {
    console.warn("Date formatting error:", error, "for date string:", dateString);
    return "Invalid Date";
  }
}

/**
 * Gets the day of the week from a date string
 * @param dateString - Date string
 * @returns Day of the week (e.g., "Monday")
 */
export function getDayOfWeek(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  } catch (error) {
    console.warn("Date formatting error:", error, "for date string:", dateString);
    return "Invalid Date";
  }
}


/**
 * Formats a date range (e.g., "Jan 15 - Jan 20, 2024")
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: string | undefined, endDate: string | undefined): string {
  if (!startDate || !endDate) return "N/A";
  
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "Invalid Date Range";
    }
    
    const startFormatted = start.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    
    const endFormatted = end.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    return `${startFormatted} - ${endFormatted}`;
  } catch (error) {
    console.warn("Date range formatting error:", error);
    return "Invalid Date Range";
  }
}

/**
 * Gets relative time (e.g., "2 hours ago", "3 days ago")
 * @param dateString - Date string
 * @returns Relative time string
 */
export function getRelativeTime(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    
    return formatDateShort(dateString);
  } catch (error) {
    console.warn("Relative time error:", error);
    return formatDateShort(dateString);
  }
}

/**
 * Gets the year from a date string
 * @param dateString - Date string
 * @returns Year as a number or "N/A"
 */
export function getYear(dateString: string | undefined): string | number {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    
    return date.getFullYear();
  } catch (error) {
    console.warn("Year extraction error:", error, "for date string:", dateString);
    return "Invalid Date";
  }
}