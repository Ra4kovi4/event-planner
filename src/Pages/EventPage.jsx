import { useNavigate } from "react-router-dom";

import { EventDetails } from "../components/EventDetails/EventDetails";
import { BackButton } from "../components/BackButton/BackButton";
import { Container } from "../components/Container/Container";
import { useEventContext } from "../components/EventContext/EventContex";
import { EventContext } from "../components/EventContext/EventProvider";
const EventPage = () => {
	const navigate = useNavigate();
	const { page } = useEventContext(EventContext);
	const backHandler = () => {
		navigate(`/?page=${page}`);
	};

	return (
		<>
			<Container>
				<BackButton onBack={backHandler} />
				<EventDetails />
			</Container>
		</>
	);
};

EventPage.displayName = "EventPage";
export default EventPage;
