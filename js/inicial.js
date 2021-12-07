/* ----- VARIABLES GLOBALES ----- */
var articulosCargados = [];
let tienda = new StockTienda();
let carrito = new Carrito();
if (localStorage.getItem("carritoCompra")) {
  carrito.items = JSON.parse(localStorage.getItem("carritoCompra"));
}

var gananciasDia = 0;

/* ----- Carga inicial de datos (simula Base de datos) ------ */
cargaArticulos();

/* ----- FUNCIONES ----- */
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
  carritoSpan = document.getElementById("carrito-cant");
  carritoSpan.innerHTML = carrito.items.length;

  storageCarrito();
}

function storageCarrito() {
  localStorage.removeItem("carritoCompra");
  localStorage.setItem("carritoCompra", JSON.stringify(carrito.items));
}

// CARGA HTML PRODUCTOS
function cargaProductos() {
  carritoSpan = document.getElementById("carrito-cant");
  carritoSpan.innerHTML = carrito.items.length;

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
                src="../img/${itemTienda.articulo.id}.jpg"
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
