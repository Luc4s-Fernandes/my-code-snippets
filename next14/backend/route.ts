//.../api/funcionarios
import pool from "@/db/connect";

export async function GET() {
    const client = await pool.connect();
    const data = await client.query(`SELECT * FROM funcionarios`);
    client.release();

    const res = data.rows;

    return Response.json({ res });
}