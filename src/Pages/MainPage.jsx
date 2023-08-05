import { useEffect, useState, memo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EventsList } from "../components/EventsList";
import { Loader } from "../components/Loader";
import { fetchEvents } from "../service";
import { Container } from "../components/Container";

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
				{isLoading && <Loader />}
				{!isLoading && <EventsList events={events} />}
			</Container>

			<ToastContainer autoClose={2000} />
		</>
	);
});

MainPage.displayName = "MainPage";
export default MainPage;
