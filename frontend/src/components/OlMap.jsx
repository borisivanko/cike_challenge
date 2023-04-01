import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {useEffect} from "react";
import VectorSource from "ol/source/Vector.js";
import {GeoJSON} from "ol/format.js";
import {Heatmap} from "ol/layer.js";

const calculateBlurRadius = (zoom) => Math.exp(Math.exp(zoom * 0.105)) * 0.5 - 17

function OlMap({mapId, heatMapGeoJson}) {
    useEffect(() => {
        const heatmapSource = new VectorSource({
            features: new GeoJSON().readFeatures(heatMapGeoJson, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:4326"
            })
        });

        const heatmapLayer = new Heatmap({
            title: "HeatMap",
            source: heatmapSource,
            blur: calculateBlurRadius(15),
            radius: calculateBlurRadius(15),
            weight: function (feature) {
                return 10;
            }
        });

        const map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                heatmapLayer
            ],
            target: mapId,
            view: new View({
                projection: 'EPSG:4326',
                center: [21.2611, 48.7164],
                zoom: 15,
                maxZoom: 17,
                minZoom: 13.5
            }),
        })

        map.getView().on('change:resolution', () => {
            const zoom = map.getView().getZoom();
            heatmapLayer.setRadius(calculateBlurRadius(zoom));
            heatmapLayer.setBlur(calculateBlurRadius(zoom));
        });

        return () => {
            map.setTarget(undefined)
        }
    }, []);

    return (
        <>
            <div style={{height:'100vh',width:'100%'}} className="map-container" id={mapId}/>
        </>
    );
}

export default OlMap;