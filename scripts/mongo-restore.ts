// import { exec } from "child_process";
// import path from "path";

// const BACKUP_PATH = path.join(
//   __dirname,
//   "../backups/backup-2025-05-31T15-00-00",
// );
// const SOURCE_DB = "mydatabase";
// const TARGET_DB = "clientdb";
// const TARGET_URI =
//   "mongodb+srv://craftskillsbd:DvcXXC9fesp9B6Yp@cluster0.p9pelgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const restoreCommand = `
// mongorestore \
// --uri="${TARGET_URI}" \
// --nsFrom="${SOURCE_DB}.*" \
// --nsTo="${TARGET_DB}.*" \
// "${BACKUP_PATH}"
// `;

// console.log(`🚀 Restoring database...`);
// exec(restoreCommand, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`❌ Restore failed: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.warn(`⚠️ Warning: ${stderr}`);
//   }
//   console.log(`✅ Restore complete: ${stdout}`);
// });
