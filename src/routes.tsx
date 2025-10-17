import { createBrowserRouter } from "react-router-dom";
import RouteBoundary from "./RouteBoundary";
import GridPage from "./pages/GridPage";
import PhotoPage from "./pages/PhotoPage";

export const router = createBrowserRouter([
	{
		path: "/MasonryGrid",
		element: <RouteBoundary />,
		children: [
			{ index: true, element: <GridPage /> },
			{ path: "photo/:id", element: <PhotoPage /> },
		],
	},
]);