import { useEffect, useState, memo, useCallback } from "react";
import { priorities } from "../constants/data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { parseDate, calculateLimit } from "../helpers";
import { Pagination } from "../components/Pagination/Pagination";
import { NotFound } from "../components/NotFound/NotFound";
import { EventsList } from "../components/EventsList/EventsList";
import { Loader } from "../components/Loader/Loader";
import { fetchEvents, filterEvents } from "../service";
import { Container } from "../components/Container/Container";
import { NavBar } from "../components/NavBar/NavBar";

const MainPage = memo(() => {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [sortType, setSortType] = useState("nameAsc");
	const [totalPage, setTotalPage] = useState(1);
	const [page, setPage] = useState(1);
	const [maxCardsInCategory, setMaxCardsInCategory] = useState(0);
	const [filterSet, setFilterSet] = useState(false);

	const getEvents = useCallback(async () => {
		const limitPage = calculateLimit();
		try {
			if (limitPage !== undefined) {
				const { data, total } = await (filterSet
					? filterEvents(page, limitPage, selectedCategory)
					: fetchEvents(page, limitPage));

				setEvents(data);
				setMaxCardsInCategory(data.maxCardsInCategory);
				setTotalPage(Math.ceil(Number(total) / limitPage));
			}
		} catch (error) {
			toast.error("Oops, something went wrong! Please try again later", {
				position: "top-right",
				autoClose: 2000,
			});
		} finally {
			setIsLoading(false);
		}
	}, [page, selectedCategory, filterSet]);

	useEffect(() => {
		setIsLoading(true);
		getEvents();
	}, [getEvents]);

	const handleSortChange = (newSortType) => {
		setSortType(newSortType);
	};
	const handleChangePage = (e) => {
		setPage(e.selected + 1);
	};
	const sortEvents = (events) => {
		switch (sortType) {
			case "nameAsc":
				return [...events].sort((a, b) => a.title.localeCompare(b.title));
			case "nameDesc":
				return [...events].sort((a, b) => b.title.localeCompare(a.title));
			case "dateAsc":
				return [...events].sort(
					(a, b) => parseDate(a.selectDate) - parseDate(b.selectDate)
				);
			case "dateDesc":
				return [...events].sort(
					(a, b) => parseDate(b.selectDate) - parseDate(a.selectDate)
				);
			case "priorityAsc":
				return [...events].sort((a, b) => {
					if (a.priority === b.priority) {
						return parseDate(a.selectDate) - parseDate(b.selectDate);
					}
					return (
						priorities.indexOf(a.priority) - priorities.indexOf(b.priority)
					);
				});
			case "priorityDesc":
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
		selectedCategory === "All" || !selectedCategory
			? events
			: events.filter((event) => event.category === selectedCategory);

	const handleCategorySelect = (selectedCategory) => {
		if (selectedCategory === "All" || !selectedCategory) {
			setFilterSet(false);
		} else {
			setFilterSet(true);
		}

		setSelectedCategory(selectedCategory);
		const filteredEvents = visibilityEvents();
		const pageLimit = calculateLimit();
		const maxCards = Math.min(filteredEvents.length, maxCardsInCategory);

		setTotalPage(Math.ceil(Number(maxCards) / pageLimit));
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
});

MainPage.displayName = "MainPage";
export default MainPage;
