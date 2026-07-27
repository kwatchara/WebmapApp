# บันทึกโปรเจกต์ WebmapApp

บันทึกสรุปโครงสร้าง วิธีใช้งาน และสิ่งที่ทำไปแล้วของโปรเจกต์ **WebmapApp**

- Repository: https://github.com/kwatchara/WebmapApp
- อัปเดตล่าสุด: 27 กรกฎาคม 2026

---

## ภาพรวม

เว็บแอปแผนที่ (Web Map) ประกอบด้วย 2 ส่วนหลัก

- **Frontend** — Vite + TypeScript แสดงตัวอย่างการใช้งาน Web Map API 3 ตัว
- **Backend** — FastAPI (Python) ทำหน้าที่เป็น API และเสิร์ฟไฟล์ frontend ที่ build แล้วเป็น web root

---

## เทคโนโลยีที่ใช้

| ส่วน | เทคโนโลยี | เวอร์ชัน |
|------|-----------|----------|
| Build tool | Vite | 8.x |
| ภาษา (frontend) | TypeScript | 6.x |
| แผนที่ 2D | Leaflet | 1.9.4 |
| แผนที่ vector | MapLibre GL | 5.24.0 |
| ลูกโลก 3D | CesiumJS | 1.143.0 |
| ฟอนต์ | Prompt (`@fontsource/prompt`, self-hosted) | 5.x |
| Backend | FastAPI + Uvicorn | 0.139 / 0.51 |
| Python | CPython | 3.10.11 |
| Node.js | | 22.14.0 |

---

## โครงสร้างโปรเจกต์

```
WebmapApp/
├─ frontend/                  # Vite + TypeScript
│  ├─ index.html              # landing page (การ์ดลิงก์ไปแต่ละตัวอย่าง)
│  ├─ leaflet.html            # ตัวอย่าง Leaflet + dropdown จังหวัด
│  ├─ maplibre.html           # ตัวอย่าง MapLibre GL
│  ├─ cesium.html             # ตัวอย่าง CesiumJS
│  ├─ vite.config.ts          # ตั้งค่า multi-page + plugin Cesium
│  ├─ scripts/
│  │  └─ copy-to-backend.mjs   # postbuild: คัดลอก dist → backend/webroot
│  ├─ src/
│  │  ├─ main.ts              # เรนเดอร์การ์ดหน้า landing
│  │  ├─ leaflet.ts           # โหลด GeoJSON จังหวัด + zoom
│  │  ├─ maplibre.ts / cesium.ts
│  │  ├─ provinces-th.ts      # ชื่อจังหวัด EN→TH (77 จังหวัด)
│  │  ├─ fonts.ts             # โหลดฟอนต์ Prompt
│  │  ├─ landing.css / map.css
│  │  └─ assets/              # ไอคอน SVG ของแต่ละ API
│  └─ public/
│     └─ data/                # GeoJSON จังหวัด + ขอบประเทศ
├─ backend/                   # FastAPI
│  ├─ main.py                 # แอป + เสิร์ฟ webroot เป็น web root
│  ├─ requirements.txt
│  ├─ README.md
│  └─ webroot/                # frontend ที่ build แล้ว (ไม่ track ใน git)
├─ Example/                   # ข้อมูล GIS ตัวอย่าง (ไม่ track ใน git)
├─ note.md                    # ไฟล์นี้
└─ README.md
```

---

## หน้าเว็บและฟีเจอร์

### หน้า Landing (`index.html`)
- แสดงการ์ด 3 ใบ ลิงก์ไปหน้าตัวอย่างของแต่ละ Web Map API
- แต่ละการ์ดมีไอคอน SVG ประจำไลบรารี (Leaflet = ใบไม้เขียว, MapLibre = แผนที่พับน้ำเงิน, Cesium = ลูกโลก 3D สีเหลือง)

### หน้า Leaflet (`leaflet.html`)
- แผนที่ 2D ใช้ tile ของ OpenStreetMap
- **Dropdown เลือกจังหวัด** (77 จังหวัด) → zoom ไปยังขอบเขตจังหวัดที่เลือก พร้อมไฮไลต์
- คลิก polygon จังหวัดบนแผนที่ได้ (sync กับ dropdown)
- overlay เส้นขอบประเทศ (เส้นประเขียว) ที่แปลงมาจาก `Example/Thailand.shp`
- key ที่ใช้: `name` (ชื่อจังหวัดภาษาอังกฤษ), แสดงผลเป็นชื่อไทยจาก `provinces-th.ts`

### หน้า MapLibre (`maplibre.html`)
- แผนที่ vector tiles ใช้ MapLibre demo style (ไม่ต้องใช้ API key)

### หน้า Cesium (`cesium.html`)
- ลูกโลก 3D ใช้ภาพจาก OpenStreetMap (ไม่ต้องใช้ Ion token)

> หมายเหตุ: ทุกตัวอย่างปักหมุด/โฟกัสที่ประเทศไทย และไม่ต้องใช้ API key/token

---

## วิธีรัน

### Frontend (โหมดพัฒนา)

```bash
cd frontend
npm install
npm run dev          # เปิด http://localhost:5173/
```

### Frontend (build สำหรับใช้งานจริง)

```bash
cd frontend
npm run build        # สร้าง dist/ แล้วคัดลอกไป backend/webroot อัตโนมัติ
npm run preview      # ทดสอบผล build ที่ http://localhost:4173/
```

> `npm run build` มีขั้น `postbuild` ที่คัดลอก `dist/` → `backend/webroot/` ให้อัตโนมัติทุกครั้ง

### Backend (FastAPI)

```bash
# จาก root ของ repo
.venv\Scripts\activate           # Windows
pip install -r backend/requirements.txt

cd backend
uvicorn main:app --reload        # เปิด http://127.0.0.1:8000/
```

จุดเข้าใช้งาน backend:

| Path | ใช้ทำ |
|------|-------|
| `/` | frontend ที่ build แล้ว (จาก `webroot/`) |
| `/api` | ข้อมูล service |
| `/health` | health check |
| `/docs` | Swagger UI |

---

## ขั้นตอนการทำงานตอน deploy

1. `cd frontend && npm run build` → ได้ `dist/` และคัดลอกไป `backend/webroot/` อัตโนมัติ
2. รัน backend ด้วย `uvicorn main:app` → เสิร์ฟทั้ง frontend + API จาก origin เดียวกัน (ไม่มีปัญหา CORS)

> หากต้อง deploy ใต้ subpath (เช่น `example.com/webmap/`) ต้องตั้ง `base` ใน `vite.config.ts` แล้ว build ใหม่

---

## หมายเหตุเรื่อง Git

- `Example/` และ `.venv/` **ไม่ถูก track** (เป็นข้อมูลตัวอย่าง/virtualenv)
- `backend/webroot/` **ไม่ถูก track** (เป็น build artifact — สร้างใหม่จาก `npm run build`)
- `frontend/node_modules/` และ `frontend/dist/` **ถูก track** ในโปรเจกต์นี้ (ตามที่ร้องขอ)
- ตั้ง `core.autocrlf=false` เพื่อไม่ให้แก้ line ending ของ dependency

---

## ข้อมูลใน `Example/`

| ไฟล์ | รายละเอียด |
|------|-----------|
| `Thailand.shp` | polygon เส้นขอบประเทศไทย (1 feature, projection UTM Zone 47N) |
| `POI.csv` | จุด POI แถวศาลายา/มหิดล (fields: `ID, NAMT, Longitude, Latitude`) |
| `Topo50K50361.tif` | ภาพ raster แผนที่ภูมิประเทศ |

> ข้อมูลจังหวัด 77 จังหวัดในหน้า Leaflet มาจาก GeoJSON แหล่งเปิดภายนอก (Example ไม่มีข้อมูลรายจังหวัด)
```
