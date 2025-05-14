import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { selectIsLoading } from '../../../redux/cars/selectors';
import css from './Loader.module.css';

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <div className={css.loader}>
      <BeatLoader color="#FFB627" size={30} loading={true} />
    </div>
  );
};

export default Loader;
