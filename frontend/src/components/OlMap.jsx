import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {useEffect, useState} from "react";
import VectorSource from "ol/source/Vector.js";
import {GeoJSON} from "ol/format.js";
import {Heatmap, Vector} from "ol/layer.js";
import {Circle, Fill, Stroke, Style, Text} from "ol/style.js";

function OlMap({mapId, heatMapGeoJson}) {

    const [coordinates, setCoordinates] = useState([21.2611, 48.7164]);

    console.log("rendering")
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
            },
            gradient: ['rgba(132,255,0,0.77)', 'rgba(239,209,0,0.81)', 'rgba(255,60,0,0.75)', 'rgba(255,38,0,0.7)'],
// Reverse the gradient
        });

        const tile =  new TileLayer({
            source: new OSM(),
        })

        tile.on('prerender', (evt) => {
            // return
            if (evt.context) {
                const context = evt.context;
                context.filter = 'grayscale(80%) invert(100%) ';
                context.globalCompositeOperation = 'source-over';
            }
        });

        tile.on('postrender', (evt) => {
            if (evt.context) {
                const context = evt.context;
                context.filter = 'none';
            }
        });


        const style = new Style({
            image: new Circle({
                radius: 2,
                fill: new Fill({color: '#6ae850'})
            }),
            text: new Text({
                font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
                placement: 'point',
                fill: new Fill({color: '#fff'}),
                stroke: new Stroke({color: '#000', width: 2}),
            }),
        });
        var styleFunction = function(feature) {
            style.getText().setText(feature.get('title'));
            return style;
        }

        const vectorLayer = new Vector({
            source: heatmapSource,
            style: styleFunction
        });

        const map = new Map({
            layers: [
               tile,
                heatmapLayer,
                vectorLayer
            ],
            target: mapId,
            view: new View({
                projection: 'EPSG:4326',
                // center: [21.2611, 48.7164],
                center: coordinates,
                origin: 'bottom-right',
                zoom: 15,
            }),
        })

        map.on('moveend', function () {
            setCoordinates( map.getView().getCenter());
            console.log( map.getView().getCenter());
        });

        map.getView().on('change:resolution', (event) => {
            const zoom = map.getView().getZoom()
            heatmapLayer.setRadius(zoom * 2)
        });

        return () => {
            map.setTarget(undefined)
        }
    }, [heatMapGeoJson]);


    return (
        <div style={{height:'100vh',width:'100%'}} className="map-container" id={mapId}/>
    );
}

export default OlMap;