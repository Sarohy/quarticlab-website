function isValidEmail(email) {
  // Regular expression pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Return true if email matches the pattern, false otherwise
  return emailRegex.test(email);
}

export { isValidEmail };
