import PropTypes from 'prop-types';

import css from './Container.module.css';

export const Container = ({ children }) => {
    return <section className={css.container}>{children}</section>;
};

Container.propTypes = {
    children: PropTypes.node.isRequired,
};
