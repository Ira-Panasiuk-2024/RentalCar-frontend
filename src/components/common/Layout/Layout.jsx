import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Toaster } from 'react-hot-toast';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={css.main}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Toaster position="top-right" reverseOrder={false} className={css.toast} />
    </>
  );
};
