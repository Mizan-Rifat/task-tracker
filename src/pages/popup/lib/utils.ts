export const getFsData = doc => ({ ...doc.data(), id: doc.id });

export const currencyFormat = (amount: number, options: Intl.NumberFormatOptions = {}) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    ...options
  }).format(amount);
};

export const numberFormat = (number: number, notation: 'standard' | 'compact' = 'standard') =>
  new Intl.NumberFormat('en-US', {
    notation
  }).format(number);

export const durationFormat = (duration: number[]) => {
  const [secs, mins, hrs] = duration;
  let format = '';
  if (hrs > 0) {
    format += hrs + 'h ';
  }
  if (mins > 0) {
    format += mins + 'm ';
  }
  format += secs + 's';

  return format;
};
