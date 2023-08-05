export const formatterDate = (date) => {
	const newDate = new Date(date);
	const day = newDate.getDate();
	const month = newDate.getMonth() + 1;
	const formattedDay = day < 10 ? `0${day}` : day;
	const formattedMonth = month < 10 ? `0${month}` : month;
	const formattedDate = `${formattedDay}.${formattedMonth}`;
	return formattedDate;
};
