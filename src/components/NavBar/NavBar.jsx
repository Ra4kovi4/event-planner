import { useMedia } from "react-use";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../assets/plus.svg";
import css from "./NavBar.module.css";
import { CategoryFilter } from "./CategoryFilter/CategoryFilter";
import { SortFilter } from "./SortFilter/SortFilter";
import { Title } from "../Title/Title";

export const NavBar = ({ onSelect, onSelectSort }) => {
	const mobile = useMedia("(max-width: 767px)", { defaultState: false });

	return (
		<>
			<div className={css.navWrap}>
				<div className={css.navMenu}>
					<CategoryFilter onSelect={onSelect} />
					<SortFilter onSelectSort={onSelectSort} />
					<div className={css.addButtonWrap}>
						<Link to='events/add' className={css.addButton}>
							<AddIcon aria-label='add event' />
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
	onSelectSort: PropTypes.func,
};
