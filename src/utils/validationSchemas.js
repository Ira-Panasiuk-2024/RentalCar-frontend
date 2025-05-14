import * as Yup from 'yup';

export const bookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(17, 'Name must be 17 characters or less')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  bookingDate: Yup.date()
    .min(new Date(), 'Arrival date cannot be in the past.')
    .max(() => {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }, 'Arrival date cannot be after the end of the current month.')
    .optional(),
  comment: Yup.string()
    .min(2, 'Comment must be at least 2 characters')
    .max(60, 'Comment must be 60 characters or less')
    .optional(),
});
