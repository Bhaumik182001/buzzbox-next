import { Pool } from 'pg';

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_JdCvuVc30Gyb@ep-fragrant-wildflower-a1iu6rf7-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

export default pool;
