import Flat from "./pages/Flat";
import Main from "./pages/Main";
import { FLAT_ROUTE, MAIN_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path:MAIN_ROUTE,
        Component: Main
    },
    {
        path:FLAT_ROUTE +'/:id',
        Component: Flat
    },
]