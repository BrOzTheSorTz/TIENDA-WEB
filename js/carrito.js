let productosEnCarrito = localStorage.getItem("productosEnCarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector(".carrito-vacio");
const contenedorCarritoProductos = document.querySelector(".carrito-productos");
const contenedorCarritoAcciones = document.querySelector(".carrito-acciones");
const contenedorCarritoComprado = document.querySelector(".carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
let botonVaciar = document.querySelector(".carrito-acciones-vaciar");
let precioTotal = document.querySelector("#total");
let botonComprar = document.querySelector(".carrito-acciones-comprar");

function cargarCarrito(){
    if(productosEnCarrito && productosEnCarrito.length >0 ){


        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
        let precio = 0;
        productosEnCarrito.forEach(producto => {
            
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML=`
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small> 
                <p>${producto.cantidad}</p>
            </div>
    
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
    
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button id="${producto.id}" class="carrito-producto-eliminar"><i class="bi bi-trash"></i></button>
        
            `;
            precio = precio +producto.precio * producto.cantidad
            contenedorCarritoProductos.appendChild(div);

            actualizarBotonesEliminar();
            
        });
        precioTotal.innerHTML = precio;
    
    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
       
    
    }
    
}

cargarCarrito();
actualizarBotonesEliminar();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click",eliminarProducto);
    });
}

function eliminarProducto(e){
    const idProducto = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idProducto);


    productosEnCarrito.splice(index,1);

    cargarCarrito();
    // We save the new data in the local space
    localStorage.setItem("productosEnCarrito",JSON.stringify(productosEnCarrito));

}
botonVaciar.addEventListener("click",vaciarCarrito);
function vaciarCarrito(){
    productosEnCarrito.splice(0,productosEnCarrito.length);
    localStorage.setItem("productosEnCarrito",JSON.stringify(productosEnCarrito));
    cargarCarrito();
}

botonComprar.addEventListener("click",realizarCompra);
function realizarCompra(){
    productosEnCarrito.splice(0,productosEnCarrito.length);
    localStorage.setItem("productosEnCarrito",JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

    

}