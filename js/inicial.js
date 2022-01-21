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
  $.getJSON("data.json", function (data) {
    tienda.articulos = data;
    // tienda.traerCompatible("AMD", "Procesador");
    // tienda.articulos = $.grep(tienda.articulos, function (n, i) {
    //   return n.articulo.compatible == "AMD" || n.articulo.compatible == "";
    // });
    cargaProductos();
  });
}

// Agrega al carrito el item seleccionado
function agregarCarrito(id) {
  let itemTienda = tienda.encontrarProductoPorIdEnTienda(id);

  let itemCarrito = carrito.encontrarProductoPorIdEncarrito(id);
  if (itemCarrito != null) {
    carrito.subirCantidadProducto(id);
  } else {
    carrito.agregarProductoCarrito(new ItemCarrito(itemTienda.articulo));
  }

  tienda.reducirStock(id);

  procesarCarrito();
}

// procesa el agregado al carrito
function procesarCarrito() {
  carritoSpan = $("#carrito-cant");
  carritoSpan.html(carrito.items.length);

  storageCarrito();
}

function storageCarrito() {
  localStorage.removeItem("carritoCompra");
  localStorage.setItem("carritoCompra", JSON.stringify(carrito.items));
}

// CARGA HTML PRODUCTOS
function cargaProductos() {
  carritoSpan = $("#carrito-cant");
  carritoSpan.html(carrito.items.length);

  let contenedor = $("#contenedorProductos");

  for (let itemTienda of tienda.articulos) {
    contenedor.append(
      `<div class="row d-flex justify-content-center">
    <div class="col-12 col-md-12 d-flex justify-content-center card_producto  p-3">

      <div class="card" style="max-height: 250px; min-width: 706px; min-height: 182px">
          <div class="row d-flex align-items-center ">
            <div class="col-md-4 img_container">
              <img
                src="img/productos/${itemTienda.articulo.id}.jpg"
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
  </div>`
    );
  }

  let botonesAgregar = $(".btnAgregarCarrito");

  botonesAgregar.each(function (i) {
    let idArticulo = $(this).data("id");
    $(this).on("click", function () {
      agregarCarrito(idArticulo);
    });
  });

  // for (let boton of botonesAgregar) {
  //   let idArticulo = boton.dataset.id;
  //   boton.bind("click", function () {
  //     agregarCarrito(idArticulo);
  //   });
  // }
}
