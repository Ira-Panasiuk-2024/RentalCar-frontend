import Button from '../../common/Button/Button';
import css from './LoadMoreBtn.module.css';
import { BUTTON_VARIANTS } from '../../../utils/constants';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={css.loadMoreContainer}>
      <Button
        type="button"
        variant={BUTTON_VARIANTS.loadMore}
        onClick={onClick}
      >
        Load More
      </Button>
    </div>
  );
};

export default LoadMoreBtn;
