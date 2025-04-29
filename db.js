import 'dotenv/config';
import postgres from 'postgres';
import http from 'http'; // Substituindo require por import
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL);

export default sql;