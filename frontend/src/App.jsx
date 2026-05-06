import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import TaskPage from "./pages/TaskPage";

function App() {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <AuthPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/tasks"
                    element={
                        <PrivateRoute>
                            <TaskPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to={token ? "/tasks" : "/login"} replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;