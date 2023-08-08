import { Link } from "react-router-dom";
import addIcon from "../../assets/plus.svg";
import css from "./NavBar.module.css";
import { Title } from "../Title/Title";

export const NavBar = () => {
	return (
		<>
			<div className={css.navWrap}>
				<div className={css.filterWrap}>
					<div>
						<Link to='events/add' className={css.addButton}>
							<img src={addIcon} />
							<span className={css.addButtonText}>Add new event</span>
						</Link>
					</div>
					<Title>My events</Title>
				</div>
			</div>
		</>
	);
};
