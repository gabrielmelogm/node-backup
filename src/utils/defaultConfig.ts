import os from "node:os"
import fs from "node:fs"
import path from "node:path"

import { ConfigOptions } from "../@types/config"

export async function verifyConfig() {
  const configPath = path.resolve(os.homedir(), '.config', 'backup')
  const configFilePath = path.resolve(`${configPath}/config.json`)
  
  const defaultConfig: ConfigOptions = {
    tmpFolder: '/tmp/backup',
    rootDir: os.homedir(),
    googleDrivePath: '',
    folders: ['Pictures', 'Documents']
  }
  
  if (!fs.existsSync(configPath)) {
    await fs.mkdirSync(configPath)
  }
  
  if (!fs.existsSync(configFilePath)) {
    try {
      await fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2))
    } catch (err) {
      if (err) {
        console.error('Error on create config file:', err)
        return
      }
    }
  }
}
