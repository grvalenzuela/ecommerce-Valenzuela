// Carga el carrito
let carrito = new Carrito();
carrito.items = JSON.parse(localStorage.getItem("carritoCompra"));

cargaProductos();

// CARGA HTML PRODUCTOS
function cargaProductos() {
  carritoSpan = $("#carrito-cant");
  carritoSpan.html(carrito.items.length);

  let contenedor = $("#contenedor-carrito");
  contenedor.html("");

  for (let itemCarrito of carrito.items) {
    contenedor.append(
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
          src="../img/productos/${itemCarrito.articulo.id}.jpg"
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
        <h5 class="text-grey me-1 ms-1 mt-1">${itemCarrito.cantidad}</h5>
        <i class="fa fa-plus text-success"></i>
      </div>
      <div>
        <h5 class="text-grey">$${itemCarrito.articulo.precio}</h5>
      </div>
      <a style="color: #f73015" href="#!" role="button" class="delete-item-carrito" data-id="${itemCarrito.articulo.id}">
        <i class="fas fa-trash-alt"></i>
      </a>
    </div>`
    );
  }

  let botonPagar = $("#btn-pagar");
  botonPagar.on("click", function () {
    procesarPago();
  });

  let botonDescuento = $("#btn-descuento");
  botonDescuento.on("click", function () {
    aplicarDescuento();
  });

  let botonesAgregar = $(".delete-item-carrito");

  botonesAgregar.each(function (i) {
    let idArticulo = $(this).data("id");
    $(this).on("click", function () {
      borrarItem(idArticulo);
    });

    carrito.calcularTotalCarrito();
  });

  // for (let boton of botonesAgregar) {
  //   let idArticulo = boton.dataset.id;
  //   boton.addEventListener("click", function () {
  //     borrarItem(idArticulo);
  //   });
  // }
}

function borrarItem(idArticulo) {
  carrito.eliminarProductoCarrito(idArticulo);
  storageCarrito();
  cargaProductos();
}

// procesa pago (al aceptar se entiende como pago), limpia html y carrito
function procesarPago() {
  //alert("El total a pagar es: " + carrito.precioTotal);
  //se guardan las ganancias del local en el dia podria ser util en un furturo
  //gananciasDia += carrito.precioTotal;

  let seccionPago = $("#seccionPago");
  seccionPago.append(`
              <div class="d-flex flex-row align-items-center mt-3 p-2">
                <div class="col-md-8">
                  <h5>
                    El total a pagar es:
                    <span class="text-success">${carrito.precioTotal}$</span>
                  </h5>
                </div>
                <div class="col-md-4">
                  <button
                    class="btn btn-success btn-block justify-content-end"
                    id="btn-confirmar"
                    type="button"
                  >
                    Confirmnar
                  </button>
                  <button
                    class="btn btn-danger btn-block justify-content-end"
                    id="btn-cancelar"
                    type="button"
                  >
                    Cancelar
                  </button>
                </div>
              </div>`);

  let botonConfirmar = $("#btn-confirmar");
  botonConfirmar.on("click", function () {
    confirmarPago();
  });

  let botonCancelar = $("#btn-cancelar");
  botonCancelar.on("click", function () {
    cancelarPago();
  });
}

function cancelarPago() {
  window.location.replace("../index.html");
}

function confirmarPago() {
  carrito.items = [];

  carritoSpan = $("#carrito-cant");
  carritoSpan.html(0);

  localStorage.removeItem("carritoCompra");

  window.location.replace("../index.html");
}

function storageCarrito() {
  localStorage.removeItem("carritoCompra");
  localStorage.setItem("carritoCompra", JSON.stringify(carrito.items));
}

function aplicarDescuento() {
  let codigo = $("#codigo-descuento").val();

  if (codigo == "Desc20") {
    carrito.aplicarDescuento(20);
    hmtlDescuento(20);
  } else if (codigo == "Desc10") {
    carrito.aplicarDescuento(10);
    hmtlDescuento(10);
  } else {
  }
}

function hmtlDescuento(descuento) {
  let contenedor = $("#contenedor-carrito");

  let htmlDescuento = `<div
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
  style="display: none;"
>
  <div class="mr-1">
    <img
      class="rounded"
      src="../img/descuento-${descuento}.png"
      width="70"
    />
  </div>
  <div class="d-flex flex-column align-items-center">
    <span class="font-weight-bold">Descuento del ${descuento}%</span>
    <div class="d-flex flex-row"></div>
  </div>
</div>`;

  $(htmlDescuento).hide().appendTo("#contenedor-carrito").fadeIn(1000);
}
