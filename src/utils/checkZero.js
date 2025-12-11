export const checkIsZero = (value) => {
  if (value === null || value === undefined) return '';

  const num = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(num)) return '';

  // Remove unnecessary decimal zeros
  const cleaned = Number.isInteger(num) ? num : parseFloat(num.toFixed(2));

  // Add commas for thousands
  return cleaned.toLocaleString();
};
