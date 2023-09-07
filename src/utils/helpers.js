export const isValidEmail = (email) => {
  // Regular expression pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Return true if email matches the pattern, false otherwise
  return emailRegex.test(email);
};

export const groupArrayElements = (arr, size) => {
  const groups = [];
  for (let i = 0; i < arr.length; i += size) {
    groups.push(arr.slice(i, i + size));
  }
  return groups;
};
