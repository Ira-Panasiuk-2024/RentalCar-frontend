// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { MapPin } from 'lucide-react';
// import { CircleCheck } from 'lucide-react';
// import { Fuel } from 'lucide-react';
// import { Settings } from 'lucide-react';
// import { CarFront } from 'lucide-react';
// import { CalendarDays } from 'lucide-react';

// import { fetchCarDetails } from '../../../redux/cars/operations';
// import {
//   selectCarDetails,
//   selectIsLoading,
// } from '../../../redux/cars/selectors';
// import RentalForm from '../RentalForm/RentalForm';
// import Loader from '../././../common/Loader/Loader';
// import formatMileage from '../../../utils/formatters';
// import css from './CarDetails.module.css';

// const CarDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const car = useSelector(selectCarDetails);
//   const isLoading = useSelector(selectIsLoading);

//   useEffect(() => {
//     dispatch(fetchCarDetails(id));
//   }, [dispatch, id]);

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (!car) {
//     return <div className={css.notFound}>Car details not found</div>;
//   }

//   const rentalConditions = Array.isArray(car.rentalConditions)
//     ? car.rentalConditions
//     : [];

//   const minimumAgeCondition = rentalConditions.find(condition =>
//     condition.toLowerCase().includes('minimum ag')
//   );
//   const minimumAge = minimumAgeCondition
//     ? minimumAgeCondition.replace(/\D/g, '')
//     : '25';

//   const otherRentalConditions = rentalConditions.filter(
//     condition => !condition.toLowerCase().includes('minimum ag')
//   );

//   const formattedMileage = car.mileage ? formatMileage(car.mileage) : 'N/A';

//   return (
//     <div className={css.carDetailsContainer}>
//       <div className={css.carImageContainer}>
//         <img
//           src={car.img}
//           alt={`${car.brand} ${car.model}`}
//           className={css.carDetailImage}
//         />
//       </div>

//       <div className={css.carInfo}>
//         <div className={css.headerInfo}>
//           <h2 className={css.carTitle}>
//             {car.brand} <span className={css.model}>{car.model}</span>,{' '}
//             {car.year}
//           </h2>
//           <p className={css.carId}>Id: {car.id}</p>
//         </div>

//         <div className={css.detailsRow}>
//           <p>
//             <MapPin size={16} className={css.icon} />{' '}
//             {car.address ? car.address.split(', ')[1] : 'N/A'}
//           </p>
//           <p>{car.address ? car.address.split(', ')[2] : 'N/A'}</p>
//           <p>
//             Mileage: <span>{formattedMileage} km</span>
//           </p>
//         </div>

//         <span className={css.rentalPrice}>${car.rentalPrice}</span>

//         <div className={css.description}>
//           <p>{car.description}</p>
//         </div>

//         <div className={css.section}>
//           <h3 className={css.sectionTitle}>Rental Conditions:</h3>
//           <div className={css.conditionsList}>
//             <span className={css.conditionItem}>
//               <CircleCheck size={16} className={css.icon} /> Minimum age:{' '}
//               <span className={css.highlight}>{minimumAge}</span>
//             </span>

//             {Array.isArray(otherRentalConditions) &&
//               otherRentalConditions.map((condition, index) => (
//                 <span key={`condition-${index}`} className={css.conditionItem}>
//                   <CircleCheck size={16} className={css.icon} /> {condition}
//                 </span>
//               ))}
//           </div>
//         </div>

//         <div className={css.section}>
//           <h3 className={css.sectionTitle}>Car Specifications:</h3>
//           <div className={css.conditionsList}>
//             <p className={css.conditionItem}>
//               <CalendarDays size={16} className={css.icon} /> Year: {car.year}
//             </p>
//             <p className={css.conditionItem}>
//               <CarFront size={16} className={css.icon} /> Type: {car.type}
//             </p>
//             <p className={css.conditionItem}>
//               <Fuel size={16} className={css.icon} /> Fuel Consumption:{' '}
//               {car.fuelConsumption}
//             </p>
//             <p className={css.conditionItem}>
//               <Settings size={16} className={css.icon} /> Engine Size:{' '}
//               {car.engineSize}
//             </p>
//           </div>
//         </div>

//         <div className={css.section}>
//           <h3 className={css.sectionTitle}>Accessories and functionalities:</h3>
//           <div className={css.detailsList}>
//             {car.accessories &&
//               car.accessories.map((item, index) => (
//                 <span key={`accessory-${index}`} className={css.detailsItem}>
//                   <CircleCheck size={16} className={css.icon} /> {item}
//                 </span>
//               ))}
//             {car.functionalities &&
//               car.functionalities.map((item, index) => (
//                 <span
//                   key={`functionality-${index}`}
//                   className={css.detailsItem}
//                 >
//                   <CircleCheck size={16} className={css.icon} /> {item}
//                 </span>
//               ))}
//           </div>
//         </div>
//       </div>

//       <div className={css.formSection}>
//         <RentalForm id={car.id} />
//       </div>
//     </div>
//   );
// };

// export default CarDetails;

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin } from 'lucide-react';
import { CircleCheck } from 'lucide-react';
import { Fuel } from 'lucide-react';
import { Settings } from 'lucide-react';
import { CarFront } from 'lucide-react';
import { CalendarDays } from 'lucide-react';

import { fetchCarDetails } from '../../../redux/cars/operations';
import {
  selectCarDetails,
  selectIsLoading,
} from '../../../redux/cars/selectors';
import RentalForm from '../RentalForm/RentalForm';
import Loader from '../././../common/Loader/Loader';
import formatMileage from '../../../utils/formatters';
import css from './CarDetails.module.css';

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectCarDetails);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCarDetails(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!car) {
    return <div className={css.notFound}>Car details not found</div>;
  }

  const rentalConditions = Array.isArray(car.rentalConditions)
    ? car.rentalConditions
    : [];

  const minimumAgeCondition = rentalConditions.find(condition =>
    condition.toLowerCase().includes('minimum ag')
  );
  const minimumAge = minimumAgeCondition
    ? minimumAgeCondition.replace(/\D/g, '')
    : '25';

  const otherRentalConditions = rentalConditions.filter(
    condition => !condition.toLowerCase().includes('minimum ag')
  );

  const formattedMileage = car.mileage ? formatMileage(car.mileage) : 'N/A';

  return (
    <div className={css.carDetailsContainer}>
      <div className={css.leftColumnWrapper}>
        <div className={css.carImageContainer}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={css.carDetailImage}
          />
        </div>

        <div className={css.formSection}>
          <RentalForm id={car.id} />
        </div>
      </div>
      <div className={css.carInfo}>
        <div className={css.headerInfo}>
          <h2 className={css.carTitle}>
            {car.brand} <span className={css.model}>{car.model}</span>,{' '}
            {car.year}
          </h2>
          <p className={css.carId}>Id: {car.id}</p>
        </div>

        <div className={css.detailsRow}>
          <p>
            <MapPin size={16} className={css.icon} />{' '}
            {car.address ? car.address.split(', ')[1] : 'N/A'}
          </p>
          <p>{car.address ? car.address.split(', ')[2] : 'N/A'}</p>
          <p>
            Mileage: <span>{formattedMileage} km</span>
          </p>
        </div>

        <span className={css.rentalPrice}>${car.rentalPrice}</span>

        <div className={css.description}>
          <p>{car.description}</p>
        </div>

        <div className={css.section}>
          <h3 className={css.sectionTitle}>Rental Conditions:</h3>
          <div className={css.conditionsList}>
            <span className={css.conditionItem}>
              <CircleCheck size={16} className={css.icon} /> Minimum age:{' '}
              <span className={css.highlight}>{minimumAge}</span>
            </span>

            {Array.isArray(otherRentalConditions) &&
              otherRentalConditions.map((condition, index) => (
                <span key={`condition-${index}`} className={css.conditionItem}>
                  <CircleCheck size={16} className={css.icon} /> {condition}
                </span>
              ))}
          </div>
        </div>

        <div className={css.section}>
          <h3 className={css.sectionTitle}>Car Specifications:</h3>
          <div className={css.conditionsList}>
            <p className={css.conditionItem}>
              <CalendarDays size={16} className={css.icon} /> Year: {car.year}
            </p>
            <p className={css.conditionItem}>
              <CarFront size={16} className={css.icon} /> Type: {car.type}
            </p>
            <p className={css.conditionItem}>
              <Fuel size={16} className={css.icon} /> Fuel Consumption:{' '}
              {car.fuelConsumption}
            </p>
            <p className={css.conditionItem}>
              <Settings size={16} className={css.icon} /> Engine Size:{' '}
              {car.engineSize}
            </p>
          </div>
        </div>

        <div className={css.section}>
          <h3 className={css.sectionTitle}>Accessories and functionalities:</h3>
          <div className={css.detailsList}>
            {car.accessories &&
              car.accessories.map((item, index) => (
                <span key={`accessory-${index}`} className={css.detailsItem}>
                  <CircleCheck size={16} className={css.icon} /> {item}
                </span>
              ))}
            {car.functionalities &&
              car.functionalities.map((item, index) => (
                <span
                  key={`functionality-${index}`}
                  className={css.detailsItem}
                >
                  <CircleCheck size={16} className={css.icon} /> {item}
                </span>
              ))}
          </div>
        </div>
      </div>{' '}
      {/* Кінець carInfo */}
    </div>
  );
};

export default CarDetails;
