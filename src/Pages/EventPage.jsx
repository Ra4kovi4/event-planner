import { EventDetails } from "../components/EventDetails/EventDetails";

import { BackButton } from "../components/BackButton/BackButton";
import { Container } from "../components/Container/Container";
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
