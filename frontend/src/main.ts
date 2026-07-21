import './fonts'
import './landing.css'
import leafletIcon from './assets/leaflet-icon.svg'
import maplibreIcon from './assets/maplibre-icon.svg'
import cesiumIcon from './assets/cesium-icon.svg'

interface MapExample {
  href: string
  name: string
  tag: string
  description: string
  accent: string
  icon: string
}

const examples: MapExample[] = [
  {
    href: '/leaflet.html',
    name: 'Leaflet',
    tag: '2D · Raster tiles',
    description:
      'ไลบรารีแผนที่ 2D ยอดนิยม น้ำหนักเบา ใช้ OpenStreetMap raster tiles พร้อม marker และ popup',
    accent: '#199900',
    icon: leafletIcon,
  },
  {
    href: '/maplibre.html',
    name: 'MapLibre GL',
    tag: '2D/3D · Vector tiles',
    description:
      'เรนเดอร์ vector tiles ด้วย WebGL หมุน/เอียงแผนที่ได้ ใช้ MapLibre demo style (ไม่ต้องใช้ API key)',
    accent: '#295daa',
    icon: maplibreIcon,
  },
  {
    href: '/cesium.html',
    name: 'CesiumJS',
    tag: '3D · Globe',
    description:
      'ลูกโลก 3 มิติเต็มรูปแบบบน WebGL วางภาพจาก OpenStreetMap บนทรงกลมโลก (ไม่ต้องใช้ Ion token)',
    accent: '#eab308',
    icon: cesiumIcon,
  },
]

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="hero">
    <h1>Webmap App</h1>
    <p class="subtitle">ตัวอย่างการใช้งาน Web Map API แต่ละตัว — เลือกดูได้เลย</p>
  </header>

  <main class="grid">
    ${examples
      .map(
        (ex) => `
      <a class="card" href="${ex.href}" style="--accent:${ex.accent}">
        <div class="card__head">
          <img class="card__icon" src="${ex.icon}" alt="${ex.name} icon" width="48" height="48" />
          <span class="card__tag">${ex.tag}</span>
        </div>
        <h2 class="card__title">${ex.name}</h2>
        <p class="card__desc">${ex.description}</p>
        <span class="card__cta">เปิดตัวอย่าง →</span>
      </a>`,
      )
      .join('')}
  </main>

  <footer class="foot">
    <span>Vite + TypeScript</span>
    <span>·</span>
    <span>Leaflet · MapLibre GL · CesiumJS</span>
  </footer>
`
