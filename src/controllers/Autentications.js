
import { getConnection, sql, queries } from "../database"
var bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

export const Login = async (req, res) => {
    const { Id,Nombre, Apellidos, Email, password } = req.body;
    let Password = await bcrypt.hash(password, 10); 
  
    if (Email == null || password == null || Nombre == null || Apellidos == null) {
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

    
        const token = jwt.sign({Id},'secret',{
              expiresIn:  60 * 60 * 24
        })

      res.json({ auth: true, token: token, Username: Email,Password});
    } catch (error) {
      res.status(500)
      res.send(error.message);
    }
  };