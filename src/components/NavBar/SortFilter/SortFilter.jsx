import { useState } from "react";
import PropTypes from "prop-types";
import { sortingList } from "../../../constants/data";
import { ReactComponent as SortIcon } from "../../../assets/sort.svg";
import { ReactComponent as SortArrowIcon } from "../../../assets/sortArrow.svg";
import css from "./SortFilter.module.css";

export const SortFilter = ({ onSelectSort }) => {
	const [showSortList, setShowSortList] = useState(false);
	const [activeSort, setActiveSort] = useState("");

	const handleClick = () => {
		setShowSortList((prev) => !prev);
	};
	return (
		<div className={css.sortWrap}>
			<button className={css.sortButton} onClick={handleClick}>
				<span className={css.sortButtonTitle}>{activeSort || "Sort by"}</span>
				<SortIcon className={css.btnIcon} />
			</button>
			{showSortList && (
				<div className={css.sortDropdown} onClick={handleClick}>
					<div className={css.sortDropdownWrapper}>
						<button className={css.fakeSortButtonTitle}>
							<span>Sort by</span>
							<SortIcon className={css.btnIcon} />
						</button>
					</div>
					<ul className={css.sortDropdownList}>
						{sortingList.map((sortOption, idx) => {
							const sortKey = Object.keys(sortOption)[0];

							const sortLabel = sortOption[sortKey];

							return (
								<li
									className={css.sortItem}
									key={idx}
									onClick={() => {
										setShowSortList(false);
										setActiveSort(sortLabel);
										onSelectSort(sortKey);
										setShowSortList();
										handleClick();
									}}>
									<span className={css.sortSpan}>{sortLabel}</span>
									<SortArrowIcon className={css.sortArrowIcon} />
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

SortFilter.propTypes = {
	onSelectSort: PropTypes.func,
};
