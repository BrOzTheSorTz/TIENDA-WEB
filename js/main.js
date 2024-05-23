// PRODUCTOS
let productos = [];




const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorVerMas = document.getElementById("contenedor-ver-mas");
const botonesCategorias = document.querySelectorAll(".boton-categorias");  // Array con todos los botones cuya class es boton-categorias
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const buscador = document.getElementById("buscador");
const buscador_div = document.getElementById("buscador_div");
const btnBuscar = document.getElementById("btnBuscar");
let botonesVerMas = document.querySelectorAll(".ver-mas");

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(contenedorProductos,productos);
    })

function cargarProductos(contenedorProductos,productosElegidos){
    
    contenedorProductos.innerHTML = "";
    contenedorVerMas.innerHTML = "";
    
    productosElegidos.forEach(producto=>{
        const div = document.createElement("div");
        
        
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
                <button class="ver-mas" id="${producto.id}">Ver más</button>

            </div>`;
        
        contenedorProductos.appendChild(div);
        /*
        <div class="producto">
            <img class="producto-imagen" src="./img/abrigos/01.jpg" alt="">
            <div class="producto-detalles">
                <h3 class="producto-titulo">Abrigo 01</h3>
                <p class="producto-precio">100$</p>
                <button class="producto-agregar">Agregar</button>
            </div>
        </div>
        */ 
        



    })
    actualizarBotonesAgregar();
    actualizarBotonesVerMas();


}
function actualizarBotonesVerMas(){
    botonesVerMas = document.querySelectorAll(".ver-mas");

    botonesVerMas.forEach(boton =>{
        boton.addEventListener("click",verMasProducto);
    });
}

function verMasProducto(e){
    const producto = productos.find(producto => producto.id === e.currentTarget.id);
    tituloPrincipal.innerText = "Información "+ e.currentTarget.id;
    buscador_div.classList.add("disabled");
    contenedorProductos.innerHTML = "";
    contenedorVerMas.innerHTML = "";

    const div = document.createElement("div");
        
        div.classList.add("info");
        div.innerHTML = `
        <div class="cabecera-info">
        <img class="info-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="info-derecha">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio} euros</p>
        </div>
        
    </div>
    <div class="main-info">
        <h3>Información adicional:</h3>
        <p>${producto.descripcion}</p>
    </div>
    <button class="producto-agregar producto-agregar-mas" id="${producto.id}">Agregar</button>`;
        
    contenedorVerMas.appendChild(div);
    actualizarBotonesAgregar();

}
function actualizarNumerito(){

    let nuevoNumero = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad,0);
    numerito.innerText = nuevoNumero;

}

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click",agregarAlCarrito);
    });
}
let productosEnCarrito;
const productosEnCarritoLS = localStorage.getItem("productosEnCarrito");
if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}


function agregarAlCarrito(e){
    const idProducto = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idProducto);
    
    if(!productosEnCarrito.some(producto => producto.id === idProducto)){
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }else{
        const indexProducto = productosEnCarrito.findIndex(producto => producto.id === idProducto);
        productosEnCarrito[indexProducto].cantidad++;
    }
    console.log(productosEnCarrito);

    actualizarNumerito();
    localStorage.setItem("productosEnCarrito",JSON.stringify(productosEnCarrito));
}

btnBuscar.addEventListener("click", function() {
    const textoBusqueda = buscador.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => producto.titulo.toLowerCase().includes(textoBusqueda));
    cargarProductos(contenedorProductos, productosFiltrados);
    buscador.value=""
});

document.addEventListener("DOMContentLoaded", function() {
    
    
    cargarProductos(contenedorProductos,productos);

    botonesCategorias.forEach(boton =>{
        boton.addEventListener("click",(e)=>{
            /* Para cada click en un boton de categoria
            hacemos lo siguiente; cambiar el active */
            botonesCategorias.forEach(boton => boton.classList.remove("active") );
            e.currentTarget.classList.add("active");

            if (e.currentTarget.id !== "todos") {
                tituloPrincipal.innerText = "Todos los "+ e.currentTarget.id;
                const productosElegidos = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                
                buscador_div.classList.add("disabled");
                
                cargarProductos(contenedorProductos,productosElegidos);    
            } else {
                tituloPrincipal.innerText = "Todos los productos :)";
                buscador_div.classList.remove("disabled");
                
                cargarProductos(contenedorProductos,productos);
            }
            

        })
    });

});
