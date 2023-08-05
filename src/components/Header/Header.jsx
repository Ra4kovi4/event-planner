import { SearchForm } from "../SearchForm";
import { ChangeLanguageForm } from "../ChangeLanguageForm";
import css from "./Header.module.css";

export const Header = () => {
	return (
		<>
			<header className={css.header}>
				<h1 className={css.title}>Event planner</h1>
				<div className={css.search}>
					<SearchForm />
				</div>
				<div className={css.lang}>
					<ChangeLanguageForm />
				</div>
			</header>
		</>
	);
};
