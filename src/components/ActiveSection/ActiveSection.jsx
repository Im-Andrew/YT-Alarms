import React from 'react';
import PropTypes from 'prop-types';
import style from './ActiveSection.scss';

class ActiveSection extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    };

    render() {
        const { title, children } = this.props;

        return (
            <section className={style.section}>
                <h2>
                    {title}
                </h2>
                <ul>
                    {children}
                </ul>
            </section>
        );
    }
}

export {ActiveSection};


