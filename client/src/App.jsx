import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./infrastructure/navigation/navigation";
import { Home } from "./pages/home/home.pages";
import { AddPromise } from "./pages/add-promises/add-promises.pages";
import { ViewPromises } from "./pages/view-promises/view-promises.pages";
import { UpdatePromise } from "./pages/update-promises/update-promises.pages";
import { StatsPage } from "./pages/stats/stats.pages";
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="add" element={<AddPromise />} replace={true} />
          <Route path="promises" element={<ViewPromises />} replace={true} />
          <Route path="update/:id" element={<UpdatePromise />} replace={true} />
          <Route path="stats" element={<StatsPage />} replace={true} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
