export const formatMileage = mileage => {
  if (!mileage && mileage !== 0) return '';

  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default formatMileage;
