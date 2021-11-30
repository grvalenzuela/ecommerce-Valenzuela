/*  Clases */
class Articulo {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = parseFloat(precio);
  }
}

class Carrito {
  constructor() {
    this.items = [];
    this.precioTotal = 0;
  }

  agregarProductoCarrito(itemCarrito) {
    this.items.push(itemCarrito);
    this.calcularTotalCarrito();
  }

  eliminarProductoCarrito(articulo) {
    for (var i = 0; i < arr.length; i++) {
      if (this.items[i] === articulo.nombre) {
        this.items.splice(i, 1);
      }
    }
  }

  subirCantidadProducto(idArticulo) {
    itemCarrito = this.items.find((item) => item.articulo.id == idArticulo);
    itemCarrito.sumarCantidad();
  }

  calcularTotalCarrito() {
    this.precioTotal = this.items.reduce(
      (acumulador, itemCarrito) => itemCarrito.articulo.precio + acumulador,
      0
    );
  }
}

class ItemCarrito {
  constructor(articulo) {
    this.articulo = articulo;
    this.cantidad = 1;
  }

  sumarCantidad() {
    this.cantidad++;
  }
}

class StockTienda {
  constructor(articulos = []) {
    this.articulos = articulos;
  }

  agregarProductoAStock(itemTienda) {
    this.articulos.push(itemTienda);
  }

  // reducirStock(idBuscado){
  //     itemTienda = this.articulos.find(item => item.articulo.id == idBuscado);
  //     itemTienda.reducirStock();
  // }

  encontrarProductoPorNombreEnTienda(nombreBuscado) {
    return this.articulos.find((item) => item.articulo.nombre == nombreBuscado);
  }

  encontrarProductoPorIdEnTienda(idBuscado) {
    return this.articulos.find((item) => item.articulo.id == idBuscado);
  }
}

class ItemTienda {
  constructor(articulo, stock) {
    this.articulo = articulo;
    this.stock = stock;
  }

  reducirStock() {
    this.stock--;
  }
}

/* Variables globales */
var articulosCargados = [];
let tienda = new StockTienda();
let carrito = new Carrito();
var gananciasDia = 0;

/* Carga inicial de datos (simula Base de datos) */
cargaArticulos();

/* Funciones */
function cargaArticulos() {
  tienda.agregarProductoAStock(
    new ItemTienda(
      new Articulo(
        1,
        "Placa de Video EVGA GeForce RTX 3090 24GB GDDR6X FTW3 ULTRA ICX3 ARGB",
        550000
      ),
      15
    )
  );
  tienda.agregarProductoAStock(
    new ItemTienda(
      new Articulo(
        2,
        "Placa de Video PNY GeForce RTX 3060 Ti 8GB GDDR6 EPIC-X RGB Dual Fan LHR",
        220000
      ),
      6
    )
  );
  tienda.agregarProductoAStock(
    new ItemTienda(
      new Articulo(
        3,
        "Placa de Video GeForce MSI GTX 1650 4GB GDDR5 Ventus XS OC",
        65000
      ),
      10
    )
  );
  cargaProductos();
}

// Agrega al carrito el item seleccionado
function agregarCarrito(id) {
  let itemTienda = tienda.encontrarProductoPorIdEnTienda(id);

  carrito.agregarProductoCarrito(new ItemCarrito(itemTienda.articulo));

  itemTienda.reducirStock();

  procesarCarrito();
}

// procesa el agregado al carrito
function procesarCarrito() {
  let htmlItems = "";

  carritohtml = document.getElementById("carrito");
  carritohtml.removeAttribute("hidden");

  carritoItemsHtml = document.getElementById("carritoItems");

  carritoSpan = document.getElementById("carrito-cant");

  for (let i = 0; i < carrito.items.length; i++) {
    htmlItems += "<h2>" + carrito.items[i].articulo.nombre + "</h2>";
  }
  htmlItems +=
    "<br> <h2>Subtotal: " + carrito.precioTotal + "</span></h2> <br>";
  carritoItemsHtml.innerHTML = htmlItems;
  carritoSpan.innerHTML = carrito.items.length;
}

// procesa pago (al aceptar se entiende como pago), limpia html y carrito
function procesarPago() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
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

// CARGA HTML PRODUCTOS
function cargaProductos() {
  let contenedor = document.getElementById("contenedorProductos");

  for (let itemTienda of tienda.articulos) {
    contenedor.innerHTML =
      contenedor.innerHTML +
      `<div class="row d-flex justify-content-center">
    <div class="col-12 col-md-12 d-flex justify-content-center card_producto  p-3">

      <div class="card" style="max-height: 250px;">
          <div class="row d-flex align-items-center ">
            <div class="col-md-4 img_container">
              <img
                src="img/${itemTienda.articulo.id}.jpg"
                alt="..."
                class="img-fluid rounded-start img_producto"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title ">
                  ${itemTienda.articulo.nombre}</h5>
                <p class="card-text precio_card">
                  <b>${itemTienda.articulo.precio} $</b>
                </p>
                <div class="col-md-12 d-flex flex-row-reverse">
                  <a href="#!" class="btn btn-primary btnAgregarCarrito" data-id="${itemTienda.articulo.id}">Agregar al carrito</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  </div>`;
  }

  let botonesAgregar = document.getElementsByClassName("btnAgregarCarrito");

  for (let boton of botonesAgregar) {
    let idArticulo = boton.dataset.id;
    boton.addEventListener("click", function () {
      agregarCarrito(idArticulo);
    });
  }
}
