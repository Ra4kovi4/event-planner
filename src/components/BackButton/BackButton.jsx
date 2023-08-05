import { NavLink } from "react-router-dom";
import backIcon from "../../assets/back.svg";
import css from "./BackButton.module.css";

export const BackButton = () => {
	return (
		<div className={css.button_container}>
			<NavLink className={css.back_link} to='/'>
				<span>
					<img src={backIcon} alt='Back' />
				</span>
				Back
			</NavLink>
		</div>
	);
};
