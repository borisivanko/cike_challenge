import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {useEffect} from "react";
import VectorSource from "ol/source/Vector.js";
import {GeoJSON} from "ol/format.js";
import {Heatmap} from "ol/layer.js";

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
            blur: 150,
            radius: 40,
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
                // center: [21.2611, 48.7164],
                center: [21.2403395,48.7271548],
                zoom: 15,
            }),
        })

        map.getView().on('change:resolution', (event) => {
            const zoom = map.getView().getZoom()
            heatmapLayer.setRadius(zoom * 100)
        });

        return () => {
            map.setTarget(undefined)
        }
    }, []);

    useEffect(()=>{

    }, [])

    return (
        <div style={{height:'100vh',width:'100%'}} className="map-container" id={mapId}/>
    );
}

export default OlMap;