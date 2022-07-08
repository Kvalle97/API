export const queries = {
    getUsers: "select * from UsuariosApi",
    CreateNewUser:
        "insert into UsuariosApi (Nombre,Apellidos,Email,Password) values (@Nombre,@Apellidos,@Email,@Password)",
    getUsersById: 'select * from UsuariosApi where Id = @Id',
    DeleteUser: 'delete from UsuariosApi where Id = @Id',
    getUserByEmail: 'select * from UsuariosApi where Email = @Email',
  
    //empresa
    getSucursales: "select Idempresa,Empresa,Dirección,Teléfonos,Email,Horario from Empresas where not(Idempresa = 10 or Idempresa = 11 or Idempresa = 6 or Idempresa = 5)",


};