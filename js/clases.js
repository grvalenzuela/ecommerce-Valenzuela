/* ------ CLASES ------ */
class Articulo {
  constructor(id, nombre, precio, marca, compatible, tipo) {
    this.id = id;
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.marca = marca;
    this.compatible = compatible;
    this.tipo = tipo;
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

  eliminarProductoCarrito(idArticulo) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].articulo.id == idArticulo) {
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

  precioItem() {
    return this.cantidad * this.articulo.precio;
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
