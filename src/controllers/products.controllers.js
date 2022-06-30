import { json, response } from "express";
import { getConnection } from "../database/connection";

export const getproducts = async (reg,res) => {

 const pool = await getConnection();
 const result = await pool.request().query('EXEC dbo.SpReplicaApiListarProductos')
 
var datos = ((result.recordset));
var objetos =[];
for (var i = 0; i < datos.length; i++) {
    if (objetos.length == 0 || objetos[objetos.length - 1].Codigo!= datos[i].Codigo) {  
        objetos.push({
            Productos: [{
                Codigo: datos[i].Codigo,
                Producto: datos[i].Producto,
                Descripcion: datos[i].Descripcion,
                UnidadMedida: datos[i].UnidadMedida
            }]
        });
       objetos.push({ Sucursal: [{    
            Imagen: datos[i].Imagen,
            Existencia: datos[i].existencia,
            IdEmpresa: datos[i].IdEmpresa,
            Empresa: datos[i].Empresa,
            Costo: datos[i].Costo,
            Precio: datos[i].Precio
        }]
    });
    } else {        
        if (objetos[objetos.length - 1].Productos[objetos[objetos.length - 1].Productos.length - 1].Producto != datos[i].Producto) {
            objetos[objetos.length - 1].Productos.push({
                Producto: datos[i].Producto,
                Descripcion: datos[i].Descripcion,
                UnidadMedida: datos[i].UnidadMedida,
                Imagen: datos[i].Imagen,
                existencia: datos[i].existencia,
                IdEmpresa: datos[i].IdEmpresa,
                Empresa: datos[i].Empresa,
                Costo: datos[i].Costo,
                Precio: datos[i].Precio
            });
        } 
    }
}
// Mostrar resultado formateado como JSON
res.send(JSON.stringify(objetos, null, 4));
};  

//export const getproductscodigo = async (reg,res) => {
    
    //const pool = await getConnection();
    //const result = await pool.request().query('EXEC dbo.SpReplicaApiListarProductos')
    //var datos = ((result.recordset));
    //for (var i = 0; i < datos.length; i++) {
        //if (datos[i].Codigo == reg.params.Codigo) {
            //res.json(datos[i]);
        //} else  {
           //res.send("No existe el producto");
        //}
    //}
//}
export const getproductscodigo = async (reg,res) => {
    const Codigo = reg.params.Codigo;
    const pool = await getConnection();
    const result = await pool.request()
    .input("Codigo", Codigo)
    .execute('SpReplicaApiListarInfoxCodigoProducto');
    if (result.recordset.length === 0) {
        return res.status(404).json({ msg: 'No Existe registro' })
    }
    res.send(result.recordsets[0]);
}

export const getproductscodigoandsucursal = async (reg,res) => {
    const  Codigo = reg.params.Codigo;
    const Empresa = reg.params.Empresa;
    const pool = await getConnection(); 
    const result = await pool.request()
    .input("Codigo", Codigo)
    .input("IdEmpresa", Empresa)
    .execute('SpReplicaApiObtenerInfoxCodigoProductoxEmpresa');
    if (result.recordset.length === 0) {
        return res.status(404).json({ msg: 'No Existe registro' })
    }
    res.send(result.recordsets[0]);

}



        