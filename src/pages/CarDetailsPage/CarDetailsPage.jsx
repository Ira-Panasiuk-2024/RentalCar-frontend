import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetCarDetails } from '../../redux/cars/slice';
import Header from '../../components/common/Header/Header';
import CarDetails from '../../components/CarDetailsPage/CarDetails/CarDetails';
import Loader from '../../components/common/Loader/Loader';

import css from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetCarDetails());
    };
  }, [dispatch]);

  return (
    <div className={css.pageContainer}>
      <Header />
      <div className={css.contentContainer}>
        <Loader />
        <CarDetails />
      </div>
    </div>
  );
};

export default CarDetailsPage;
