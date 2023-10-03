import PropTypes from 'prop-types';
import { createContext, useState, useEffect, useCallback } from 'react';
import { fetchEvents, filterEvents } from '../../service';
import { useLimitPage } from '../../helpers';
import { useTranslation } from 'react-i18next';
export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filterSet, setFilterSet] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [maxCardsInCategory, setMaxCardsInCategory] = useState(0);
    const [sortType, setSortType] = useState('nameAsc');
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'EN');
    const { i18n } = useTranslation();
    const limitPage = useLimitPage();

    const getEvents = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, total } = filterSet
                ? await filterEvents(page, limitPage, selectedCategory)
                : await fetchEvents(page, limitPage);
            setEvents(data);
            setMaxCardsInCategory(data.maxCardsInCategory);
            setTotalPage(Math.ceil(Number(total) / limitPage));
        } catch (error) {
            throw new Error();
        } finally {
            setIsLoading(false);
        }
    }, [filterSet, page, selectedCategory, limitPage]);

    useEffect(() => {
        getEvents();
        localStorage.setItem('lang', lang);
        i18n.changeLanguage(lang);
    }, [filterSet, getEvents, page, selectedCategory]);

    const handleSortChange = newSortType => {
        setSortType(newSortType);
    };
    const updateFilterSet = newFilterType => {
        setFilterSet(newFilterType);
    };
    const updateTotalPage = newTotalPage => {
        setTotalPage(newTotalPage);
    };

    const updatePage = newPage => {
        setPage(newPage);
    };
    const updateEvents = newEvents => {
        setEvents(newEvents);
    };
    const changeLang = newLang => {
        setLang(newLang);
        localStorage.setItem('lang', newLang);
    };
    return (
        <EventContext.Provider
            value={{
                events,
                isLoading,
                selectedCategory,
                filterSet,
                page,
                totalPage,
                maxCardsInCategory,
                lang,
                sortType,
                getEvents,
                setSelectedCategory,
                setIsLoading,
                setFilterSet,
                setPage,
                setTotalPage,
                updateTotalPage,
                updateFilterSet,
                handleSortChange,
                updatePage,
                updateEvents,
                changeLang,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};

EventProvider.propTypes = {
    children: PropTypes.node,
};
