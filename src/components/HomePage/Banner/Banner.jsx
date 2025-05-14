import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllCars } from '../../../redux/cars/operations';
import Button from '../../common/Button/Button';
import css from './Banner.module.css';

const Banner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewCatalog = () => {
    dispatch(fetchAllCars({ page: 1, limit: 12 }));

    navigate('/catalog');
  };

  return (
    <section className={css.hero}>
      <div className={css.box}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.description}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Button
          label="View Catalog"
          variant="catalog"
          onClick={handleViewCatalog}
        />
      </div>
    </section>
  );
};

export default Banner;
