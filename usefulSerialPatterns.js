const patterns = {
  twoUniqueDigits: /^(\d)\1*(?!\1)(\d)\2*(\1|\2)*$/,
  onlyLowDigits: /^[0-3]+$/,
  threesAndNines: /^[39]+$/,
};

export default patterns;
