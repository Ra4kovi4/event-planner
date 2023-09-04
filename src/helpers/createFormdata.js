export const createFormData = (values) => {
	const formData = new FormData();
	formData.append("title", values.title);
	formData.append("description", values.description);
	formData.append("selectTime", values.selectTime);
	formData.append("selectDate", values.selectDate);
	formData.append("location", values.location);
	formData.append("category", values.category);
	formData.append("picture", values.picture);
	formData.append("priority", values.priority);

	return formData;
};
