import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEventById } from "../service";
import { Title } from "../components/Title/Title";
import { toast } from "react-toastify";
import { FormEvent } from "../components/FormEvent/FormEvent";
import { BackButton } from "../components/BackButton/BackButton";
import { Container } from "../components/Container/Container";

const EditEventPage = () => {
	const [event, setEvent] = useState(null);
	const { id: eventId } = useParams();

	const navigate = useNavigate();
	const getEventById = async (id) => {
		try {
			const fetchedEvent = await fetchEventById(id);
			setEvent(fetchedEvent);
		} catch (error) {
			toast.error("Oops, something went wrong! Please try again later", {
				position: "top-right",
				autoClose: 2000,
			});
		}
	};

	useEffect(() => {
		getEventById(eventId);
	}, [eventId]);

	const backHandler = () => {
		navigate(-1);
	};

	return (
		<>
			<Container>
				<BackButton onBack={backHandler} />
				<Title>Edit event</Title>
				{event && <FormEvent isEdit={true} event={event} />}
			</Container>
		</>
	);
};

EditEventPage.displayName = "EditEventPage";
export default EditEventPage;
