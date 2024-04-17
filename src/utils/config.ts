import fs from "node:fs"
import os from "node:os"
import path from "node:path"

import { ConfigOptions } from "../@types/config"

const configPath = path.resolve(os.homedir(), '.config', 'backup')
const configFilePath = path.resolve(`${configPath}/config.json`)

export async function getConfig(): Promise<ConfigOptions | null> {
  let config: ConfigOptions | null = null

  try {
    const data = fs.readFileSync(configFilePath, 'utf8')

    config = JSON.parse(data)
    
  } catch (error) {
    if (error) {
      console.error('Invalid file format:', error)
    }
  }

  if (!config?.googleDrivePath) {
    console.warn('Google drive path not set')
  }


  return config
}
