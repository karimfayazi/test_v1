
/**
 * System Configuration
 * Note: Database credentials should strictly reside on the Server Side (ASP.NET/Node.js).
 * This file represents the configuration parameters used by the backend API.
 */
export const DB_CONFIG = {
  dataSource: "sql.live.sjdap.local",
  catalog: "SJDA_Users",
  userId: "_websitsjda",
  provider: "System.Data.SqlClient",
  status: "Connected",
  lastSync: new Date().toISOString()
};
