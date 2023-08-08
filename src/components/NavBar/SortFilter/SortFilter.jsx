import { useState } from "react";
import { sortingList } from "../../../constants/data";
import sortIcon from "../../../assets/sort.svg";
import sortArrowIcon from "../../../assets/sortArrow.svg";
import css from "./SortFilter.module.css";

export const SortFilter = () => {
	const [showSortList, setShowSortList] = useState(false);
	const [activeSort, setActiveSort] = useState("");

	const handleClick = () => {
		setShowSortList(!showSortList);
	};
	return (
		<div className={css.sortWrap}>
			<button className={css.sortButton} onClick={handleClick} disabled>
				<span className={css.sortButtonTitle}>{activeSort || "Sort by"}</span>
				<img className={css.sortBtnIcon} src={sortIcon} />
			</button>
			{showSortList && (
				<div className={css.sortDropdown}>
					<div className={css.sortDropdownWrapper}>
						<button className={css.fakeSortButtonTitle}>Sort by</button>
						<img className={css.sortBtnIcon} src={sortIcon} />
					</div>
					<ul className={css.sortDropdownList}>
						{sortingList.map((sort, idx) => (
							<li
								className={css.sortItem}
								key={idx}
								onClick={() => {
									setShowSortList(false);

									setActiveSort(sort);
								}}>
								<span className={css.sortSpan}>{sort}</span>

								<img
									className={css.sortArrowIcon}
									src={sortArrowIcon}
									alt='sort arrow'
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
