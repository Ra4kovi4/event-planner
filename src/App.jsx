import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "./App.css";

const MainPage = lazy(() => import("./Pages/MainPage"));
const EventPage = lazy(() => import("./Pages/EventPage"));
const NewEventPage = lazy(() => import("./Pages/NewEvent"));
const EditEventPage = lazy(() => import("./Pages/EditEventPage"));

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path='events/:id' element={<EventPage />} />
					<Route path='events/add' element={<NewEventPage />} />
					<Route path='events/:id/edit' element={<EditEventPage />} />
					<Route path='*' element={<MainPage />} />
				</Route>
			</Routes>
			<ToastContainer autoClose={1000} />
		</>
	);
};

export default App;
