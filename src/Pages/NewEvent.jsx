import { FormEvent } from "../components/FormEvent";
import { Container } from "../components/Container";
import { Title } from "../components/Title";
import { BackButton } from "../components/BackButton";

const NewEventPage = () => {
	return (
		<>
			<Container>
				<BackButton />
				<Title style={{ display: "block" }}>Create new event</Title>
				<FormEvent />
			</Container>
		</>
	);
};

NewEventPage.displayName = "NewEventPage";
export default NewEventPage;
