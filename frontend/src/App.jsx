import Navbar from "./components/Navbar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Map from './containers/Map.jsx'

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<h1>test</h1>}/>
                <Route path='/map' element={<Map/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App