import Dashboard from "./screens/dashboard";
import {AuthProvider} from "./context/authContext";
import {DishesProvider} from "./context/dishesContext";

function App() {
    return (
        <AuthProvider>
            <DishesProvider>
                <Dashboard/>
            </DishesProvider>
        </AuthProvider>
    );
}

export default App;
