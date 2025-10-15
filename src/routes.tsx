import { createBrowserRouter } from "react-router-dom";
import GridPage from "./pages/GridPage";
import PhotoPage from "./pages/PhotoPage";

export const router = createBrowserRouter([{
    path: "/",
    element: <GridPage />
},
{
    path: "/photo/:id",
    element: <PhotoPage />
}]);