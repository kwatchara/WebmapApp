import"./fonts-DSA2fbCe.js";var e=[{href:`/leaflet.html`,name:`Leaflet`,tag:`2D · Raster tiles`,description:`ไลบรารีแผนที่ 2D ยอดนิยม น้ำหนักเบา ใช้ OpenStreetMap raster tiles พร้อม marker และ popup`,accent:`#199900`,icon:`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%20role='img'%20aria-label='Leaflet'%3e%3cpath%20d='M52%208C51%208%2022%2012%2015%2038c-3%2011%201%2019%206%2022L47%2020%2027%2056c22%203%2033-13%2033-33%200-8-3-13-8-15z'%20fill='%23199900'/%3e%3cpath%20d='M21%2060C16%2052%2015%2038%2030%2024'%20fill='none'%20stroke='%23ffffff'%20stroke-width='2.5'%20stroke-linecap='round'%20opacity='0.85'/%3e%3c/svg%3e`},{href:`/maplibre.html`,name:`MapLibre GL`,tag:`2D/3D · Vector tiles`,description:`เรนเดอร์ vector tiles ด้วย WebGL หมุน/เอียงแผนที่ได้ ใช้ MapLibre demo style (ไม่ต้องใช้ API key)`,accent:`#295daa`,icon:`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%20role='img'%20aria-label='MapLibre%20GL'%3e%3cpath%20d='M8%2016%2024%2010%2040%2016%2056%2010v38l-16%206-16-6-16%206z'%20fill='%23295daa'/%3e%3cpath%20d='M24%2010v38M40%2016v38'%20fill='none'%20stroke='%23ffffff'%20stroke-width='2'%20opacity='0.6'/%3e%3cpath%20d='M8%2028h48M8%2040h48'%20fill='none'%20stroke='%23ffffff'%20stroke-width='1.5'%20opacity='0.35'/%3e%3ccircle%20cx='32'%20cy='27'%20r='7'%20fill='%23ffffff'/%3e%3ccircle%20cx='32'%20cy='26'%20r='3'%20fill='%23295daa'/%3e%3c/svg%3e`},{href:`/cesium.html`,name:`CesiumJS`,tag:`3D · Globe`,description:`ลูกโลก 3 มิติเต็มรูปแบบบน WebGL วางภาพจาก OpenStreetMap บนทรงกลมโลก (ไม่ต้องใช้ Ion token)`,accent:`#eab308`,icon:`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%20role='img'%20aria-label='CesiumJS'%3e%3ccircle%20cx='32'%20cy='32'%20r='24'%20fill='%23eab308'/%3e%3cg%20fill='none'%20stroke='%237a5c00'%20stroke-width='2'%20opacity='0.85'%3e%3cellipse%20cx='32'%20cy='32'%20rx='24'%20ry='9.5'/%3e%3cellipse%20cx='32'%20cy='32'%20rx='9.5'%20ry='24'/%3e%3cline%20x1='8'%20y1='32'%20x2='56'%20y2='32'/%3e%3cline%20x1='32'%20y1='8'%20x2='32'%20y2='56'/%3e%3c/g%3e%3c/svg%3e`}];document.querySelector(`#app`).innerHTML=`
  <header class="hero">
    <h1>Webmap App</h1>
    <p class="subtitle">ตัวอย่างการใช้งาน Web Map API แต่ละตัว — เลือกดูได้เลย</p>
  </header>

  <main class="grid">
    ${e.map(e=>`
      <a class="card" href="${e.href}" style="--accent:${e.accent}">
        <div class="card__head">
          <img class="card__icon" src="${e.icon}" alt="${e.name} icon" width="48" height="48" />
          <span class="card__tag">${e.tag}</span>
        </div>
        <h2 class="card__title">${e.name}</h2>
        <p class="card__desc">${e.description}</p>
        <span class="card__cta">เปิดตัวอย่าง →</span>
      </a>`).join(``)}
  </main>

  <footer class="foot">
    <span>Vite + TypeScript</span>
    <span>·</span>
    <span>Leaflet · MapLibre GL · CesiumJS</span>
  </footer>
`;