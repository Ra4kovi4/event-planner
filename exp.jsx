const clickHandler = () => {
	deleteEventById();

	if (events.length === 1 && totalPage > 1 && page > 1) {
		if (events.length === 1) {
			const newPage = page - 1;
			const queryParams = queryString.parse(search);
			queryParams.page = newPage.toString();

			const newSearch = queryString.stringify(queryParams);

			navigate(`/events?${newSearch}`);
			updatePage(newPage);
		} else {
			navigate(`/?page=${page}`);
		}
	}
	// if (events.length === 1 && totalPage > 1 && page > 1) {
	// 	const newPage = page - 1;
	// 	const searchParams = new URLSearchParams(search);
	// 	searchParams.set("page", newPage.toString());
	// 	const newSearch = queryString.stringify(queryParams);
	// 	navigate(`/?${searchParams.toString()}`);
	// 	updatePage(newPage);

	// navigate(`/?page=${page}`);
};
