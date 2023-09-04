import PropTypes from "prop-types";

import { ReactComponent as SearchSVG } from "../../assets/search.svg";
import css from "./SearchForm.module.css";

export const SearchForm = () => {
	return (
		<form className={css.searchForm}>
			<label className={css.searchLabel}>
				<SearchSVG className={css.icon} aria-label='search events by title' />
				<input
					className={css.searchInput}
					type='text'
					name='search'
					disabled
					placeholder='Search by keywords'
				/>
			</label>
		</form>
	);
};
SearchForm.propTypes = {
	onSearch: PropTypes.func,
};
