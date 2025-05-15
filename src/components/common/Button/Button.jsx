import PropTypes from 'prop-types';
import css from './Button.module.css';
import { BUTTON_VARIANTS } from '../../../utils/constants';

const Button = ({
  children,
  onClick = () => {},
  variant = BUTTON_VARIANTS.catalog,
  className = '',
  type = 'button',
  disabled = false,
  ...restProps
}) => {
  const buttonClassName = `${css.button} ${css[variant] || ''} ${
    className || ''
  }`;

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  disabled: PropTypes.bool,
};

export default Button;
