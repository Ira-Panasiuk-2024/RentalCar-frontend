import { Formik, Field, Form, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { bookingSchema } from '../../../utils/validationSchemas';
import Button from '../../common/Button/Button';
import { BUTTON_VARIANTS } from '../../../utils/constants';
import css from './RentalForm.module.css';

const initialValues = {
  name: '',
  email: '',
  bookingDate: null,
  comment: '',
};

const RentalForm = ({ id }) => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      toast.success(
        `Your car rental request for car ${id} has been successfully submitted!`
      );
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfPreviousMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  startOfPreviousMonth.setHours(0, 0, 0, 0);

  const endOfNextMonthForNavigation = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    0
  );
  endOfNextMonthForNavigation.setHours(23, 59, 59, 999);

  const firstDayOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  firstDayOfCurrentMonth.setHours(0, 0, 0, 0);

  const lastDayOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );
  lastDayOfCurrentMonth.setHours(23, 59, 59, 999);

  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={bookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, setFieldTouched, values }) => (
          <Form className={css.form}>
            <h2 className={css.title}>Book your car now</h2>
            <p className={css.subtitle}>
              Stay connected! We are always ready to help you.
            </p>

            <div className={css.fieldWrapper}>
              <Field
                type="text"
                name="name"
                placeholder="Name*"
                className={css.input}
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.fieldWrapper}>
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={css.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldWrapper}>
              <DatePicker
                selected={values.bookingDate}
                onChange={date => {
                  setFieldValue('bookingDate', date);
                  setFieldTouched('bookingDate', true);
                }}
                onBlur={() => setFieldTouched('bookingDate', true)}
                dateFormat="d.MM.yyyy"
                placeholderText="Booking date"
                className={css.input}
                minDate={startOfPreviousMonth}
                maxDate={endOfNextMonthForNavigation}
                filterDate={date => {
                  const isTodayOrFuture = date >= today;

                  const isInCurrentMonth =
                    date >= firstDayOfCurrentMonth &&
                    date <= lastDayOfCurrentMonth;

                  return isTodayOrFuture && isInCurrentMonth;
                }}
                showPopperArrow={false}
                formatWeekDay={nameOfDay =>
                  nameOfDay.substring(0, 3).toUpperCase()
                }
                calendarStartDay={1}
                fixedHeight={true}
              />
              <ErrorMessage
                name="bookingDate"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldWrapper}>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                className={`${css.input} ${css.textarea}`}
                rows="2"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={css.error}
              />
            </div>

            <Button
              type="submit"
              variant={BUTTON_VARIANTS.send}
              disabled={isSubmitting}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RentalForm;
