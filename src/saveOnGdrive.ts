import fs from "node:fs"
import shell from 'shelljs'
import { getConfig } from "./utils/config";
import { ConfigOptions } from "./@types/config";

export async function saveOnGdrive(filepath: string) {  
  const config = await getConfig() as ConfigOptions

  fs.stat(config.googleDrivePath, async (err, stats) => {
    if (err || !stats.isDirectory()) {
      console.error('Erro ao ler a pasta de rede:', err);
      return;
    }
  
    console.log(`${new Date().toISOString()}: Upload started`)
  
    try {
      shell.mv(filepath, config.googleDrivePath)
    } catch (error: any) {
      
      if (error.code !== 'ENOTSUP') {
        throw error
      }
      
      shell.rm(filepath)

      console.log(`${new Date().toISOString()}: File uploaded successfully`)
    }
  })
}