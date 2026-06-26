import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="items" element={<ListPage />} />
        <Route path="items/:id" element={<DetailPage />} />
        <Route path="events" element={<ListPage />} />
        <Route path="events/:id" element={<DetailPage />} />
        <Route path="items/:id/edit" element={<EditPage />} />
        <Route path="events/:id/edit" element={<EditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
