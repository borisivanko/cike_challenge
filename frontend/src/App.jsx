import Navbar from "./components/Navbar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Map from './containers/Map.jsx'
import Home from "./containers/Home.jsx";
import MapPeople from "./containers/MapPeople.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/map' element={<Map/>}/>
                <Route path='/people' element={<MapPeople/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App