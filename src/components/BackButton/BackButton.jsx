import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import css from "./BackButton.module.css";

export const BackButton = ({ onBack }) => {
	return (
		<div className={css.button_container}>
			<button className={css.back_link} onClick={onBack}>
				<BackIcon className={css.backBtn} aria-label='back icon' />
				<span>Back</span>
			</button>
		</div>
	);
};

BackButton.propTypes = {
	onBack: PropTypes.func.isRequired,
};
