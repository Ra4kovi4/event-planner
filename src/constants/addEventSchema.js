import * as Yup from "yup";

export const addEventSchema = Yup.object().shape({
	title: Yup.string().required("Please enter the name of the event"),
	description: Yup.string().required(),
	category: Yup.string().required("Please select a event category"),
	location: Yup.string().required("Please select a event location"),
	selectTime: Yup.string().required("Please select the event time"),
	selectDate: Yup.string().required("Please select date"),
	priority: Yup.string().required("Please select a priority"),
});
