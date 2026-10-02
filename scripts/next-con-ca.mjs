import { spawn } from 'node:child_process'

// En esta máquina Node no confía en el certificado que sí acepta Windows
// (antivirus o proxy que inspecciona HTTPS). Sin esto, el middleware no
// puede validar la sesión y manda siempre al login.
const extra = '--use-system-ca'
const actual = process.env.NODE_OPTIONS ?? ''
if (!actual.split(/\s+/).includes(extra)) {
  process.env.NODE_OPTIONS = `${actual} ${extra}`.trim()
}

const child = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', ...process.argv.slice(2)],
  { stdio: 'inherit', env: process.env }
)

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 1)
})
