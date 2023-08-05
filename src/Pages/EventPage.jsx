import { EventDetails } from "../components/EventDetails";
import { BackButton } from "../components/BackButton";
import { Container } from "../components/Container";
const EventPage = () => {
	return (
		<>
			<Container>
				<BackButton />
				<EventDetails />
			</Container>
		</>
	);
};

EventPage.displayName = "EventPage";
export default EventPage;
