import Navbar from "./components/Navbar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Map from './containers/Map.jsx'
import Home from "./containers/Home.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/map' element={<Map/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App