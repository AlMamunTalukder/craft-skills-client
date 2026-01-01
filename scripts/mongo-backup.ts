// import { exec } from "child_process";
// import path from "path";
// import fs from "fs";

// const MONGO_URI =
//   "mongodb+srv://crafthosting2025:IO4ODVPuezpuqzc9@craft.dljan79.mongodb.net/craft-institute?retryWrites=true&w=majority&appName=craft";
// const BACKUP_DIR = path.join(__dirname, "../backups");

// // 🔧 Ensure backup directory exists
// if (!fs.existsSync(BACKUP_DIR)) {
//   fs.mkdirSync(BACKUP_DIR, { recursive: true });
// }

// // 🕒 Add timestamp to backup
// const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
// const backupPath = path.join(BACKUP_DIR, `backup-${timestamp}`);

// // 🧾 Mongodump command
// const dumpCommand = `mongodump --uri="${MONGO_URI}" --out="${backupPath}"`;

// console.log(`🚀 Running: ${dumpCommand}`);

// exec(dumpCommand, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`❌ Backup failed: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.warn(`⚠️ Warning: ${stderr}`);
//   }
//   console.log(`✅ Backup successful! Saved to: ${backupPath}`);
// });
