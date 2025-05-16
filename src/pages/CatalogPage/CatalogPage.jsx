import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchFilteredCars } from '../../redux/cars/operations';
import { resetCars } from '../../redux/cars/slice';
import {
  selectCars,
  selectIsLoading,
  selectError,
  selectTotalPages,
} from '../../redux/cars/selectors';
import { setFilters } from '../../redux/filter/slice';
import { selectFilters } from '../../redux/filter/selectors';
import FilterForm from '../../components/CatalogPage/FilterForm/FilterForm';
import CarsList from '../../components/CatalogPage/CarsList/CarsList';
import LoadMoreBtn from '../../components/CatalogPage/LoadMoreBtn/LoadMoreBtn';
import Loader from '../../components/common/Loader/Loader';
import Header from '../../components/common/Header/Header';
import css from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentReduxFilters = useSelector(selectFilters);
  const totalPages = useSelector(selectTotalPages);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const appliedFiltersRef = useRef(currentReduxFilters);
  const isLoadingRef = useRef(isLoading);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Ref для відстеження, чи запит для даної комбінації фільтрів/сторінки вже був ініційований
  const didFetchForCombinationRef = useRef({});

  // Оновлюємо isLoadingRef при зміні isLoading
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  // Функція для завантаження автомобілів
  const loadCars = useCallback(
    (pageNum, filterParams) => {
      const filterKey = JSON.stringify({ page: pageNum, ...filterParams });

      // Запобігаємо дублюванню запитів: якщо завантаження йде або запит вже був ініційований
      if (isLoadingRef.current || didFetchForCombinationRef.current[filterKey]) {
        return;
      }

      dispatch(
        fetchFilteredCars({ page: pageNum, limit: 12, ...filterParams })
      );

      // Позначаємо цю комбінацію як ініційовану
      didFetchForCombinationRef.current[filterKey] = true;
    },
    [dispatch]
  );

  // Основний useEffect для ініціації завантаження
  useEffect(() => {
    loadCars(page, appliedFiltersRef.current);
  }, [page, fetchTrigger, loadCars]);

  // Обробник зміни фільтрів
  const handleFilterChange = useCallback(
    newFilters => {
      dispatch(setFilters(newFilters));
      appliedFiltersRef.current = newFilters;

      setPage(1);
      setHasMore(true);
      dispatch(resetCars());

      // Скидаємо всі прапори ініційованих запитів для нового пошуку
      didFetchForCombinationRef.current = {};
      setFetchTrigger(prev => prev + 1);
    },
    [dispatch]
  );

  // Обробник для кнопки "Load More"
  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoadingRef.current) {
      setPage(prevPage => prevPage + 1);
    }
  }, [hasMore]);

  // Ефект для оновлення стану hasMore
  useEffect(() => {
    if (!isLoading && !error) {
      if (totalPages !== undefined && totalPages !== null) {
        setHasMore(page < totalPages);
      } else if (Array.isArray(cars)) {
        const expectedCarsPerPage = 12;
        if (cars.length === 0 && page === 1) {
          setHasMore(false);
        } else if (cars.length < page * expectedCarsPerPage) {
          setHasMore(false);
        } else if (cars.length > 0 && cars.length % expectedCarsPerPage !== 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        setHasMore(false);
      }
    } else if (error) {
      setHasMore(false);
    }
  }, [isLoading, error, page, totalPages, cars]);

  // Ефект для відображення помилок за допомогою toast
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
      <FilterForm onFilterChange={handleFilterChange} />

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
