//.../api/funcionarios/editar-funcionario/
import pool from "@/db/connect";

export async function PUT(req: Request, searchParams: any) {
  const matricula = (searchParams.params.slug);

  const body = await req.json();
  const { nome, whatsapp, email, lotacao, ramal } = body;

  const client = await pool.connect();
  const res = await client.query(`UPDATE funcionarios SET nome = $1, whatsapp = $2, email = $3, lotacao = $4, ramal = $5 WHERE matricula = $6 RETURNING *`, [nome, whatsapp, email, lotacao, ramal, matricula]);
  client.release();

  return Response.json({ res });
}