import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById, deleteEvent } from "../../service";
import { useState, useEffect } from "react";
import { Loader } from "../Loader/Loader";

import css from "../EventDetails/EventDetails.module.css";

import { toast } from "react-toastify";

export const EventDetails = () => {
	const [event, setEvent] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		getEventById(id);
	}, [id]);

	const getEventById = async (id) => {
		setIsLoading(true);
		try {
			const event = await fetchEventById(id);
			setEvent(event);
		} catch (error) {
			toast.error("Oops, something went wrong! Please try again later", {
				position: "top-right",
				autoClose: 2000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const deleteEventById = async (id) => {
		try {
			await deleteEvent(id);
			setEvent(null);
			toast.success("The event was successfully deleted ");
		} catch (error) {
			toast.error("Something went wrong, please try again");
		}
	};
	const clickHandler = () => {
		deleteEventById(id);
		navigate("/");
	};

	return (
		<>
			{isLoading && <Loader />}
			{event && !isLoading && (
				<>
					<h1 className={css.title}>{event.title}</h1>
					<div className={css.card}>
						<div className={css.pictureBox}>
							<img
								src={event.picture}
								width='272'
								height='296'
								alt={event.title}
								className={css.picture}
							/>
						</div>

						<div className={css.info}>
							<p className={css.description}>{event.description} </p>
							<div className={css.infoBox}>
								<div className={css.categoryWrap}>
									<div className={css.category}>{event.category}</div>
									<div className={css.priority} data-priority={event.priority}>
										{event.priority}
									</div>
									<span className={css.location}>{event.location}</span>
									<span className={css.time}>
										{event.selectDate} at {event.selectTime}
									</span>
								</div>
							</div>
							<div className={css.buttonContainer}>
								<button
									className={css.editBtn}
									type='button'
									onClick={() => navigate(`/events/${event._id}/edit`)}>
									Edit
								</button>
								<button
									className={css.deleteBtn}
									type='button'
									onClick={clickHandler}>
									Delete event
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
