import fs from 'node:fs'
import path from 'node:path'

const ROOT_PATH: string = 'src/examples'

export default (module: string, component: string) => {
  const filePath = path.resolve(`${ROOT_PATH}/${module}/${component}.vue`)

  const fileContent = fs.readFileSync(filePath, 'utf-8')

  return fileContent
}
