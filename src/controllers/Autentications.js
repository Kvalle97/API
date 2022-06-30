
import { getConnection, sql, queries } from "../database"
var bcrypt = require('bcryptjs');
//var crypto = require('crypto');
//var md5 = require('md5');
const jwt = require('jsonwebtoken');

export const Signup = async (req, res) => {

  const { Id, Nombre, Apellidos, Email, password } = req.body;

  if (Email == null || password == null || Nombre == null || Apellidos == null) {
    return res.status(400).json({ msg: 'Bad Request' })
  }
  try {
    let Password = await bcrypt.hash(password, 10);
    //let Password = crypto.createHash('sha256').update(password).digest('hex');
    //let Password = md5(password);
    const pool = await getConnection();
    await pool.request()

      .input("Nombre", sql.VarChar, Nombre)
      .input("Apellidos", sql.VarChar, Apellidos)
      .input("Email", sql.VarChar, Email)
      .input("Password", sql.VarChar, Password)
      .query(queries.CreateNewUser);

    const token = jwt.sign({ Id }, 'secret', {
      expiresIn: 60 * 60 * 24
    })
    res.json({ auth: true, token: token, Username: Email });
  } catch (error) {
    res.status(500)
    res.send(error.message);
  }
};

export const Signin = async (req, res) => {
  const { Email, Password } = req.body;
  if (Email == null || Password == null) {
    return res.status(400).json({ msg: 'Bad Request' })
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("Email", sql.VarChar, Email)
      .query(queries.getUserByEmail);
    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: 'No Existe registro' })
    }
    const user = result.recordset[0];
    //const isMatch = await bcrypt.compare(password, user.Password)
    const isMatch = md5(Password) === user.Password;
    if (!isMatch) {
      return res.status(400).json({ msg: 'Password Incorrecto' })
    }
    const token = jwt.sign({ Id: user.Id }, 'secret', {
      expiresIn: '1h'
    })
    res.json({ auth: true, token: token, Username: Email });
  } catch (error) {
    res.status(500)
    res.send(error.message);
  }
}