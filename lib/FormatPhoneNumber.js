export const FormatPhoneNumber = (input) => {
  // Remove non-numeric characters from the input
  const numericInput = input.replace(/\D/g, "");

  // Apply format: 0 (555) 555 55 55
  const regexResult = numericInput.match(
    /^0(\d{1,3})(\d{1,3})(\d{1,2})(\d{1,2})$/
  );

  if (regexResult) {
    const formattedNumber = `0 (${regexResult[1]}) ${regexResult[2]} ${regexResult[3]} ${regexResult[4]}`;
    return formattedNumber;
  }

  return input; // Return the original input if no match
};
