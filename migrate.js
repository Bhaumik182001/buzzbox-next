const { Client } = require('pg');
const fs = require('fs');

async function migrate() {
  const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_JdCvuVc30Gyb@ep-fragrant-wildflower-a1iu6rf7-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  });
  
  try {
    await client.connect();
    console.log("Connected to Neon DB successfully.");
    const sql = fs.readFileSync('schema.sql', 'utf8');
    await client.query(sql);
    console.log("Schema applied successfully.");
  } catch (err) {
    console.error("Error applying schema:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
