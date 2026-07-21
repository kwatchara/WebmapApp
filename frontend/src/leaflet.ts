import './fonts'
import './map.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { provincesTH } from './provinces-th'

// --- Base map centered on Thailand ---
const map = L.map('map', { minZoom: 5 }).setView([13.0, 100.9], 6)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors',
}).addTo(map)

// Style used for the resting (unselected) province polygons.
const PROVINCE_STYLE: L.PathOptions = {
  color: '#3388ff',
  weight: 1,
  fillColor: '#3388ff',
  fillOpacity: 0.05,
}
const SELECTED_STYLE: L.PathOptions = {
  color: '#e11d48',
  weight: 3,
  fillColor: '#e11d48',
  fillOpacity: 0.15,
}

const select = document.querySelector<HTMLSelectElement>('#province-select')!
// name (English key) -> the Leaflet layer for that province
const provinceLayers = new Map<string, L.Layer>()
let selected: L.Path | null = null

function zoomToProvince(name: string): void {
  const layer = provinceLayers.get(name)
  if (!layer) return

  if (selected) provincesGeoJSON?.resetStyle(selected)
  const path = layer as L.Path & { getBounds(): L.LatLngBounds }
  path.setStyle(SELECTED_STYLE)
  path.bringToFront()
  selected = path
  map.fitBounds(path.getBounds(), { padding: [24, 24] })
}

let provincesGeoJSON: L.GeoJSON | null = null

async function init(): Promise<void> {
  const [boundaryRes, provincesRes] = await Promise.all([
    fetch('/data/thailand-boundary.geojson'),
    fetch('/data/thailand-provinces.geojson'),
  ])
  const boundary = await boundaryRes.json()
  const provinces = await provincesRes.json()

  // Country boundary overlay (derived from Example/Thailand.shp).
  L.geoJSON(boundary, {
    style: { color: '#199900', weight: 2.5, dashArray: '6 4', fill: false },
    interactive: false,
  }).addTo(map)

  // Province polygons + build the dropdown from the same features.
  const options: { value: string; label: string }[] = []
  provincesGeoJSON = L.geoJSON(provinces, {
    style: PROVINCE_STYLE,
    onEachFeature: (feature, layer) => {
      const name = String(feature.properties?.name ?? '')
      if (!name) return
      provinceLayers.set(name, layer)
      const th = provincesTH[name]
      const label = th ? `${th} (${name})` : name
      options.push({ value: name, label })
      layer.on('click', () => {
        select.value = name
        zoomToProvince(name)
      })
      layer.bindTooltip(label, { sticky: true })
    },
  }).addTo(map)

  // Populate dropdown, sorted by the Thai label.
  options.sort((a, b) => a.label.localeCompare(b.label, 'th'))
  for (const opt of options) {
    const el = document.createElement('option')
    el.value = opt.value
    el.textContent = opt.label
    select.appendChild(el)
  }

  select.addEventListener('change', () => {
    if (select.value) zoomToProvince(select.value)
  })
}

void init()
