import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import { fetchCarDetails } from '../../../redux/cars/operations';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../redux/favorites/slice';
import { selectIsFavorite } from '../../../redux/favorites/selectors';
import Button from '../../common/Button/Button';
import css from './CarCard.module.css';
import { formatMileage } from '../../../utils/formatters';
import { BUTTON_VARIANTS } from '../../../utils/constants';

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(car.id));

  const handleGoToDetails = () => {
    dispatch(fetchCarDetails(car.id));

    navigate(`/catalog/${car.id}`);
  };

  const toggleFavorite = e => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(car.id));
    } else {
      dispatch(addToFavorites(car.id));
    }
  };

  return (
    <div className={css.carCard} onClick={handleGoToDetails}>
      <div className={css.imageWrapper}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={css.carImage}
        />
      </div>

      <div className={css.carInfo}>
        <div className={css.headerRow}>
          <div className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{' '}
            {car.year}
          </div>

          <div className={css.price}>
            {car.rentalPrice ? `$${car.rentalPrice}` : 'N/A'}
          </div>
        </div>

        <div className={css.details}>
          <div className={css.locationOne}>
            <p>{car.address ? car.address.split(', ')[1] : 'N/A'}</p>
            <p>{car.address ? car.address.split(', ')[2] : 'N/A'}</p>
            <p>{car.rentalCompany}</p>
          </div>
          <div className={css.locationTwo}>
            <p>{car.type}</p>
            <p>{car.mileage ? `${formatMileage(car.mileage)} км` : 'N/A'}</p>
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant={BUTTON_VARIANTS.readMore}
        onClick={handleGoToDetails}
      >
        Read More
      </Button>

      <button
        onClick={toggleFavorite}
        className={`${css.favoriteButton} ${isFavorite ? css.isFavorite : ''}`}
      >
        <Heart
          className={css.heartIcon}
          fill={isFavorite ? '#3470FF' : 'none'}
          stroke={isFavorite ? '#3470FF' : 'currentColor'}
        />
      </button>
    </div>
  );
};

export default CarCard;
