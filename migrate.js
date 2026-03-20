const { Client } = require('pg');
const fs = require('fs');

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
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
