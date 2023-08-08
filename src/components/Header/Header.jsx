import { SearchForm } from "../SearchForm/SearchForm";
import { Link } from "react-router-dom";
import { ChangeLanguageForm } from "../ChangeLanguageForm/ChangeLanguageForm";
import css from "./Header.module.css";

export const Header = () => {
	return (
		<>
			<header className={css.header}>
				<Link className={css.title} to='/'>
					Event planner
				</Link>
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
