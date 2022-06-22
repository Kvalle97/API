import sql from "mssql";

const dbsettings = {
  user: "Sa",
  password: "E727cd9b1f",
  server: "192.168.0.2",
  database: "Halcon",
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbsettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
}

