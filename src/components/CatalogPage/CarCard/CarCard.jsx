import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
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
        <div className={css.title}>
          {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
        </div>

        <div className={css.price}>
          {car.rentalPrice ? `$${car.rentalPrice}` : 'N/A'}
        </div>

        <div className={css.details}>
          <p>{car.address ? car.address.split(', ')[1] : 'N/A'}</p>

          <p>{car.mileage ? formatMileage(car.mileage) : 'N/A'}</p>
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
          fill={isFavorite ? 'blue' : 'none'}
          stroke={isFavorite ? 'blue' : 'currentColor'}
        />
      </button>
    </div>
  );
};

export default CarCard;
