import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-use';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReactComponent as FilterIcon } from '../../../assets/filter.svg';

import { EventContext } from '../../EventProvider/EventProvider';
import { useEventContext, useLimitPage } from '../../../helpers';
import { categories } from '../../../constants/data';
import css from './CategoryFilter.module.css';

const filterCategories = ['all-categories', ...categories];

export const CategoryFilter = () => {
    const [showCategoryList, setShowCategoryList] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');
    const { t } = useTranslation();
    const pageLimit = useLimitPage();
    const {
        events,
        maxCardsInCategory,
        setSelectedCategory,
        updateFilterSet,
        updatePage,
        updateTotalPage,
    } = useEventContext(EventContext);

    const handleClick = () => {
        setShowCategoryList(prev => !prev);
    };
    const handleCategorySelect = selectedCategory => {
        updatePage(1);

        if (selectedCategory === 'All' || !selectedCategory) {
            updateFilterSet(false);
        } else {
            updateFilterSet(true);
        }
        setSelectedCategory(selectedCategory);
        const maxCards = Math.min(events.length, maxCardsInCategory);
        updateTotalPage(Math.ceil(Number(maxCards) / pageLimit));

        handleClick();
    };

    return (
        <div className={css.categoryWrap} onClick={handleClick}>
            <button className={css.categoryButton} aria-label="filter events">
                <span className={css.categoryButtonTitle}>
                    {activeCategory && activeCategory !== 'All'
                        ? activeCategory
                        : t('create-event-category')}
                </span>
                <FilterIcon className={css.btnIcon} />
            </button>
            {showCategoryList && (
                <div className={css.categoryDropdown} onClick={handleClick}>
                    <div className={css.categoryDropdownWrapper}>
                        <button
                            className={css.fakeCategoryButtonTitle}
                            onClick={handleClick}
                        >
                            <span>{t('create-event-category')}</span>

                            <FilterIcon className={css.btnIcon} />
                        </button>
                    </div>
                    <ul className={css.categoryDropdownList}>
                        {filterCategories.map(category => (
                            <li
                                className={css.categoryItem}
                                key={category}
                                onClick={() => {
                                    setShowCategoryList(false);
                                    setActiveCategory(t(category));
                                    handleCategorySelect(t(category));
                                    handleClick();
                                }}
                            >
                                <span className={css.categorySpan}>
                                    {t(category)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
