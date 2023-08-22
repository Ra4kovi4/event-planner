import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { DatePicker } from "../Calendar/Calendar";
import { addEventSchema } from "../../constants/addEventSchema";
import { convertDateFormat } from "../../helpers";
import { TimePickerComponent } from "../TimePicker/TimePicker";
import { addEvent, updateEvent } from "../../service";
import css from "./FormEvent.module.css";
import closeIcon from "../../assets/cross.svg";
import { toast } from "react-toastify";
import arrowIcon from "../../assets/arrow.svg";
import crossGryeIcon from "../../assets/crossgrey.svg";
import { priorities, categories } from "../../constants/data";

export const FormEvent = ({ event = null }) => {
	const [isCategoryActive, setIsCategoryActive] = useState(false);
	const [isPriorityActive, setIsPriorityActive] = useState(false);
	const [picture, setPicture] = useState(null);
	const [startDate, setStartDate] = useState(new Date());

	const [showDatePicker, setShowDatePicker] = useState(false);

	const inputRefCategoty = useRef();
	const inputRefPriority = useRef();

	const navigate = useNavigate();

	const handleFileChange = (e, setFieldValue) => {
		const file = e.currentTarget.files[0];
		setPicture(file);
		setFieldValue("picture", file);
	};

	const toggleDataPicker = () => {
		const form = document.getElementById("form");
		const dateInput = form.querySelector("#selectDate");

		if (showDatePicker) {
			dateInput.blur();
		} else {
			dateInput.focus();
		}

		setShowDatePicker((prevState) => !prevState);
	};

	const handleDateChange = (date) => {
		setStartDate(date);
	};

	const handleSaveDate = (setFieldValue) => {
		const selectedDate = convertDateFormat(startDate);
		setFieldValue("selectDate", selectedDate);
		setShowDatePicker(false);
	};

	const handleCloseCalendar = () => {
		setShowDatePicker(false);
	};

	const handleSaveTime = (setFieldValue, selectedTime) => {
		setFieldValue("selectTime", selectedTime);
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
		if (!event) {
			try {
				await addEvent(values);
				resetForm();

				navigate("/");
				toast.success("Event successfully created");
			} catch (error) {
				toast.error("Something went wrong");
			}
		} else {
			try {
				await updateEvent(event._id, values);
				toast.success("Event successfully updated");
				navigate(`/events/${event._id}`);
			} catch (error) {
				toast.error("Something went wrong");
			}
		}
	};

	return (
		<Formik
			initialValues={{
				title: event?.title || "",
				description: event?.description || "",
				selectDate: event?.selectDate || "",
				selectTime: event?.selectTime || "",
				location: event?.location || "",
				category: event?.category || null,
				picture: event?.picture || "",
				priority: event?.priority || null,
			}}
			onSubmit={handleFormSubmit}
			validationSchema={addEventSchema}>
			{(formik) => {
				const { values, setFieldValue } = formik;
				return (
					<Form className={css.addForm} id='form' autoComplete='false'>
						<div className={css.container}>
							<div className={css.enabled}>
								<label htmlFor='title' className={css.label}>
									<span className={css.inputTitle}>Title</span>
									<img
										src={closeIcon}
										alt='Close'
										className={css.closeIcon}
										onClick={() => setFieldValue("title", "")}
									/>
									<Field
										name='title'
										type='text'
										id='title'
										placeholder='John Doe'
										className={css.input}
										values={values.title || ""}
										onChange={(e) => setFieldValue("title", e.target.value)}
									/>
								</label>
							</div>
							<ErrorMessage name='title' component='p' className={css.error} />
							<div className={css.enabled}>
								<label htmlFor='description' className={css.label}>
									<span className={css.inputTitle}>Description</span>
									<img
										src={closeIcon}
										alt='Close'
										className={css.closeIconTextArea}
										onClick={() => setFieldValue("description", "")}
									/>
									<Field
										name='description'
										as='textarea'
										type='text'
										id='description'
										values={values.description || ""}
										placeholder='about...'
										className={css.textArea}
										onChange={(e) =>
											setFieldValue("description", e.target.value)
										}
									/>
								</label>
							</div>
							<ErrorMessage
								name='description'
								component='p'
								className={css.error}
							/>
							<div className={css.enabledTime}>
								<label className={css.timeLabel}>
									<span className={css.inputTitleTime}>Select Time</span>
									<img src={arrowIcon} className={css.timeSelectBtn} />

									<TimePickerComponent
										handleSaveTime={handleSaveTime}
										setFieldValue={setFieldValue}
									/>
									<Field
										value={values.selectTime}
										id='selectTime'
										name='selectTime'
										className={css.timeInput}
										placeholder='select time'
									/>
								</label>
							</div>
							<ErrorMessage
								name='selectTime'
								component='p'
								className={css.errorMsg}
							/>
							<div className={css.enabled} style={{ position: "relative" }}>
								<label className={css.label} htmlFor='selectDate'>
									<span className={css.inputTitle}>Select Date</span>

									<Field
										className={css.input}
										type='text'
										id='selectDate'
										name='selectDate'
										value={values.selectDate}
										placeholder='Select date'
										onChange={() =>
											setFieldValue("selectDate", values.selectDate)
										}
										onClick={() => setShowDatePicker(true)}
										style={{ caretColor: "transparent" }}
									/>

									<button
										type='button'
										className={css.inputBtn}
										style={{ width: "92%", justifyContent: "right" }}
										onClick={toggleDataPicker}>
										<img src={arrowIcon} />
									</button>
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
								name='selectDate'
								component='p'
								className={css.error}
							/>
							<div className={css.enabled}>
								<label htmlFor='location' className={css.label}>
									<span className={css.inputTitle}>Location</span>
									<img
										src={closeIcon}
										alt='Close'
										className={css.closeIcon}
										value={values.location}
										onClick={() => setFieldValue("location", "")}
									/>
									<Field
										name='location'
										id='location'
										type='text'
										placeholder='Enter location'
										className={css.input}
										onChange={(e) => setFieldValue("location", e.target.value)}
									/>
								</label>
							</div>
							<ErrorMessage
								name='location'
								component='p'
								className={css.error}
							/>
							<div className={css.categoryWrapper}>
								<span className={css.categoryTitle}>Category</span>
								<Field
									className={css.input}
									type='text'
									name='category'
									id='category'
									readOnly='readonly'
									placeholder='Category'
									value={values.category || ""}
								/>

								<div
									className={css.styledSelect}
									ref={inputRefCategoty}
									onClick={handleCategoryClick}>
									<img src={arrowIcon} alt='arrow' className={css.arrowIcon} />
								</div>
								{isCategoryActive && (
									<ul className={css.selectContainer}>
										{categories.map((item, idx) => (
											<li
												key={idx}
												className={css.selectItem}
												style={{
													backgroundColor:
														values.category === item
															? "var(--accent-color)"
															: "white",
													color: values.category === item ? "white" : "black",
												}}
												value={values.category}
												onClick={() => {
													setFieldValue("category", item);
													setIsCategoryActive(false);
												}}>
												{item}
											</li>
										))}
									</ul>
								)}
							</div>
							<ErrorMessage
								name='category'
								component='p'
								className={css.errorMsg}
							/>

							<div className={css.enabled}>
								<label htmlFor='picture' className={css.pictureLabel}>
									<span className={css.inputTitlePicture}>Add picture</span>
									<img
										src={crossGryeIcon}
										alt='Close'
										className={css.closeIcon}
										onClick={() => setFieldValue("picture", "")}
									/>
									<div className={css.fakeInput}>
										{!picture ? "Add picture" : picture.name}
										<input
											type='file'
											id='picture'
											name='picture'
											className={css.inputPhoto}
											onChange={handleFileChange}
										/>
									</div>
								</label>
							</div>
							<ErrorMessage
								name='picture'
								component='p'
								className={css.error}
							/>
							<div className={`${css.priorityWrapper} ${css.enabled}`}>
								<span className={css.priorityTitle}>Priority</span>
								<Field
									className={css.input}
									type='text'
									readOnly='readonly'
									placeholder='priority'
									value={values.priority || ""}
								/>

								<div
									className={css.styledSelect}
									ref={inputRefPriority}
									onClick={handlePriorityClick}>
									<img src={arrowIcon} alt='arrow' className={css.arrowIcon} />
								</div>
								{isPriorityActive && (
									<ul className={css.selectContainer}>
										{priorities.map((pr, idx) => (
											<li
												key={idx}
												className={css.selectItem}
												style={{
													backgroundColor:
														values.priority === pr
															? "var(--accent-color)"
															: "white",
													color: values.priority === pr ? "white" : "black",
												}}
												onClick={() => {
													setFieldValue("priority", pr);
													setIsPriorityActive(false);
												}}>
												{pr}
											</li>
										))}
									</ul>
								)}
							</div>
							<ErrorMessage
								name='priority'
								component='p'
								className={css.errorMsg}
							/>
						</div>

						<button type='submit' className={css.submitBtn}>
							{event ? "Save" : "Add event"}
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
