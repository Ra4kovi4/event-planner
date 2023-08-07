import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventById } from "../service";

import { toast } from "react-toastify";
import { FormEvent } from "../components/FormEvent";
import { BackButton } from "../components/BackButton";
import { Container } from "../components/Container";

const EditEventPage = () => {
	const { id: eventId } = useParams();

	const [event, setEvent] = useState(null);

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

	return (
		<>
			<Container>
				<BackButton />
				{event && <FormEvent isEdit={true} event={event} />}
			</Container>
		</>
	);
};

EditEventPage.displayName = "EditEventPage";
export default EditEventPage;
