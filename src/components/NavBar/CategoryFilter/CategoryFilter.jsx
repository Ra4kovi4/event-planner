import { useState } from "react";
import PropTypes from "prop-types";
import filterIcon from "../../../assets/filter.svg";

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
		setShowCategoryList(!showCategoryList);
	};

	return (
		<div className={css.categoryWrap}>
			<button className={css.categoryButton} onClick={handleClick}>
				<span className={css.categoryButtonTitle}>
					{activeCategory || "Category"}
				</span>
				<img className={css.categoryBtnIcon} src={filterIcon} />
			</button>
			{showCategoryList && (
				<div className={css.categoryDropdown}>
					<div className={css.categoryDropdownWrapper}>
						<button className={css.fakeCategoryButtonTitle}>Category</button>
						<img className={css.categoryBtnIcon} src={filterIcon} />
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
