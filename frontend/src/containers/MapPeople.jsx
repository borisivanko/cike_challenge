import api from '../api'
import {useEffect, useState} from "react";
import OlMap from "../components/OlMap.jsx";

function Map () {
    const [data, setData] = useState({type: "FeatureCollection",
    features: []});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get(`/list-homes`)
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
    }, []);

    return (
        <>
            {!!data.features.length &&
                <OlMap heatMapGeoJson={data} mapId='map' categories={categories}/>
            }
        </>
    )
}

export default Map