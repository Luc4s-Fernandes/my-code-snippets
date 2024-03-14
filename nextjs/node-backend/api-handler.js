//./pages/api/api-handler

//import pool from '../../lib/db';
const pool = require('../../lib/db');

async function handler(req, res) {
  const table = 'table';

  if (req.method === 'GET' && req.body.id) {
    try {
      const { id } = req.body;
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);

      client.release();

      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  else if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM ${table}`);
      client.release();

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  else if (req.method === 'PUT' && req.body.id) {
    try {
      const { id, name, age, email } = req.body;
      const client = await pool.connect();
      const result = await client.query(`UPDATE ${table} SET name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *`, [name, age, email, id]);

      client.release();

      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Data updated successfully' });
      } else {
        res.status(404).json({ message: 'Data not found for the provided ID' });
      }
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  else if (req.method === 'POST') {
    try {
      const { id, name, age, email } = req.body;

      const client = await pool.connect();
      const result = await client.query(`INSERT INTO ${table} (id, name, age, email) VALUES ($1, $2, $3, $4) RETURNING *`, [id, name, age, email]);
      client.release();

      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(500).json({ message: 'Failed to add data' });
      }
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  else if (req.method === 'DELETE' && req.body.id) {
    try {
      const { id } = req.body;

      const client = await pool.connect();
      const result = await client.query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id]);
      client.release();

      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Data deleted successfully' });
      } else {
        res.status(404).json({ message: 'Data not found for the provided ID' }); 
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const method = 'GET'
const mockRequest = {
  method: method,
  body: {
    id: 1,
    name: 'name',
    age: 100,
    email: 'example@example'
  }
};

const mockResponse = {
  status: function (statusCode) {
    this.statusCode = statusCode;
    return this;
  },
  json: function (data) {
    console.log('\n@Response: ', data, '\n');
  }
};

handler(mockRequest, mockResponse);

//export default handler;
module.exports = handler;