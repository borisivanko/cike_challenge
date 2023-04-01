import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {useEffect, useRef} from "react";

function OlMap({mapId}) {
    const mapRef = useRef()

    useEffect(() => {
        const map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            target: mapId,
            view: new View({
                projection: 'EPSG:4326',
                center: [0, 0],
                zoom: 2,
            }),
        });

        return () => {
            mapRef.current = undefined
            map.setTarget(undefined)
        }
    }, []);

    return (
        <div style={{height:'100vh',width:'100%'}} ref={mapRef} className="map-container" id={mapId}/>
    );
}

export default OlMap;