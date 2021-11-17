/*  Clases */ 
class Articulo
{
    constructor(nombre, precio, stock)
    {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
    }

}

class ItemCarrito
{
    constructor(articulo, cantidad){
        this.articulo = articulo;
        this.cantidad = cantidad;
        this.subtotal = (articulo.precio * cantidad);
    }
}


/* Variables globales */
var articulosCargados = [];
var carrito = [];
var gananciasDia = 0;

/* Carga inicial de datos (simula Base de datos) */
cargaArticulos();


/* Funciones */
function cargaArticulos(){
    articulosCargados.push(new Articulo("MOTHER GIGABYTE B450M AORUS", 12150, 15));
    articulosCargados.push(new Articulo("EVGA NVIDIA GEFORCE RTX 3070 XC3", 320000, 6));
    // let nombre = prompt("Ingrese nombre del  articulo");
    // let precio = prompt("Ingrese precio del  articulo");
    // let cantidadInicial = prompt("Ingrese stioock de  unidades");


    // let articulo = new Articulo(nombre, precio, cantidadInicial);
    // articulosCargados.push(articulo);

    // elemento = document.getElementById("articulos");
    // elemento.innerHTML = elemento.innerHTML + "<br><button type='button' class='btn btn-outline-secondary' data-mdb-ripple-color='dark'  onclick='ControlInventario("+ articulosCargados.indexOf(articulo) +")'>"+articulo.nombre+"</button>"
}

// Agrega al carrito el item seleccionado
function agregarCarrito(index){
    let ingreso;
    let titulo = "Agregar al carrito: " + articulosCargados[index].nombre;
    
    alert(titulo);

    ingreso = prompt("Ingrese Cantidad");
    
        if((articulosCargados[index].stock - ingreso) < 0){
            alert("Stock insuficiente");
        }
        else{
            let numeroIngreso = Number(ingreso);
            if(!isNaN(numeroIngreso))
            {
                procesarCarrito(index,numeroIngreso)
            }
        }
}

// procesa el agregado al carrito
function procesarCarrito(index,cantidad)
{
    let htmlItems = "";

    articulosCargados[index].stock -= cantidad;

    carrito.push(new ItemCarrito(articulosCargados[index], cantidad));


    carritohtml = document.getElementById("carrito");
    carritohtml.removeAttribute("hidden"); 

    carritoItemsHtml = document.getElementById("carritoItems");
    for(let i=0; i<carrito.length; i++)
    {
        htmlItems += "<h2>" + carrito[i].articulo.nombre + "</h2>"+
        "<br> <h2>Cantidad: " + carrito[i].cantidad+"</span></h2>" + 
        "<br> <h2>Subtotal: " + carrito[i].subtotal +"</span></h2> <br>"
    }
    carritoItemsHtml.innerHTML = htmlItems;
    
}

// procesa pago (al aceptar se entiende como pago), limpia html y carrito 
function procesarPago(){
    let total = 0;
    for(let i=0; i<carrito.length; i++)
    {
        total += carrito[i].subtotal;
    }
    alert("El total a pagar es: " + total);


    carrito = [];

    carritohtml = document.getElementById("carrito");
    carritohtml.setAttribute("hidden", true); 

    carritoItemsHtml = document.getElementById("carritoItems");
    carritoItemsHtml.innerHTML = "";

    //se guardan las ganancias del local en el dia podria ser util en un furturo
    gananciasDia += total;
}
// function registrarVentas(){
//     console.log("Ganancia del dia: " + gananciasDia);
// }
