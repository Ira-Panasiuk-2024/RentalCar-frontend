import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Layout } from '../components/common/Layout/Layout';
import Loader from '../components/common/Loader/Loader';
import { fetchCarBrands } from '../redux/cars/operations';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('../pages/CatalogPage/CatalogPage'));
const CarDetailsPage = lazy(() =>
  import('../pages/CarDetailsPage/CarDetailsPage')
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarBrands());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CarDetailsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
