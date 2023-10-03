import { EventsCard } from '../EventCard/EventCard';
import { EventContext } from '../EventProvider/EventProvider';
import { useEventContext, sortEvents } from '../../helpers';
import css from './EventsList.module.css';
export const EventsList = () => {
    const { events, sortType } = useEventContext(EventContext);

    const filteredAndSortedEvents = sortEvents(events, sortType);

    return (
        <div>
            <ul className={css.eventsList}>
                {filteredAndSortedEvents.map(event => {
                    return <EventsCard event={event} key={event._id} />;
                })}
            </ul>
        </div>
    );
};
