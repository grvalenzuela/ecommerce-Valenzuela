// Carga el carrito
let carrito = new Carrito();
carrito.items = JSON.parse(localStorage.getItem("carritoCompra"));

cargaProductos();

// CARGA HTML PRODUCTOS
function cargaProductos() {
  carritoSpan = document.getElementById("carrito-cant");
  carritoSpan.innerHTML = carrito.items.length;

  let contenedor = document.getElementById("contenedor-carrito");
  contenedor.innerHTML = "";

  for (let itemCarrito of carrito.items) {
    contenedor.innerHTML =
      contenedor.innerHTML +
      `<div
      class="
        d-flex
        flex-row
        justify-content-between
        align-items-center
        p-2
        card-item-carrito
        mt-4
        px-3
        rounded
      "
    >
      <div class="mr-1">
        <img
          class="rounded"
          src="../img/${itemCarrito.articulo.id}.jpg"
          width="70"
        />
      </div>
      <div class="d-flex flex-column align-items-center">
        <span class="font-weight-bold">${itemCarrito.articulo.nombre}</span>
        <div class="d-flex flex-row"></div>
      </div>
      <div
        class="
          d-flex
          flex-row
          align-items-center
          justify-content-center
          qty
        "
      >
        <i class="fa fa-minus text-danger"></i>
        <h5 class="text-grey me-1 ms-1 mt-1">1</h5>
        <i class="fa fa-plus text-success"></i>
      </div>
      <div>
        <h5 class="text-grey">$${itemCarrito.articulo.precio}</h5>
      </div>
      <a style="color: #f73015" href="#!" role="button" class="delete-item-carrito" data-id="${itemCarrito.articulo.id}">
        <i class="fas fa-trash-alt"></i>
      </a>
    </div>`;
  }

  let botonPagar = document.getElementById("btn-pagar");
  botonPagar.addEventListener("click", function () {
    procesarPago();
  });

  let botonesAgregar = document.getElementsByClassName("delete-item-carrito");

  for (let boton of botonesAgregar) {
    let idArticulo = boton.dataset.id;
    boton.addEventListener("click", function () {
      borrarItem(idArticulo);
    });
  }
}

function borrarItem(idArticulo) {
  carrito.eliminarProductoCarrito(idArticulo);
  storageCarrito();
  cargaProductos();
}

// procesa pago (al aceptar se entiende como pago), limpia html y carrito
function procesarPago() {
  carrito.calcularTotalCarrito();
  alert("El total a pagar es: " + carrito.precioTotal);
  //se guardan las ganancias del local en el dia podria ser util en un furturo
  //gananciasDia += carrito.precioTotal;

  carrito.items = [];

  carritoSpan = document.getElementById("carrito-cant");
  carritoSpan.innerHTML = 0;

  localStorage.removeItem("carritoCompra");

  window.location.replace("../index.html");
}

function storageCarrito() {
  localStorage.removeItem("carritoCompra");
  localStorage.setItem("carritoCompra", JSON.stringify(carrito.items));
}
