import Dashboard from "./screens/dashboard";
import {DishesProvider} from "./context/dishesContext";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./context/authContext";
import Login from "./screens/login";
import Register from "./screens/register";

function App() {
    const {user} = useContext(AuthContext);

    const ProtectedRoute = ({children}) => {
        if (!user) {
            return <Navigate to="/login"/>;
        }

        return children;
    };

    return (
        <DishesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </DishesProvider>
    );
}

export default App;
