import './fonts'
import './map.css'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const BANGKOK: [number, number] = [100.5018, 13.7563]

const map = new maplibregl.Map({
  container: 'map',
  // Free demo style hosted by MapLibre — no API key required.
  style: 'https://demotiles.maplibre.org/style.json',
  center: BANGKOK,
  zoom: 4,
  pitch: 0,
})

map.addControl(new maplibregl.NavigationControl(), 'top-right')
map.addControl(new maplibregl.ScaleControl())

new maplibregl.Marker({ color: '#295daa' })
  .setLngLat(BANGKOK)
  .setPopup(new maplibregl.Popup().setHTML('<b>Bangkok</b><br>Thailand'))
  .addTo(map)
