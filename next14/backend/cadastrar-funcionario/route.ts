//.../api/funcionarios/cadastrar-funcionario
import pool from "@/db/connect";

export async function POST(req: any) {
  const body = await req.json();
  const { matricula, nome, whatsapp, email, lotacao, ramal } = body;

  const client = await pool.connect();
  const res = await client.query(`INSERT INTO funcionarios (matricula, nome, whatsapp, email, lotacao, ramal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [matricula, nome, whatsapp, email, lotacao, ramal]);
  client.release();

  return Response.json({ body });
}