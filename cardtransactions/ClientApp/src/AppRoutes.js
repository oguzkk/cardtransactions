import { Counter } from "./components/Counter";
import { SaleInquiry } from "./components/SaleInquiry";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/saleinquiry',
    element: <SaleInquiry />
  }
];

export default AppRoutes;
