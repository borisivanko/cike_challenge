import api from '../api'
import {useEffect, useState} from "react";
import OlMap from "../components/OlMap.jsx";

function Map () {
    const [data, setData] = useState({type: "FeatureCollection",
    features: []});

    useEffect(() => {
        api.get('/list-pois?category=pharmacy')
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
            {data.features.length &&
                <OlMap heatMapGeoJson={data} mapId='map'/>
            }
        </>
    )
}

export default Map