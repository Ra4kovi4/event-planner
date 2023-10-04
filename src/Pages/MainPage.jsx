import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { animateScroll as scroll } from 'react-scroll';
import { useEventContext } from '../helpers';
import { Pagination } from '../components/Pagination/Pagination';
import { NotFound } from '../components/NotFound/NotFound';
import { EventsList } from '../components/EventsList/EventsList';
import { Loader } from '../components/Loader/Loader';
import { EventContext } from '../components/EventProvider/EventProvider';
import { Container } from '../components/Container/Container';
import { NavBar } from '../components/NavBar/NavBar';

const MainPage = () => {
    const { pathname, search } = useLocation();

    const [searchParams] = useSearchParams(search);

    const { events, isLoading, page, totalPage, updatePage } =
        useEventContext(EventContext);

    const navigate = useNavigate();

    //When loading a page, a page is added to the search bar to match the pagination.
    useEffect(() => {
        const initialPage = queryString.parse(search).page
            ? Number(queryString.parse(search).page)
            : 1;

        if (!search.includes('page')) {
            searchParams.set('page', '1');
        } else {
            searchParams.set('page', initialPage.toString());

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

    return (
        <>
            <Container>
                <NavBar />
                {events.length === 0 && !isLoading && <NotFound />}
                {!isLoading && events.length !== 0 && <EventsList />}
                {isLoading && <Loader />}
                {totalPage > 1 && !isLoading && events.length !== 0 && (
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
