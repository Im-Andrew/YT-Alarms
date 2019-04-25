import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './NavTab.scss';

class NavTab extends React.PureComponent {
  static propTypes = {
    to: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
    active: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    active: false,
    to: '',
    children: ''
  };

  render() {
    const { active, children, to } = this.props;
    const className = active ? style.active : style.normal;
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }
}

export { NavTab };
