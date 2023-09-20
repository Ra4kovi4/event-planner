import { useEffect, useState } from 'react';
import { priorities } from '../constants/data';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import queryString from 'query-string';
import { animateScroll as scroll } from 'react-scroll';
import { parseDate, calculateLimit } from '../helpers';
import { Pagination } from '../components/Pagination/Pagination';
import { NotFound } from '../components/NotFound/NotFound';
import { EventsList } from '../components/EventsList/EventsList';
import { Loader } from '../components/Loader/Loader';
import { useEventContext } from '../components/EventContext/EventContex';
import { EventContext } from '../components/EventContext/EventProvider';
import { Container } from '../components/Container/Container';
import { NavBar } from '../components/NavBar/NavBar';

const MainPage = () => {
  const [sortType, setSortType] = useState('nameAsc');
  const { pathname, search } = useLocation();
  console.log(pathname);

  const [searchParams] = useSearchParams(search);
  const {
    events,
    isLoading,
    page,
    maxCardsInCategory,
    selectedCategory,
    totalPage,
    setSelectedCategory,
    setFilterSet,
    updatePage,
    updateTotalPage,
  } = useEventContext(EventContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(queryString.parse(search));
    console.log(searchParams);
    const initialPage = queryString.parse(search).page
      ? Number(queryString.parse(search).page)
      : 1;

    if (!search.includes('page')) {
      searchParams.set('page', '1');
      console.log(searchParams.get('page'));
    } else {
      searchParams.set('page', initialPage.toString());
      console.log(searchParams.get('page'));
      updatePage(initialPage);
    }
    navigate(`${pathname}?${searchParams.toString()}`);
  }, [pathname, search, navigate]);

  const handleChangePage = e => {
    const newPage = e.selected + 1;
    searchParams.set('page', newPage.toString());
    updatePage(newPage);
    navigate(`${pathname}?${searchParams.toString()}`);
    scroll.scrollToTop();
  };

  const handleSortChange = newSortType => {
    setSortType(newSortType);
  };
  const sortEvents = events => {
    switch (sortType) {
      case 'nameAsc':
        return [...events].sort((a, b) => a.title.localeCompare(b.title));
      case 'nameDesc':
        return [...events].sort((a, b) => b.title.localeCompare(a.title));
      case 'dateAsc':
        return [...events].sort(
          (a, b) => parseDate(a.selectDate) - parseDate(b.selectDate)
        );
      case 'dateDesc':
        return [...events].sort(
          (a, b) => parseDate(b.selectDate) - parseDate(a.selectDate)
        );
      case 'priorityAsc':
        return [...events].sort((a, b) => {
          if (a.priority === b.priority) {
            return parseDate(a.selectDate) - parseDate(b.selectDate);
          }
          return (
            priorities.indexOf(a.priority) - priorities.indexOf(b.priority)
          );
        });
      case 'priorityDesc':
        return [...events].sort((a, b) => {
          if (a.priority === b.priority) {
            return parseDate(b.selectDate) - parseDate(a.selectDate);
          }
          return (
            priorities.indexOf(b.priority) - priorities.indexOf(a.priority)
          );
        });
      default:
        return events;
    }
  };

  const visibilityEvents = () =>
    selectedCategory === 'All' || !selectedCategory
      ? events
      : events.filter(event => event.category === selectedCategory);

  const handleCategorySelect = selectedCategory => {
    if (selectedCategory === 'All' || !selectedCategory) {
      setFilterSet(false);
    } else {
      setFilterSet(true);
    }

    setSelectedCategory(selectedCategory);
    const filteredEvents = visibilityEvents();
    const pageLimit = calculateLimit();
    const maxCards = Math.min(filteredEvents.length, maxCardsInCategory);

    updateTotalPage(Math.ceil(Number(maxCards) / pageLimit));
  };

  const filteredAndSortedEvents = sortEvents(events);

  return (
    <>
      <Container>
        {!isLoading && (
          <NavBar
            onSelect={handleCategorySelect}
            onSelectSort={handleSortChange}
          />
        )}
        {filteredAndSortedEvents.length === 0 && !isLoading && <NotFound />}
        {!isLoading && events.length !== 0 && (
          <EventsList events={filteredAndSortedEvents} />
        )}
        {isLoading && <Loader />}
        {!isLoading && filteredAndSortedEvents.length !== 0 && (
          <Pagination
            pageCount={totalPage}
            forcePage={page}
            onChange={handleChangePage}
          />
        )}
      </Container>
    </>
  );
};

MainPage.displayName = 'MainPage';
export default MainPage;
