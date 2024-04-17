# Backup node
> An script with node to backup linux system

## Options
- Edit file in <code>~/.config/backup/config.json</code>
```bash
| Option  | Description |
| ------------- | ------------- |
| tmpFolder  | string: Directory temporarily used to store compressed files |
| rootDir  | string: Root directory to search  |
| googleDrivePath  | string: Directory that Google Drive is mounted on  |
| folders  | string[]: Directories that will be backed up  |
```

## How compiling
1. Config gnome with your google drive
> [!WARNING]
> default dir:/run/user/1000/gvfs/...
> Copy your paths after this and config in <code>~/.config/backup/config.json</code>
```bash
{
  ...,
  "googleDrivePath": "", # change path
  "folders": [
    "Documents"
  ]
}
```

2. Install dependencies
```bash
npm install
```

3. Build
```bash
npm run build
```

4. Run script
```bash
npm run start
```

