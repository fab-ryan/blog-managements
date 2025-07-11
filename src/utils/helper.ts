import * as path from 'path'
import * as fs from 'fs'

export const db = fs.readFileSync(path.join(__dirname, '../database.json'), 'utf-8')