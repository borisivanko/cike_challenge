import api from '../api'
import {useEffect, useState} from "react";
import OlMap from "../components/OlMap.jsx";

function Map () {
    const [data, setData] = useState({type: "FeatureCollection",
    features: []});
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('pharmacy');

    useEffect(() => {
        api.get(`/list-pois?category=${category}`)
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
    }, [category]);

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
                {/*<label htmlFor="category">Category</label>*/}
                {/*<select className="form-control" id="category" onChange={(e) => setCategory(e.target.value)}>*/}
                {/*    {categories.map((category, index) => {*/}
                {/*        return <option key={index} value={category}>{category}</option>*/}
                {/*    }*/}
                {/*    )}*/}
                {/*</select>*/}

                <div className="w-full bg-gray-800 flex" >
                    {categories.map((category, index) => {
                        return   <div
                        className="px-4 py-2 rounded-[38px] bg-[#f9eaea]"
                        >
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