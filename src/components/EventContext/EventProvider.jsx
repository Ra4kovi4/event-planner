import PropTypes from "prop-types";
import { createContext, useState, useEffect, useCallback } from "react";
import { fetchEvents, filterEvents } from "../../service";
import { calculateLimit } from "../../helpers";
import { useMedia } from "react-use";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [filterSet, setFilterSet] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [maxCardsInCategory, setMaxCardsInCategory] = useState(0);

	const mobileScreen = useMedia("(max-width: 767px)", { defaultState: false });
	const tabletScreen = useMedia("(min-width: 768px) and (max-width: 1439px)", {
		defaultState: false,
	});
	const deskScreen = useMedia("(min-width: 1440px)", { defaultState: true });

	const getEvents = useCallback(async () => {
		setIsLoading(true);
		let limitPage = 8;

		if (deskScreen) {
			limitPage = 8;
		} else if (tabletScreen) {
			limitPage = 6;
		} else if (mobileScreen) {
			limitPage = 4;
		}
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
	}, [
		filterSet,
		page,
		selectedCategory,
		mobileScreen,
		tabletScreen,
		deskScreen,
	]);

	useEffect(() => {
		getEvents();
	}, [filterSet, getEvents, page, selectedCategory]);

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

		setPage(Math.ceil(Number(maxCards) / pageLimit));
	};
	const updateTotalPage = (newTotalPage) => {
		setTotalPage(newTotalPage);
	};

	const decrementTotalPage = () => {
		setTotalPage((prevTotalPage) => prevTotalPage - 1);
	};
	const updatePage = (newPage) => {
		setPage(newPage);
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
				getEvents,
				setSelectedCategory,
				setIsLoading,
				setFilterSet,
				setPage,
				setTotalPage,
				updateTotalPage,
				decrementTotalPage,
				updatePage,
				handleCategorySelect,
			}}>
			{children}
		</EventContext.Provider>
	);
};

EventProvider.propTypes = {
	children: PropTypes.node,
};
