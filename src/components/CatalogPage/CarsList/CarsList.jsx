import CarCard from '../CarCard/CarCard';
import css from './CarsList.module.css';

const CarsList = ({ cars }) => {
  return (
    <ul className={css.carsList}>
      {cars.map(car => (
        <li key={car.id} className={css.listItem}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
};

export default CarsList;
