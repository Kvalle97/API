import { getConnection, sql, queries } from "../database"


export const getusers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getUsers);
    res.json(result.recordset);
  } catch (error) {
    res.status(500)
    res.send(error.message);
  }
};

export const createNewUser = async (req, res) => {

  const { Nombre, Apellidos, Email, Password } = req.body;
  if (Email == null || Password == null || Nombre == null || Apellidos == null) {
    return res.status(400).json({ msg: 'Bad Request' })
  }
  try {
    const pool = await getConnection();
    await pool.request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("Apellidos", sql.VarChar, Apellidos)
      .input("Email", sql.VarChar, Email)
      .input("Password", sql.VarChar, Password)
      .query(queries.CreateNewUser);

    res.json({ Email, Password });
  } catch (error) {
    res.status(500)
    res.send(error.message);
  }
};

export const getusersbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queries.getUsersById);
    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: 'No Existe registro' })
    }
    res.send(result.recordsets[0]);
  } catch (error) {
    res.status(500)
    res.send(error.message);
  }

};

export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    await pool
      .request()
      .input("Id", id)
      .query(queries.DeleteUser);
    res.json({ msg: 'Usuario Eliminado' });
  } catch (error) {
    res.status(500)
    res.send(error.message);
  }
}