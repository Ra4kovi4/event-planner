import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "../Header/Header";

import css from "./Layout.module.css";

export const Layout = () => {
	return (
		<>
			<Header />
			<main className={css.main}>
				<Suspense fallback={null}>
					<Outlet />
				</Suspense>
			</main>
		</>
	);
};
