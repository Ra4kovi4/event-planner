import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DatePicker } from '../Calendar/Calendar';
import { addEventSchema } from '../../constants/addEventSchema';
import {
    convertDateFormat,
    createFormData,
    useEventContext,
} from '../../helpers';
import { TimePickerComponent } from '../TimePicker/TimePicker';
import { addEvent, updateEvent } from '../../service';
import css from './FormEvent.module.css';
import { ReactComponent as CloseIcon } from '../../assets/cross.svg';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import { priorities, categories } from '../../constants/data';

import { EventContext } from '../EventProvider/EventProvider';
import { RotatingLines } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';

export const FormEvent = ({ event = null }) => {
    const [isCategoryActive, setIsCategoryActive] = useState(false);
    const [isPriorityActive, setIsPriorityActive] = useState(false);
    const [picture, setPicture] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const { t } = useTranslation();
    const inputRefCategoty = useRef();
    const inputRefPriority = useRef();

    const navigate = useNavigate();
    const { isLoading, getEvents, setIsLoading } =
        useEventContext(EventContext);

    const handleFileChange = (e, setFieldValue) => {
        const file = e.currentTarget.files[0];
        setPicture(file);
        setFieldValue('picture', file);
    };

    const toggleDataPicker = () => {
        const form = document.getElementById('form');
        const dateInput = form.querySelector('#selectDate');
        if (showDatePicker) {
            dateInput.blur();
        } else {
            dateInput.focus();
        }

        setShowDatePicker(prevState => !prevState);
    };

    const handleDateChange = date => {
        setStartDate(date);
    };

    const handleSaveDate = setFieldValue => {
        const selectedDate = convertDateFormat(startDate);
        setFieldValue('selectDate', selectedDate);
        setShowDatePicker(false);
    };

    const handleCloseCalendar = () => {
        setShowDatePicker(false);
    };

    const handleSaveTime = (setFieldValue, selectedTime) => {
        setFieldValue('selectTime', selectedTime);
    };
    const handlePriorityClick = () => {
        setIsPriorityActive(!isPriorityActive);

        if (isCategoryActive) {
            setIsCategoryActive(false);
        }
    };
    const handleCategoryClick = () => {
        setIsCategoryActive(!isCategoryActive);
        if (isPriorityActive) {
            setIsPriorityActive(false);
        }
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        setIsLoading(true);
        const data = createFormData(values);
        if (!event) {
            try {
                await addEvent(data);
                resetForm();

                navigate('/');
                toast.success('Event successfully created');
            } catch (error) {
                toast.error('Something went wrong');
            } finally {
                setIsLoading(false);
            }
        } else {
            try {
                await updateEvent(event._id, data);
                toast.success('Event successfully updated');
                navigate(`/${event._id}`);
            } catch (error) {
                toast.error('Something went wrong');
            } finally {
                setIsLoading(false);
            }
        }
        getEvents();
    };

    return (
        <Formik
            initialValues={{
                title: event?.title || '',
                description: event?.description || '',
                selectDate: event?.selectDate || '',
                selectTime: event?.selectTime || '',
                location: event?.location || '',
                category: event?.category || null,
                picture: event?.picture || '',
                priority: event?.priority || null,
            }}
            onSubmit={handleFormSubmit}
            validationSchema={addEventSchema}
        >
            {formik => {
                const { values, setFieldValue } = formik;
                return (
                    <Form
                        className={css.addForm}
                        id="form"
                        autoComplete="false"
                    >
                        <div className={css.container}>
                            <div className={css.enabled}>
                                <label htmlFor="title" className={css.label}>
                                    <span className={css.inputTitle}>
                                        {t('create-event-title')}
                                    </span>
                                    <CloseIcon
                                        className={css.closeIcon}
                                        onClick={() =>
                                            setFieldValue('title', '')
                                        }
                                        aria-label="remove title"
                                    />

                                    <Field
                                        name="title"
                                        type="text"
                                        id="title"
                                        placeholder="John Doe"
                                        className={css.input}
                                        values={values.title || ''}
                                        onChange={e =>
                                            setFieldValue(
                                                'title',
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                            </div>
                            <ErrorMessage
                                name="title"
                                component="p"
                                className={css.error}
                            />
                            <div className={css.enabled}>
                                <label
                                    htmlFor="description"
                                    className={css.label}
                                >
                                    <span className={css.inputTitle}>
                                        {t('create-event-description')}
                                    </span>
                                    <CloseIcon
                                        className={css.closeIconTextArea}
                                        onClick={() =>
                                            setFieldValue('description', '')
                                        }
                                        aria-label="remove description"
                                    />
                                    <Field
                                        name="description"
                                        as="textarea"
                                        type="text"
                                        id="description"
                                        values={values.description || ''}
                                        placeholder="about..."
                                        className={css.textArea}
                                        onChange={e =>
                                            setFieldValue(
                                                'description',
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                            </div>
                            <ErrorMessage
                                name="description"
                                component="p"
                                className={css.error}
                            />
                            <div className={css.enabledTime}>
                                <label className={css.timeLabel}>
                                    <span className={css.inputTitleTime}>
                                        {t('create-event-time')}
                                    </span>
                                    <ArrowIcon
                                        className={css.timeSelectBtn}
                                        aria-label="select time"
                                    />

                                    <TimePickerComponent
                                        handleSaveTime={handleSaveTime}
                                        setFieldValue={setFieldValue}
                                    />
                                    <Field
                                        value={values.selectTime}
                                        id="selectTime"
                                        name="selectTime"
                                        className={css.timeInput}
                                        placeholder="select time"
                                    />
                                </label>
                            </div>
                            <ErrorMessage
                                name="selectTime"
                                component="p"
                                className={css.errorMsg}
                            />
                            <div
                                className={css.enabled}
                                style={{ position: 'relative' }}
                            >
                                <label
                                    className={css.label}
                                    htmlFor="selectDate"
                                >
                                    <span className={css.inputTitle}>
                                        {t('create-event-date')}
                                    </span>

                                    <Field
                                        className={css.input}
                                        type="text"
                                        id="selectDate"
                                        name="selectDate"
                                        value={values.selectDate}
                                        placeholder="Select date"
                                        onChange={() =>
                                            setFieldValue(
                                                'selectDate',
                                                values.selectDate
                                            )
                                        }
                                        onClick={() => setShowDatePicker(true)}
                                        style={{ caretColor: 'transparent' }}
                                    />

                                    <div
                                        className={css.inputBtn}
                                        onClick={toggleDataPicker}
                                    >
                                        <ArrowIcon
                                            aria-label="select date"
                                            className={css.arrowIcon}
                                        />
                                    </div>
                                </label>

                                {showDatePicker && (
                                    <div className={css.calendar}>
                                        <DatePicker
                                            startDate={startDate}
                                            onSelect={handleDateChange}
                                            onClose={handleCloseCalendar}
                                            onSave={handleSaveDate}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                )}
                            </div>
                            <ErrorMessage
                                name="selectDate"
                                component="p"
                                className={css.error}
                            />
                            <div className={css.enabled}>
                                <label htmlFor="location" className={css.label}>
                                    <span className={css.inputTitle}>
                                        {t('create-event-location')}
                                    </span>
                                    <CloseIcon
                                        className={css.closeIcon}
                                        onClick={() =>
                                            setFieldValue('location', '')
                                        }
                                        aria-label="remove location"
                                    />

                                    <Field
                                        name="location"
                                        id="location"
                                        type="text"
                                        placeholder="Enter location"
                                        className={css.input}
                                        onChange={e =>
                                            setFieldValue(
                                                'location',
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                            </div>
                            <ErrorMessage
                                name="location"
                                component="p"
                                className={css.error}
                            />
                            <div className={css.categoryWrapper}>
                                <span className={css.categoryTitle}>
                                    {t('create-event-category')}
                                </span>
                                <Field
                                    className={css.input}
                                    type="text"
                                    name="category"
                                    id="category"
                                    readOnly="readonly"
                                    placeholder="Category"
                                    value={values.category || ''}
                                />

                                <div
                                    className={css.styledSelect}
                                    ref={inputRefCategoty}
                                    onClick={handleCategoryClick}
                                >
                                    <span className={css.selectPart}>
                                        <ArrowIcon
                                            aria-label="select category"
                                            className={css.arrowIcon}
                                        />
                                    </span>
                                </div>
                                {isCategoryActive && (
                                    <ul className={css.selectContainer}>
                                        {categories.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className={css.selectItem}
                                                style={{
                                                    color:
                                                        t(values.category) ===
                                                            item &&
                                                        'var(--accent-color)',
                                                }}
                                                value={t(values.category)}
                                                onClick={() => {
                                                    setFieldValue(
                                                        'category',
                                                        t(item)
                                                    );
                                                    setIsCategoryActive(false);
                                                }}
                                            >
                                                {t(item)}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <ErrorMessage
                                name="category"
                                component="p"
                                className={css.errorMsg}
                            />

                            <div className={css.enabled}>
                                <label
                                    htmlFor="picture"
                                    className={css.pictureLabel}
                                >
                                    <span className={css.inputTitle}>
                                        {t('add-picture')}
                                    </span>
                                    <CloseIcon
                                        aria-label="remove picture"
                                        className={css.closeIcon}
                                        onClick={() =>
                                            setFieldValue('picture', '')
                                        }
                                    />

                                    <div className={css.fakeInput}>
                                        <span className={css.fakeInputPart}>
                                            {!picture
                                                ? 'Add picture'
                                                : `${picture.name.slice(
                                                      0,
                                                      15
                                                  )}...`}
                                        </span>
                                        <input
                                            type="file"
                                            id="picture"
                                            name="picture"
                                            className={css.inputPhoto}
                                            onChange={e =>
                                                handleFileChange(
                                                    e,
                                                    setFieldValue
                                                )
                                            }
                                            aria-label="Upload a picture"
                                        />
                                    </div>
                                </label>
                            </div>
                            <ErrorMessage
                                name="picture"
                                component="p"
                                className={css.error}
                            />
                            <div
                                className={`${css.priorityWrapper} ${css.enabled}`}
                            >
                                <span className={css.priorityTitle}>
                                    {t('create-event-priority')}
                                </span>
                                <Field
                                    className={css.input}
                                    type="text"
                                    readOnly="readonly"
                                    placeholder="priority"
                                    value={t(values.priority) || ''}
                                />

                                <div
                                    className={css.styledSelect}
                                    ref={inputRefPriority}
                                    onClick={handlePriorityClick}
                                >
                                    <span className={css.selectPart}>
                                        <ArrowIcon
                                            className={css.arrowIcon}
                                            aria-label="select priority"
                                        />
                                    </span>
                                </div>
                                {isPriorityActive && (
                                    <ul className={css.selectContainer}>
                                        {priorities.map((pr, idx) => (
                                            <li
                                                key={idx}
                                                className={css.selectItem}
                                                style={{
                                                    color:
                                                        values.priority ===
                                                            t(pr) &&
                                                        'var(--accent-color)',
                                                }}
                                                onClick={() => {
                                                    setFieldValue(
                                                        'priority',
                                                        t(pr)
                                                    );
                                                    setIsPriorityActive(false);
                                                }}
                                            >
                                                {t(pr)}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <ErrorMessage
                                name="priority"
                                component="p"
                                className={css.errorMsg}
                            />
                        </div>

                        <button type="submit" className={css.submitBtn}>
                            {event
                                ? t('edit-event-btn')
                                : t('create-event-btn')}
                            {isLoading && (
                                <span className={css.btnLoader}>
                                    <RotatingLines
                                        strokeColor="#fff"
                                        animationDuration="0.75"
                                        width="35"
                                        visible={true}
                                    />
                                </span>
                            )}
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

FormEvent.propTypes = {
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
    }),
    isEdit: PropTypes.bool,
};
