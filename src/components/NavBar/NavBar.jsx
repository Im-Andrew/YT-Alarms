import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavBar.scss';

class NavBar extends React.Component {
  state = {
    menuOpen: false
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    children: ''
  };

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  };

  render() {
    const { children, title } = this.props;
    const { menuOpen } = this.state;

    const hamburgerClass = classNames(styles.hamburger, {
      [styles.open]: menuOpen
    });

    return (
      <div className={styles.outterBar}>
        <div className={styles.bar}>
          <div className={styles.brand}>
            <h1 className={styles.title}>{title}</h1>
            <button
              className={hamburgerClass}
              type="button"
              onClick={this.toggleMenu}
            >
              <div />
            </button>
          </div>
          <div
            className={styles.tabGroup}
            style={{
              display: menuOpen && 'block'
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export { NavBar };
