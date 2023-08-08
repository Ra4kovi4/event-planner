import { useMedia } from "react-use";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import addIcon from "../../assets/plus.svg";
import css from "./NavBar.module.css";
import { CategoryFilter } from "./CategoryFilter/CategoryFilter";
import { SortFilter } from "./SortFilter/SortFilter";
import { Title } from "../Title/Title";

export const NavBar = ({ onSelect }) => {
	const mobile = useMedia("(max-width: 767px)", { defaultState: false });

	return (
		<>
			<div className={css.navWrap}>
				<div className={css.navMenu}>
					<CategoryFilter onSelect={onSelect} />
					<SortFilter />
					<div className={css.addButtonWrap}>
						<Link to='events/add' className={css.addButton}>
							<img src={addIcon} />
							<span className={css.addButtonText}>Add new event</span>
						</Link>
					</div>
				</div>

				{!mobile && <Title>My events</Title>}
			</div>
		</>
	);
};

NavBar.propTypes = {
	onSelect: PropTypes.func,
};
