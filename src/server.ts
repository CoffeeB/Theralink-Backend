import { httpServer } from "./app";
import { BackupService } from "./services/backup.service";

const backupService = new BackupService();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Daily backup
setInterval(() => {
  backupService.createBackup();
}, 24 * 60 * 60 * 1000);

// Backup on startup
backupService.createBackup();

httpServer.listen(
  {
    port: Number(PORT),
    host: "0.0.0.0",
  },
  () => {
    console.log(`Server running on port ${PORT}`);
  }
);
