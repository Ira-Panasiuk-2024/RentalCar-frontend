import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchFilteredCars } from '../../redux/cars/operations';
import { resetCars } from '../../redux/cars/slice';
// import { setFilters, resetFilters } from '../../redux/filter/slice';
import { setFilters } from '../../redux/filter/slice';
import {
  selectCars,
  selectIsLoading,
  selectError,
  selectTotalPages,
} from '../../redux/cars/selectors';
import {
  selectFilters,
  selectBrandFilter,
  selectPriceFilter,
  selectMileageFromFilter,
  selectMileageToFilter,
} from '../../redux/filter/selectors';
import FilterForm from '../../components/CatalogPage/FilterForm/FilterForm';
import CarsList from '../../components/CatalogPage/CarsList/CarsList';
import LoadMoreBtn from '../../components/CatalogPage/LoadMoreBtn/LoadMoreBtn';
import Loader from '../../components/common/Loader/Loader';
import Header from '../../components/common/Header/Header';
import css from './CatalogPage.module.css';

// const CatalogPage = () => {
//   const dispatch = useDispatch();
//   const cars = useSelector(selectCars);
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);
//   const currentReduxFilters = useSelector(selectFilters);
//   const totalPages = useSelector(selectTotalPages);

//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   // Використовуємо useRef для зберігання попередніх значень page та filters
//   const prevPageRef = useRef(page);
//   const prevFiltersRef = useRef(currentReduxFilters);
//   const isInitialMount = useRef(true); // Додано useRef для першого монтування

//   const loadCars = useCallback(
//     (pageNum, filterParams) => {
//       console.log(
//         'loadCars called with page:',
//         pageNum,
//         'filters:',
//         filterParams
//       );
//       // Додаємо перевірку, щоб не диспатчити запит, якщо вже відбувається завантаження
//       if (!isLoading) {
//         dispatch(
//           fetchFilteredCars({ page: pageNum, limit: 12, ...filterParams })
//         );
//       }
//     },
//     [dispatch, isLoading]
//   ); // Залежності useCallback: dispatch, isLoading

//   // !!! ГОЛОВНИЙ useEffect для завантаження даних при зміні page АБО filters !!!
//   useEffect(() => {
//     console.log('Main useEffect [page, filters] triggered.');
//     const prevPage = prevPageRef.current;
//     const prevFilters = prevFiltersRef.current;

//     // Умова для виконання запиту:
//     // 1. Це перше монтування (використовуємо isInitialMount)
//     // АБО
//     // 2. Номер сторінки змінився (page !== prevPage)
//     // АБО
//     // 3. Фільтри змінилися (порівнюємо об'єкти filters та prevFilters)
//     const isPageChanged = page !== prevPage;
//     const isFiltersChanged =
//       JSON.stringify(currentReduxFilters) !== JSON.stringify(prevFilters);

//     if (isInitialMount.current || isPageChanged || isFiltersChanged) {
//       console.log('Performing data fetch...');
//       loadCars(page, currentReduxFilters);
//       // Позначаємо, що перше монтування завершено після першого запиту
//       if (isInitialMount.current) {
//         isInitialMount.current = false;
//       }
//     }

//     // Оновлюємо useRef з поточними значеннями для наступного рендера
//     prevPageRef.current = page;
//     prevFiltersRef.current = currentReduxFilters;
//   }, [page, currentReduxFilters, loadCars]); // Залежності: page, currentReduxFilters, loadCars

//   // handleFilterChange: оновлює фільтри, скидає пагінацію/список
//   const handleFilterChange = useCallback(
//     newFilters => {
//       console.log('handleFilterChange called with newFilters:', newFilters);
//       // Dispatch setFilters to update the filters state in Redux.
//       // Ця дія викличе Main useEffect [page, filters]
//       dispatch(setFilters(newFilters));

//       // Скидаємо пагінацію та очищаємо список авто
//       // Ці дії також можуть викликати Main useEffect [page, filters]
//       setPage(1); // Встановлюємо сторінку на 1
//       setHasMore(true); // Скидаємо hasMore
//       dispatch(resetCars()); // Очищаємо попередній список авто

//       // Dispatch resetFilters to clear the form fields via FilterForm's useEffect
//       dispatch(resetFilters()); // Розкоментовано, щоб форма очищалася
//     },
//     [dispatch]
//   ); // Залежність useCallback: dispatch

//   const handleLoadMore = useCallback(() => {
//     console.log(
//       'handleLoadMore called. hasMore:',
//       hasMore,
//       'isLoading:',
//       isLoading
//     );
//     if (hasMore && !isLoading) {
//       setPage(prevPage => prevPage + 1); // Збільшуємо номер сторінки
//       // Main useEffect [page, filters] спрацює і викличе loadCars
//     }
//   }, [hasMore, isLoading]);

//   // Effect to update hasMore based on totalPages
//   useEffect(() => {
//     console.log('useEffect [hasMore logic] triggered.', {
//       isLoading,
//       error,
//       page,
//       totalPages,
//       carsLength: Array.isArray(cars) ? cars.length : 'not array',
//     });
//     if (!isLoading && !error) {
//       if (totalPages !== undefined && totalPages !== null) {
//         console.log('Updating hasMore based on totalPages:', page < totalPages);
//         setHasMore(page < totalPages);
//       } else if (Array.isArray(cars)) {
//         // Fallback logic if totalPages is not available
//         console.log('Updating hasMore based on cars.length fallback.');
//         // Якщо кількість отриманих авто менша за ліміт на сторінку (12) і це не перша сторінка,
//         // це, ймовірно, остання сторінка.
//         if (cars.length > 0 && cars.length < page * 12) {
//           setHasMore(false);
//         } else if (cars.length === 0 && page === 1) {
//           // Якщо на першій сторінці немає авто, значить, більше немає
//           setHasMore(false);
//         } else if (cars.length > 0 && cars.length % 12 !== 0) {
//           // Якщо кількість отриманих авто не кратна 12 (і > 0), це остання сторінка
//           setHasMore(false);
//         } else if (cars.length === page * 12) {
//           // Якщо кількість авто точно відповідає очікуваній на сторінці, можливо, є ще
//           setHasMore(true);
//         }
//       } else {
//         setHasMore(false);
//       }
//     } else if (error) {
//       setHasMore(false);
//     }
//   }, [isLoading, error, page, totalPages, cars]); // Залежності: isLoading, error, page, totalPages, cars

//   // Error handling effect
//   useEffect(() => {
//     if (error) {
//       toast.error(`Loading error: ${error}`);
//       setHasMore(false);
//     }
//   }, [error]);

//   const carsArray = Array.isArray(cars) ? cars : [];

//   return (
//     <div className={css.catalogPage}>
//       <Header />
//       <FilterForm
//         onFilterChange={handleFilterChange}
//         brandFilter={useSelector(selectBrandFilter)}
//         priceFilter={useSelector(selectPriceFilter)}
//         mileageFromFilter={useSelector(selectMileageFromFilter)}
//         mileageToFilter={useSelector(selectMileageToFilter)}
//       />

//       {isLoading && <Loader />}

//       {carsArray.length > 0 && <CarsList cars={carsArray} />}

//       {!isLoading && hasMore && carsArray.length > 0 && (
//         <LoadMoreBtn onClick={handleLoadMore} />
//       )}

//       {!isLoading && !error && carsArray.length === 0 && (
//         <p className={css.noCarsMessage}>
//           No cars found matching your criteria.
//         </p>
//       )}

//       {!isLoading && error && (
//         <p className={css.errorMessage}>
//           Error loading data. Please try again.
//         </p>
//       )}
//     </div>
//   );
// };

// export default CatalogPage;

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentReduxFilters = useSelector(selectFilters);
  const totalPages = useSelector(selectTotalPages);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Використовуємо useRef для зберігання попередніх значень page та filters
  const prevPageRef = useRef(page);
  const prevFiltersRef = useRef(currentReduxFilters);
  const isInitialMount = useRef(true); // Додано useRef для першого монтування

  const loadCars = useCallback(
    (pageNum, filterParams) => {
      console.log(
        'loadCars called with page:',
        pageNum,
        'filters:',
        filterParams
      );
      // Додаємо перевірку, щоб не диспатчити запит, якщо вже відбувається завантаження
      if (!isLoading) {
        dispatch(
          fetchFilteredCars({ page: pageNum, limit: 12, ...filterParams })
        );
      }
    },
    [dispatch, isLoading]
  ); // Залежності useCallback: dispatch, isLoading

  // !!! ГОЛОВНИЙ useEffect для завантаження даних при зміні page АБО filters !!!
  useEffect(() => {
    console.log('Main useEffect [page, filters] triggered.');
    const prevPage = prevPageRef.current;
    const prevFilters = prevFiltersRef.current;

    // Умова для виконання запиту:
    // 1. Це перше монтування (використовуємо isInitialMount)
    // АБО
    // 2. Номер сторінки змінився (page !== prevPage)
    // АБО
    // 3. Фільтри змінилися (порівнюємо об'єкти filters та prevFilters)
    const isPageChanged = page !== prevPage;
    const isFiltersChanged =
      JSON.stringify(currentReduxFilters) !== JSON.stringify(prevFilters);

    if (isInitialMount.current || isPageChanged || isFiltersChanged) {
      console.log('Performing data fetch...');
      loadCars(page, currentReduxFilters);
      // Позначаємо, що перше монтування завершено після першого запиту
      if (isInitialMount.current) {
        isInitialMount.current = false;
      }
    }

    // Оновлюємо useRef з поточними значеннями для наступного рендера
    prevPageRef.current = page;
    prevFiltersRef.current = currentReduxFilters;
  }, [page, currentReduxFilters, loadCars]); // Залежності: page, currentReduxFilters, loadCars

  // handleFilterChange: оновлює фільтри, скидає пагінацію/список
  const handleFilterChange = useCallback(
    newFilters => {
      console.log('handleFilterChange called with newFilters:', newFilters);
      // Dispatch setFilters to update the filters state in Redux.
      // Ця дія викличе Main useEffect [page, filters]
      dispatch(setFilters(newFilters));

      // Скидаємо пагінацію та очищаємо список авто
      // Ці дії також можуть викликати Main useEffect [page, filters]
      setPage(1); // Встановлюємо сторінку на 1
      setHasMore(true); // Скидаємо hasMore
      dispatch(resetCars()); // Очищаємо попередній список авто

      // Видалено виклик resetFilters, оскільки він скидає фільтри відразу після їх встановлення
      // dispatch(resetFilters());
    },
    [dispatch]
  ); // Залежність useCallback: dispatch

  const handleLoadMore = useCallback(() => {
    console.log(
      'handleLoadMore called. hasMore:',
      hasMore,
      'isLoading:',
      isLoading
    );
    if (hasMore && !isLoading) {
      setPage(prevPage => prevPage + 1); // Збільшуємо номер сторінки
      // Main useEffect [page, filters] спрацює і викличе loadCars
    }
  }, [hasMore, isLoading]);

  // Effect to update hasMore based on totalPages
  useEffect(() => {
    console.log('useEffect [hasMore logic] triggered.', {
      isLoading,
      error,
      page,
      totalPages,
      carsLength: Array.isArray(cars) ? cars.length : 'not array',
    });
    if (!isLoading && !error) {
      if (totalPages !== undefined && totalPages !== null) {
        console.log('Updating hasMore based on totalPages:', page < totalPages);
        setHasMore(page < totalPages);
      } else if (Array.isArray(cars)) {
        // Fallback logic if totalPages is not available
        console.log('Updating hasMore based on cars.length fallback.');
        // Якщо кількість отриманих авто менша за ліміт на сторінку (12) і це не перша сторінка,
        // це, ймовірно, остання сторінка.
        if (cars.length > 0 && cars.length < page * 12) {
          setHasMore(false);
        } else if (cars.length === 0 && page === 1) {
          // Якщо на першій сторінці немає авто, значить, більше немає
          setHasMore(false);
        } else if (cars.length > 0 && cars.length % 12 !== 0) {
          // Якщо кількість отриманих авто не кратна 12 (і > 0), це остання сторінка
          setHasMore(false);
        } else if (cars.length === page * 12) {
          // Якщо кількість авто точно відповідає очікуваній на сторінці, можливо, є ще
          setHasMore(true);
        }
      } else {
        setHasMore(false);
      }
    } else if (error) {
      setHasMore(false);
    }
  }, [isLoading, error, page, totalPages, cars]); // Залежності: isLoading, error, page, totalPages, cars

  // Error handling effect
  useEffect(() => {
    if (error) {
      toast.error(`Loading error: ${error}`);
      setHasMore(false);
    }
  }, [error]);

  const carsArray = Array.isArray(cars) ? cars : [];

  return (
    <div className={css.catalogPage}>
      <Header />
      <FilterForm
        onFilterChange={handleFilterChange}
        brandFilter={useSelector(selectBrandFilter)}
        priceFilter={useSelector(selectPriceFilter)}
        mileageFromFilter={useSelector(selectMileageFromFilter)}
        mileageToFilter={useSelector(selectMileageToFilter)}
      />

      {isLoading && <Loader />}

      {carsArray.length > 0 && <CarsList cars={carsArray} />}

      {!isLoading && hasMore && carsArray.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {!isLoading && !error && carsArray.length === 0 && (
        <p className={css.noCarsMessage}>
          No cars found matching your criteria.
        </p>
      )}

      {!isLoading && error && (
        <p className={css.errorMessage}>
          Error loading data. Please try again.
        </p>
      )}
    </div>
  );
};

export default CatalogPage;
