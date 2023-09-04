export const calculateLimit = () => {
	let limit;
	const screen = window.innerWidth;

	if (screen <= 767) {
		limit = 4;
	} else if (screen <= 1279) {
		limit = 6;
	} else if (screen <= 1440) {
		limit = 8;
	} else {
		limit = 8;
	}
	return limit;
};
