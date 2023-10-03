import { useState } from 'react';

import { sortingList } from '../../../constants/data';
import { ReactComponent as SortIcon } from '../../../assets/sort.svg';
import { ReactComponent as SortArrowIcon } from '../../../assets/sortArrow.svg';
import { useEventContext } from '../../../helpers';
import { EventContext } from '../../EventProvider/EventProvider';
import css from './SortFilter.module.css';
import { useTranslation } from 'react-i18next';

export const SortFilter = () => {
    const [showSortList, setShowSortList] = useState(false);
    const [activeSort, setActiveSort] = useState('');
    const { t } = useTranslation();
    const { handleSortChange } = useEventContext(EventContext);

    const handleClick = () => {
        setShowSortList(prev => !prev);
    };

    return (
        <div className={css.sortWrap}>
            <button
                className={css.sortButton}
                onClick={handleClick}
                aria-label="sort events"
            >
                <span className={css.sortButtonTitle}>
                    {activeSort || t('sort-by')}
                </span>
                <SortIcon className={css.btnIcon} />
            </button>
            {showSortList && (
                <div className={css.sortDropdown} onClick={handleClick}>
                    <div className={css.sortDropdownWrapper}>
                        <button className={css.fakeSortButtonTitle}>
                            <span>{t('sort-by')}</span>
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
                                        setActiveSort(t(sortLabel));
                                        handleSortChange(t(sortKey));
                                        setShowSortList();
                                        handleClick();
                                    }}
                                >
                                    <span className={css.sortSpan}>
                                        {t(sortLabel)}
                                    </span>
                                    <SortArrowIcon
                                        className={css.sortArrowIcon}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};
