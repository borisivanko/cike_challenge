import api from '../api'
import {useEffect, useState} from "react";
import OlMap from "../components/OlMap.jsx";
import {categoriesTranslations} from "../utils/translations.js";

import CatLoadingSpinner from "../components/CatLoadingSpinner.jsx";

function Map () {
    const [data, setData] = useState({type: "FeatureCollection",
    features: []});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('pharmacy');
    const [showTitles, setShowTitles] = useState(false);
    const [showCategories, setShowCategories] = useState(true)
    const [loadingSelectedCategory, setLoadingSelectedCategory] = useState(true)

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
        setLoadingSelectedCategory(false)
    }, [selectedCategory]);

    useEffect(() => {
        api.get('/all-categories')
            .then(response => {
                console.log(response.data)
                setCategories([...response.data, 'all'])
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className="form-group">
                <div className="w-full bg-gray-800 flex flex-wrap py-4 px-4" >
                    <div className={`w-full transition flex items-center justify-center text-white ${!showCategories && 'rotate-180'}`} onClick={() => setShowCategories((prevState) => !prevState)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M10 14.586L3.707 8.293a1 1 0 011.414-1.414L10 11.758l4.879-4.879a1 1 0 111.414 1.414L10 14.586z"
                                  clipRule="evenodd" />
                        </svg>
                    </div>

                    {showCategories && categories.map((category) => {
                        return   <div key={category}
                                className={`px-4 py-2 mx-2 my-2 cursor-pointer ${category === selectedCategory ? "bg-[#32CD32]" : "bg-[#f9eaea]"} `} onClick={() => {  setSelectedCategory(category) }}>
                        <p className="text-base font-semibold text-center text-black">
                    {categoriesTranslations[category] ?? category}
                        </p>
                        </div>
                    })}
                    {showCategories &&
                        <div className="form-group">
                            <div className="w-full bg-gray-800 flex flex-wrap py-4 px-4" >
                                <div className="cursor-pointer" onClick={() => {  setShowTitles(!showTitles) }}>
                                    <p className="text-base font-semibold text-center text-white">
                                        {showTitles ? "Hide Titles": "Show titles"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>

            {!loadingSelectedCategory ?
                <OlMap heatMapGeoJson={data} mapId='map' categories={categories} showTitles={showTitles}/> :
                <div className='flex justify-center'>
                    <CatLoadingSpinner/>
                </div>
            }
        </>
    )
}

export default Map