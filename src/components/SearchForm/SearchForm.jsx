import searchSVG from "../../assets/search.svg";
import css from "./SearchForm.module.css";

export const SearchForm = () => {
	return (
		<form className={css.searchForm}>
			<label className={css.searchLabel}>
				<img className={css.icon} src={searchSVG} alt='search' />
				<input
					className={css.searchInput}
					type='text'
					name='search'
					placeholder='Search by keywords'
				/>
			</label>
		</form>
	);
};
