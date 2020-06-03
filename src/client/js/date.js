// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString)
{
  // First check for the pattern
  if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
      return false;

  // Parse the date parts to integers
  var parts = dateString.split("/");
  var month = parseInt(parts[1], 10);
  var day = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if(year < 1000 || year > 3000 || month == 0 || month > 12)
      return false;

  var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  // Adjust for leap years
  if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

// Finds the number of days to go to the trip from the current date
function findDays(date) {
  const da = date.split('/');
  const d = da[0]; const m = da[1]; const y = da[2];
  const departure_date = new Date(`${m}/${d}/${y}`);
  const current_date = new Date(); 

  // To calculate the time difference of two dates 
  const time = departure_date.getTime() - current_date.getTime(); 

  // To calculate the no. of days between two dates 
  const days = time / (1000 * 3600 * 24); 

  //To display the final no. of days (result) 
  console.log(days);
  return Number(Math.round(days));
}

export { isValidDate, findDays }