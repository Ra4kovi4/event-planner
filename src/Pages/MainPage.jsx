import { useEffect, useState, memo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EventsList } from "../components/EventsList/EventsList";
import { Loader } from "../components/Loader/Loader";
import { fetchEvents } from "../service";
import { Container } from "../components/Container/Container";
import { NavBar } from "../components/NavBar/NavBar";

const MainPage = memo(() => {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");

	useEffect(() => {
		setIsLoading(true);

		getEvents();
	}, []);
	const getEvents = async () => {
		try {
			const { data } = await fetchEvents();
			setEvents(data);
		} catch (error) {
			toast.error("Oops, something went wrong! Please try again later", {
				position: "top-right",
				autoClose: 2000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleCategorySelect = (selectedCategory) => {
		setSelectedCategory(selectedCategory);
	};

	const filteredEvents =
		selectedCategory === "All" || !selectedCategory
			? events
			: events.filter((event) => event.category === selectedCategory);

	return (
		<>
			<Container>
				<NavBar onSelect={handleCategorySelect} />
				{filteredEvents.length === 0 && (
					<h3 style={{ fontFamily: "Poppins", fontSize: "36px", color: "red" }}>
						Unfortunately we have not found any events matching your request
					</h3>
				)}
				{!isLoading && filteredEvents.length !== 0 && (
					<EventsList events={filteredEvents} />
				)}
				{isLoading && <Loader />}
			</Container>
		</>
	);
});

MainPage.displayName = "MainPage";
export default MainPage;
