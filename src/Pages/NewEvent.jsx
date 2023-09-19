import { useNavigate } from "react-router-dom";
import { FormEvent } from "../components/FormEvent/FormEvent";
import { Container } from "../components/Container/Container";
import { Title } from "../components/Title/Title";
import { BackButton } from "../components/BackButton/BackButton";

const NewEventPage = () => {
	const navigate = useNavigate();

	const backHandler = () => {
		navigate("/");
	};
	return (
		<>
			<Container>
				<BackButton onBack={backHandler} />
				<Title style={{ display: "block" }}>Create new event</Title>
				<FormEvent />
			</Container>
		</>
	);
};

NewEventPage.displayName = "NewEventPage";
export default NewEventPage;
