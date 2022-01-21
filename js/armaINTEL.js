let tienda = new StockTienda();
let carrito = new Carrito();
let pcArmada = [];

cargaArticulos();

/* ----- FUNCIONES ----- */
function cargaArticulos() {
  $.getJSON("../../data.json", function (data) {
    tienda.articulos = data;
    tienda.traerCompatible("INTEL", "Procesador");
    // tienda.articulos = $.grep(tienda.articulos, function (n, i) {
    //   return n.articulo.compatible == "AMD" || n.articulo.compatible == "";
    // });
    cargaProductos("Procesador");
  });
}

// CARGA HTML PRODUCTOS
function cargaProductos(tituloParte) {
  let contenedor = $("#contenedorProductos");
  contenedor.html("");

  contenedor.append(`<div><h3>Seleccione ${tituloParte}</h3></div>`);
  for (let itemTienda of tienda.articulos) {
    contenedor.append(
      `<div class="row d-flex justify-content-center">
      <div class="col-12 col-md-12 d-flex justify-content-center card_producto  p-3">
  
        <div class="card" style="max-height: 250px; min-width: 706px; min-height: 182px">
            <div class="row d-flex align-items-center ">
              <div class="col-md-4 img_container">
                <img
                  src="../../img/productos/${itemTienda.articulo.id}.jpg"
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
                    <a href="#!" class="btn btn-rounded btn-info seleccionarArmar" data-id="${itemTienda.articulo.id}">Seleccionar</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </div>
    </div>`
    );
  }

  let botonesSeleccionar = $(".seleccionarArmar");

  botonesSeleccionar.each(function (i) {
    let idArticulo = $(this).data("id");
    $(this).on("click", function () {
      seleccion(idArticulo);
    });
  });
}

function procesarCarrito() {
  carritoSpan = $("#carrito-cant");
  carritoSpan.html(carrito.items.length);

  storageCarrito();
}

function storageCarrito() {
  localStorage.removeItem("carritoCompra");
  localStorage.setItem("carritoCompra", JSON.stringify(carrito.items));
}

function seleccion(idArticulo) {
  $.getJSON("../../data.json", function (data) {
    tienda.articulos = data;
    let articulo = tienda.encontrarProductoPorIdEnTienda(idArticulo).articulo;
    let itemCarrito = new ItemCarrito(articulo);

    carrito.agregarProductoCarrito(itemCarrito);

    switch (articulo.tipo) {
      case "Procesador":
        tienda.traerCompatible("INTEL", "Motherboard");
        cargaProductos("Motherboard");
        procesarCarrito();
        let imgProcesador = $("#img-procesador");
        imgProcesador.attr("src", "../../img/pc/procesador-a.png");
        break;
      case "Motherboard":
        tienda.traerCompatible("INTEL", "RAM");
        cargaProductos("RAM");
        procesarCarrito();
        let imgMother = $("#img-mother");
        imgMother.attr("src", "../../img/pc/mother-a.png");
        break;
      case "RAM":
        tienda.traerCompatible("INTEL", "SDD");
        cargaProductos("Disco Solido (SDD)");
        procesarCarrito();
        let imgRam = $("#img-ram");
        imgRam.attr("src", "../../img/pc/ram-a.png");
        break;
      case "SDD":
        tienda.traerCompatible("INTEL", "HDD");
        cargaProductos("Disco Rigido (HDD)");
        procesarCarrito();
        let imgSsd = $("#img-ssd");
        imgSsd.attr("src", "../../img/pc/ssd-a.png");
        break;
      case "HDD":
        tienda.traerCompatible("INTEL", "PlacaVideo");
        cargaProductos("Placa de Video");
        procesarCarrito();
        let imgHdd = $("#img-hdd");
        imgHdd.attr("src", "../../img/pc/hdd-a.png");
        break;
      case "PlacaVideo":
        tienda.traerCompatible("INTEL", "Fuente");
        cargaProductos("Fuente");
        procesarCarrito();
        let imgVideo = $("#img-video");
        imgVideo.attr("src", "../../img/pc/video-a.png");
        break;
      case "Fuente":
        tienda.traerCompatible("INTEL", "Gabinete");
        cargaProductos("Gabinete");
        procesarCarrito();
        let imgFuente = $("#img-fuente");
        imgFuente.attr("src", "../../img/pc/fuente-a.png");
        break;
      case "Gabinete":
        procesarCarrito();
        let imgGabinete = $("#img-gabinete");
        imgGabinete.attr("src", "../../img/pc/gabinete-a.png");
        break;
    }
  });
}
