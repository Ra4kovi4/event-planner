import css from "./NotFound.module.css";

export const NotFound = () => {
	return (
		<div className={css.infoContainer}>
			<div className={css.infoWrap}>
				<p className={css.infoContent}>
					We have not found any events matching your request
				</p>
			</div>
		</div>
	);
};
