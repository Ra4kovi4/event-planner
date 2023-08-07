import PropTypes from "prop-types";
import css from "./Title.module.css";
export const Title = ({ children }) => {
	return <h2 className={css.title}>{children}</h2>;
};

Title.propTypes = {
	children: PropTypes.node.isRequired,
};
