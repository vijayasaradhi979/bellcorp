// Format currency to 2 decimal places
export const formatCurrency = (amount) => {
  return parseFloat(amount).toFixed(2);
};

// Format date to readable string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
