import PropTypes from 'prop-types';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import { ReactComponent as SearchSVG } from '../../assets/search.svg';
import { useTranslation } from 'react-i18next';
import { EventContext } from '../EventProvider/EventProvider';
import { fetchEventsByKeyword } from '../../service';
import { useLimitPage, useEventContext } from '../../helpers';
import css from './SearchForm.module.css';

export const SearchForm = () => {
    const limitPage = useLimitPage();
    const { t } = useTranslation();
    const {
        events,
        page,
        setIsLoading,
        getEvents,
        updateEvents,
        updateTotalPage,
    } = useEventContext(EventContext);

    const getEventsByKeyword = async query => {
        setIsLoading(true);

        try {
            const events = await fetchEventsByKeyword(query, page, limitPage);
            updateEvents(events);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeSearch = e => {
        const newTitle = e.target.value;
        if (newTitle !== '' && newTitle !== undefined) {
            debouncedChangeHandler(newTitle);
            updateTotalPage(Math.ceil(events) / limitPage);
        } else {
            getEvents();
        }
    };

    const debouncedChangeHandler = useCallback(
        debounce(getEventsByKeyword, 300),
        []
    );

    return (
        <form className={css.searchForm}>
            <label className={css.searchLabel}>
                <SearchSVG
                    className={css.icon}
                    aria-label="search events by keyword"
                />
                <input
                    className={css.searchInput}
                    type="text"
                    name="search"
                    placeholder={t('search-input')}
                    onChange={handleChangeSearch}
                />
            </label>
        </form>
    );
};
SearchForm.propTypes = {
    onSearch: PropTypes.func,
};
