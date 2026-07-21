import './fonts'
import './map.css'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

// Use OpenStreetMap tiles so no Cesium Ion access token is required.
const osm = new Cesium.UrlTemplateImageryProvider({
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  maximumLevel: 19,
  credit: '© OpenStreetMap contributors',
})

const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayer: new Cesium.ImageryLayer(osm),
  baseLayerPicker: false,
  geocoder: false,
  timeline: false,
  animation: false,
  homeButton: false,
  navigationHelpButton: false,
  sceneModePicker: true,
})

// Fly the camera to Thailand.
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(100.5018, 13.7563, 1_500_000),
})

viewer.entities.add({
  name: 'Bangkok',
  position: Cesium.Cartesian3.fromDegrees(100.5018, 13.7563),
  point: {
    pixelSize: 12,
    color: Cesium.Color.fromCssColorString('#6cad2f'),
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,
  },
  label: {
    text: 'Bangkok',
    font: '14px "Prompt", sans-serif',
    pixelOffset: new Cesium.Cartesian2(0, -20),
    fillColor: Cesium.Color.WHITE,
    showBackground: true,
  },
})
