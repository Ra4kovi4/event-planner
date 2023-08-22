import PropTypes from "prop-types";
import css from "./Title.module.css";
export const Title = ({ children }) => {
	return (
		<div className={css.mainTitleContainer}>
			<h1 className={css.title}>{children}</h1>
		</div>
	);
};

Title.propTypes = {
	children: PropTypes.node.isRequired,
};
