import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import css from './EventCard.module.css';

export const EventsCard = ({ event }) => {
    const [isInfoBoxRaised, setIsInfoBoxRaised] = useState(false);
    const { t } = useTranslation();
    const handleInfoBoxClick = () => {
        setIsInfoBoxRaised(!isInfoBoxRaised);
    };

    return (
        <li className={css.card}>
            <div className={css.pictureBox}>
                <div className={css.categoryWrap}>
                    <div className={css.category}>{event.category}</div>
                    <div
                        className={css.priority}
                        data-priority={event.priority}
                    >
                        {event.priority}
                    </div>
                </div>
                <img
                    src={event.picture}
                    alt={event.title}
                    className={css.picture}
                    loading="lazy"
                />
            </div>
            <div
                className={`${css.infoBox} ${
                    isInfoBoxRaised ? css.raised : ''
                }`}
                onClick={handleInfoBoxClick}
            >
                <div className={css.timetable}>
                    <span className={css.span}>
                        {event.selectDate} at {event.selectTime}
                    </span>

                    <span className={css.span}>{event.location}</span>
                </div>
                <div className={css.info}>
                    <h2 className={css.title}>{event.title}</h2>
                    <p className={css.description}>{event.description} </p>
                    <Link to={`/${event._id}`} className={css.infoBtn}>
                        {t('more-info')}
                    </Link>
                </div>
            </div>
        </li>
    );
};

EventsCard.propTypes = {
    event: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        selectTime: PropTypes.string.isRequired,
        selectDate: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
    }).isRequired,
};
