import * as Yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

const lastDayOfCurrentMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  0
);
lastDayOfCurrentMonth.setHours(23, 59, 59, 999);

export const bookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(17, 'Name must be 17 characters or less')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  bookingDate: Yup.date()
    .nullable(true)
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(today, 'Booking date cannot be in the past')
    .max(
      lastDayOfCurrentMonth,
      `Booking date cannot be after ${lastDayOfCurrentMonth.toLocaleDateString()}`
    )
    .typeError('Invalid date format'),
  comment: Yup.string()
    .min(2, 'Comment must be at least 2 characters')
    .max(60, 'Comment must be 60 characters or less')
    .optional(),
});
