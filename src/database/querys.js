export const queries = {
    getUsers: "select * from UsuariosApi",
    CreateNewUser:
        "insert into UsuariosApi (Nombre,Apellidos,Email,Password) values (@Nombre,@Apellidos,@Email,@Password)",
    getUsersById: 'select * from UsuariosApi where Id = @Id',
    DeleteUser: 'delete from UsuariosApi where Id = @Id',
};