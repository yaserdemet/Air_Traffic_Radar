import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import ErrorPage from "../pages/ErrorPage";
import {
  Page,
  DashboardPage,
  LiveTrafficPage,
  EmergencyPage,
  StatisticsPage,
  FlightMapPage,
  Form91Page,
} from "./elements";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout pageTitle="Radar Merkezi">
        <Outlet />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "live-traffic",
        element: <LiveTrafficPage />,
      },
      {
        path: "emergency",
        element: <EmergencyPage />,
      },
      {
        path: "statistics",
        element: <StatisticsPage />,
      },
      {
        path: "flight-map",
        element: <FlightMapPage />,
      },
      {
        path: "form-91",
        element: <Form91Page />,
      },
    ],
  },
]);
