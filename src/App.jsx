import { Route, Routes } from "react-router-dom";
import { routeConfig } from "./config/routes-config";
import "./global.css";
import Layout from "./MainLayout";
import { SidebarViewProvider } from "./contexts/ContextProvider";

function App() {
  return (
    <SidebarViewProvider>
      <Routes>
        <Route element={<Layout />}>
          {routeConfig.mainPages.map((route) => (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          ))}
        </Route>
        {routeConfig.authPages.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        ))}
      </Routes>
    </SidebarViewProvider>
  );
}

export default App;
