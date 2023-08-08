import PropTypes from "prop-types";
import css from "./Title.module.css";
export const Title = ({ children }) => {
	return (
		<div className={css.mainTitleContainer}>
			<h2 className={css.mainTitle}>{children}</h2>
		</div>
	);
};

Title.propTypes = {
	children: PropTypes.node.isRequired,
};
