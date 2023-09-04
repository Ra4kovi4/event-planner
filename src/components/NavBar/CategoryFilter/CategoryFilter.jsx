import { useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as FilterIcon } from "../../../assets/filter.svg";

import css from "./CategoryFilter.module.css";

const categories = [
	"All",
	"Art",
	"Business",
	"Music",
	"Conference",
	"Workshop",
	"Party",
	"Sport",
];

export const CategoryFilter = ({ onSelect }) => {
	const [showCategoryList, setShowCategoryList] = useState(false);
	const [activeCategory, setActiveCategory] = useState("");

	const handleClick = () => {
		setShowCategoryList((prev) => !prev);
	};

	return (
		<div className={css.categoryWrap} onClick={handleClick}>
			<button className={css.categoryButton} aria-label='filter'>
				<span className={css.categoryButtonTitle}>
					{activeCategory || "Category"}
				</span>
				<FilterIcon className={css.btnIcon} />
			</button>
			{showCategoryList && (
				<div className={css.categoryDropdown}>
					<div className={css.categoryDropdownWrapper}>
						<button className={css.fakeCategoryButtonTitle}>
							<span>Category</span>

							<FilterIcon className={css.btnIcon} />
						</button>
					</div>
					<ul className={css.categoryDropdownList}>
						{categories.map((category) => (
							<li
								className={css.categoryItem}
								key={category}
								onClick={() => {
									setShowCategoryList(false);
									setActiveCategory(category);
									onSelect(category);
									handleClick();
								}}>
								{category}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
CategoryFilter.propTypes = {
	onSelect: PropTypes.func,
};
