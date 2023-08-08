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
	return (
		<>
			<Container>
				<NavBar />
				{!isLoading && <EventsList events={events} />}
				{isLoading && <Loader />}
			</Container>
		</>
	);
});

MainPage.displayName = "MainPage";
export default MainPage;
