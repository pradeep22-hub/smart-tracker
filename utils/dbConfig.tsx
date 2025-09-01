import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
const sql = neon('postgresql://neondb_owner:npg_tuKxGeo4Ajf1@ep-calm-flower-adcp3gzx-pooler.c-2.us-east-1.aws.neon.tech/expense-tracker?sslmode=require&channel_binding=require');
export const db = drizzle({client: sql, schema });
