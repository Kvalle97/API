import { json, response } from "express";
import { getConnection } from "../database/connection";

export const getproducts = async (reg,res) => {

 const pool = await getConnection();
 const result = await pool.request().query('EXEC dbo.SpReplicaApiListarProductos')
 //console.log(JSON.stringify(result.recordset));
  //res.send(result.recordset);
 
var datos = ((result.recordset));
var objetos =[];
for (var i = 0; i < datos.length; i++) {
    if (objetos.length == 0 || objetos[objetos.length - 1].Codigo!= datos[i].Codigo) {  
        objetos.push({
            Productos: [{
                Codigo: datos[i].Codigo,Producto: datos[i].Producto,
                Descripcion: datos[i].Descripcion,
                UnidadMedida: datos[i].UnidadMedida
            }]
        });
       objetos.push({ Sucursal: [{    
            Imagen: datos[i].Imagen,
            existencia: datos[i].existencia,
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