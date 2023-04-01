import api from '../api'
import {useEffect, useState} from "react";
import OlMap from "../components/OlMap.jsx";

function Map () {
    const [data, setData] = useState({type: "FeatureCollection",
    features: []});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('pharmacy');

    useEffect(() => {
        api.get(`/list-pois?category=${selectedCategory}`)
            .then(response => {
                setData(
                    {
                        type: "FeatureCollection",
                        features: response.data
                    }
                )
            })
            .catch(error => {
                console.error(error);
            });
    }, [selectedCategory]);

    useEffect(() => {


        api.get('/all-categories')
            .then(response => {
                console.log(response.data)
                setCategories(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className="form-group">
                <div className="w-full bg-gray-800 flex flex-wrap py-4 px-4" >
                    {categories.map((category, index) => {
                        return   <div
                                className={`px-4 py-2 mx-2 my-2 cursor-pointer ${category === selectedCategory ? "bg-[#32CD32]" : "bg-[#f9eaea]"} `} onClick={() => {  setSelectedCategory(category) }}>
                        <p className="text-base font-semibold text-center text-black">
                    {category}
                        </p>
                        </div>
                    })}

                </div>
            </div>

            {data.features.length &&
                <OlMap heatMapGeoJson={data} mapId='map' categories={categories}/>
            }
        </>
    )
}

export default Map