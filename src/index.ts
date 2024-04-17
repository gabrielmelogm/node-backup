import fs from "node:fs"
import path from "node:path"

import archiver from "archiver"

import { saveOnGdrive } from "./saveOnGdrive"
import { verifyConfig } from "./utils/defaultConfig"
import { getConfig } from "./utils/config"
import { ConfigOptions } from "./@types/config"

async function main() {
  await verifyConfig()

  const config = await getConfig() as ConfigOptions
    
  if (!fs.existsSync(config.tmpFolder)) {
    fs.mkdirSync(config.tmpFolder)
  }
  
  const outputFilePath = path.resolve(config.tmpFolder, `backup-${new Date().toISOString()}.zip`)
  
  const output = fs.createWriteStream(outputFilePath)
  const archive = archiver('zip', { zlib: { level: 9 } })
  
  output.on('error', err => {
    throw err
  })
  
  archive.pipe(output)
  
  for (const folder of config.folders) {
    const folderPath = `${config.rootDir}/${folder}`
  
    if (!fs.existsSync(folderPath)) {
      console.log(`Folder ${folder} not found`)
    }
  
    archive.directory(folderPath, folder)
  }
  
  archive.finalize()
  
  output.on('close', async () => {
    console.log(`The compress is finished on successfully in: ${outputFilePath}`)
    
    await saveOnGdrive(outputFilePath)
  })

}

main()