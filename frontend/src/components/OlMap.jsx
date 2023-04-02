import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {useEffect, useState} from "react";
import VectorSource from "ol/source/Vector.js";
import {GeoJSON} from "ol/format.js";
import {Heatmap, Vector} from "ol/layer.js";
import {Circle, Fill, Stroke, Style, Text} from "ol/style.js";
import {Circle as CircleGeom, Point} from "ol/geom.js";
import api from "../api.js";
import {Feature} from "ol";
import {categoriesTranslations} from "../utils/translations.js";

const calculateBlurRadius = (zoom) => Math.exp(Math.exp(zoom * 0.105)) * 0.6 - 17

function OlMap({mapId, heatMapGeoJson, showTitles, selectedCategory, categories}) {
    const [pinLocations, setPinLocations] = useState({type: "FeatureCollection",
        features: []});
    const [coordinates, setCoordinates] = useState([21.2611, 48.7164]);
    const [peopleInProximity, setPeopleInProximity] = useState(null);
    const [poisInProximity, setPoisInProximity] = useState(null);
    const [pinSource, setPinSource] = useState(null);
    const [zoom, setZoom] = useState(15);

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
            blur: calculateBlurRadius(15) * 2.25,
            radius: calculateBlurRadius(15),
            weight: function (feature) {
                // console.log(feature.getProperties().weight)
                return feature.getProperties().weight;
                // return 1;
            },
            opacity: 0.5,
            gradient: ['rgb(132,255,0)', 'rgb(239,209,0)', 'rgb(255,60,0)', 'rgba(255,38,0)'],
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
            if (showTitles) {
                style.getText().setText(feature.get('title', ""));
            }
            let color = '#6ae850'
            let radius = 2
            if (feature.get('type')) {
                color = '#1e6cd0'
                radius = 4
            }
            style.setImage(new Circle({
                radius: radius,
                fill: new Fill({color: color})
            }))

            return style;
        }

        const vectorLayer = new Vector({
            source: heatmapSource,
            style: styleFunction
        });



        const pinSource = new VectorSource({
            features: new GeoJSON().readFeatures(pinLocations, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:4326"
            }),
        });
        if (pinSource === null) {
            setPinSource(pinSource);
        }
        const pinLayer = new Vector({
            source: pinSource,
            style: new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 2,
                }),
                fill: new Fill({
                    color: 'rgba(255,0,0,0.2)',
                }),
            }),
        });

        const map = new Map({
            layers: [
               tile,
                heatmapLayer,
                vectorLayer,
                pinLayer,
            ],
            target: mapId,
            view: new View({
                projection: 'EPSG:4326',
                // center: [21.2611, 48.7164],
                center: coordinates,
                origin: 'bottom-right',
                zoom: zoom,
                maxZoom: 20,
                minZoom: 13.5
            }),
        })

        map.on('moveend', function () {
            setCoordinates( map.getView().getCenter());
            console.log( map.getView().getCenter());
        });

        map.on('click', function (evt) {
            const x = evt.coordinate[0]
            const y = evt.coordinate[1]
            const radius = 0.005
            api.get(`/people-in-proximity?x=${x}&y=${y}&radius=${radius}`)
                .then(response => {
                    setPeopleInProximity(response.data["number_of_people"])
                    const feature = new Feature(new CircleGeom([x, y], radius))
                    pinSource.clear()
                    pinSource.addFeature(feature)
                })
                .catch(error => {
                    console.error(error);
                });

            api.get(`/pois-in-proximity?x=${x}&y=${y}&radius=${radius}&category=${selectedCategory}`)
                .then(response => {
                    console.log(response.data["number_of_pois"])
                    setPoisInProximity(response.data["number_of_pois"])
                })
                .catch(error => {
                    console.error(error);
                });
        })

        map.getView().on('change:resolution', () => {
            const zoom = map.getView().getZoom();
            setZoom(zoom);
            heatmapLayer.setRadius(calculateBlurRadius(zoom));
            heatmapLayer.setBlur(calculateBlurRadius(zoom) * 2.25);
        });

        return () => {
            map.setTarget(undefined)
        }
    }, [heatMapGeoJson, showTitles, pinSource]);

    return (
        <div className="flex">
            <div style={{height:'100vh',width:'100%'}} className="map-container" id={mapId}/>
            <div className="bg-[#31a354] py-6 px-2 flex flex-col gap-12">
                <div className="my-4">
                    {!!peopleInProximity && <p className="text-base font-semibold text-center text-black">Flats in 1km proximity <br/> a.k.a Number of potentional customers: <br/> <span className="text-white text-2xl">{peopleInProximity}</span></p>}
                </div>

                <div className="my-4">
                    {!!poisInProximity && <p className="text-base font-semibold text-center text-black">Similar spots in 1km proximity<br/> a.k.a Number of potentional competitors: <br/> <span className="text-white text-2xl">{poisInProximity}</span></p>}
                </div>

                <div className="my-4">
                    {!!selectedCategory && <p className="text-base font-semibold text-center text-black">Selected Category<br/> <br/> <span className="text-white text-2xl">{categoriesTranslations[selectedCategory] ?? selectedCategory}</span></p>}
                </div>

            </div>

        </div>
    );
}

export default OlMap;