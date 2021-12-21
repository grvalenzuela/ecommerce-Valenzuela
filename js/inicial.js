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
        550000,
        "EVGA",
        "",
        "PlacaVideo"
      ),
      15
    )
  );
  tienda.agregarProductoAStock(
    new ItemTienda(
      new Articulo(
        2,
        "Placa de Video PNY GeForce RTX 3060 Ti 8GB GDDR6 EPIC-X RGB Dual Fan LHR",
        220000,
        "PNY",
        "",
        "PlacaVideo"
      ),
      6
    )
  );
  tienda.agregarProductoAStock(
    new ItemTienda(
      new Articulo(
        3,
        "Placa de Video GeForce MSI GTX 1650 4GB GDDR5 Ventus XS OC",
        65000,
        "MSI",
        "",
        "PlacaVideo"
      ),
      10
    )
  );
  tienda.agregarProductoAStock(
    new ItemTienda(
      new Articulo(
        4,
        "Procesador AMD Ryzen 7 3700X 4.4GHz AM4 Wraith Prism RGB Led Cooler",
        46000,
        "AMD",
        "AMD",
        "Procesador"
      ),
      16
    )
  );
  tienda.agregarProductoAStock(
    new ItemTienda(
      new Articulo(
        5,
        "Procesador Intel Core i7 9700F 4.7Ghz Turbo 1151 Coffe Lake",
        34000,
        "Intel",
        "Intel",
        "Procesador"
      ),
      20
    )
  );
  tienda.agregarProductoAStock(
    new ItemTienda(
      new Articulo(
        6,
        "Mother Asus Prime A520M-K AM4",
        5000,
        "Asus",
        "AMD",
        "Motherboard"
      ),
      8
    )
  );
  tienda.agregarProductoAStock(
    new ItemTienda(
      new Articulo(
        7,
        "Mother Gigabyte B365M Gaming HD",
        7000,
        "Gigabyte",
        "Intel",
        "Motherboard"
      ),
      9
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
