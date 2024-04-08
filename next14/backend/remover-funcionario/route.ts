//.../api/funcionarios/remover-funcionario/
import pool from "@/db/connect";

export async function DELETE(req: Request, searchParams: any) {
  const body = await req.json();
  const { matricula } = body;

  const client = await pool.connect();
  const res = await client.query(`DELETE FROM funcionarios WHERE matricula = $1 RETURNING *`, [matricula]);
  client.release();

  return Response.json({ res });
}