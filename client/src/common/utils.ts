// Formats date to "01/2022"
export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  if (month === 'NaN' || isNaN(year)) {
    return 'Nesprávny dátum';
  }
  return `${month}/${year}`;
};

// Formats numbers to "13 195,42 €"
export const formatNumber = (number: number) => {
  const parts = number.toFixed(2).split('.');

  // Add thousands separators by using a regular expression
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return `${parts.join(',')} €`;
};

// Formats array of dates to array of formatted dates to: ["januar 22", ...]
export const formatDatesToMonth = (inputDates: string[]) => {
  const months = [
    "január",
    "február",
    "marec",
    "apríl",
    "máj",
    "jún",
    "júl",
    "august",
    "september",
    "október",
    "november",
    "december",
  ];
  
return inputDates.map((inputDate) => {
  // Split the inputDate at "T" to get only the date part
  const datePart = inputDate.split("T")[0];

  // Split the date part into an array of parts (year, month, and day) using "-"
  const datePartsArray = datePart.split("-");

  // Extract the last two characters from the year part
  const year = datePartsArray[0].slice(-2);

  // Parse the month part as an integer and subtract 1
  const month = parseInt(datePartsArray[1], 10) - 1;
  return `${months[month]} ${year}`;
});
}