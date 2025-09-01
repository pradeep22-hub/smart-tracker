import 'dotenv/config';
import { defineConfig} from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_tuKxGeo4Ajf1@ep-calm-flower-adcp3gzx-pooler.c-2.us-east-1.aws.neon.tech/expense-tracker?sslmode=require&channel_binding=require',
  },
}); 