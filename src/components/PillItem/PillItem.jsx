import React from 'react';
import PropTypes from 'prop-types';
import style from './PillItem.scss';

function PillItem({ value, selected, handleClick, children }) {
  return (
    <li 
      className={ style.pill }
      data-selected={selected}
      onClick={handleClick}
      data-value={value}
    >
      <div>
        {children === null ? value : children}
      </div>
    </li>
  );
}

PillItem.propTypes = {
  value: PropTypes.string,
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
  children: PropTypes.node
};

PillItem.defaultProps = {
  value: '',
  selected: false,
  handleClick() {},
  children: null
};

export { PillItem };
