import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import "./App.css";

const MainPage = lazy(() => import("./Pages/MainPage"));
const EventPage = lazy(() => import("./Pages/EventPage"));

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path='events/:id' element={<EventPage />} />
					<Route path='*' element={<MainPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
