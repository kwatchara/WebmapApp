// Copies the Vite build output (dist/) into backend/webroot so the FastAPI
// server can serve it as its web root. Runs automatically after `vite build`
// via the "postbuild" npm script.
import { cpSync, rmSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const dist = resolve(here, '..', 'dist')
const dest = resolve(here, '..', '..', 'backend', 'webroot')

if (!existsSync(dist)) {
  console.error('[copy-to-backend] dist/ not found — run `vite build` first.')
  process.exit(1)
}

rmSync(dest, { recursive: true, force: true })
cpSync(dist, dest, { recursive: true })
console.log(`[copy-to-backend] copied dist/ -> backend/webroot/`)
