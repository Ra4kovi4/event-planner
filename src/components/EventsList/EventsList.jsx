import PropTypes from "prop-types";
import { EventsCard } from "../EventCard";
import css from "./EventsList.module.css";
export const EventsList = ({ events }) => {
	return (
		<div>
			<ul className={css.eventsList}>
				{events.map((event) => {
					return <EventsCard event={event} key={event._id} />;
				})}
			</ul>
		</div>
	);
};

EventsList.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			selectTime: PropTypes.string.isRequired,
			selectDate: PropTypes.string.isRequired,
			location: PropTypes.string.isRequired,
			category: PropTypes.string.isRequired,
			picture: PropTypes.string.isRequired,
			priority: PropTypes.string.isRequired,
		})
	).isRequired,
};
