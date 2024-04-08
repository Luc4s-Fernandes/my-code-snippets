//.../api/funcionarios/[slug]
import pool from "@/db/connect";

export async function GET(req: Request, searchParams: any) {
    const matricula = (searchParams.params.slug);

    const client = await pool.connect();
    const data = await client.query(`SELECT * FROM funcionarios WHERE matricula = $1`, [matricula]);
    client.release();

    const res = data.rows[0];
   
    return Response.json( res );
  }


