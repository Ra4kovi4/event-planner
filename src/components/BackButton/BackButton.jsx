import { NavLink } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import css from "./BackButton.module.css";

export const BackButton = () => {
	return (
		<div className={css.button_container}>
			<NavLink className={css.back_link} to='/'>
				<BackIcon className={css.backBtn} aria-label='back icon' />
				<span>Back</span>
			</NavLink>
		</div>
	);
};
