import { ordenarAlfabeticamente } from "../filtradoYOrden/filtradoYOrden.js";
import {crearProductoEnCarrito ,actualizarBotonCompra,actualizarSubtotal} from "../funcionesCarrito/funcionesCarrito.js";
/*
    Crea los divs para cada prenda, segun su id, con todos sus elementos correspondientes,
    nombre,precio,imagen y un boton para agregar al carrito de compras.
*/
function crearDivsIndumentaria(arrayIndumentaria,carrito){
    let galeria=document.querySelector("#galeria");
    galeria.style.opacity="1";
    for(let prenda of arrayIndumentaria){
        const{nombre,id,precio}=prenda;
        crearElementoDiv(id);
        agregarImagenJuego(id);
        agregarTituloJuego(id,nombre);
        agregarPrecioJuego(id,precio);
    }
    agregarBotonesComprar(arrayIndumentaria,carrito);

}
/*
    Crea un div cuyo id es el id del prenda que le corresponde.
*/
function crearElementoDiv(id){
    let galeria=document.getElementById("galeria");
    let divJuego=document.createElement("div");
    divJuego.className=("galeria__elemento");
    divJuego.setAttribute("id",id);
    galeria.appendChild(divJuego);
}
/*
    Agrega al div que tenga la id dada por parametro,el elemento img con la ruta
    de la imagen correspondiente y su clase.
*/
function agregarImagenJuego(id){
    let ruta=`./styles/img/${id}.jpg`;
    let imagen=document.createElement("img");
    imagen.setAttribute("src",ruta);
    imagen.className="galeria__elemento__img";
    document.getElementById((String(id))).append(imagen);
}
/*
    Agrega al div que tenga la id dada por parametro, el elemento h5 cuyo contenido es el
    nombre de prenda pasado por parametro con su clase.
*/
function agregarTituloJuego(id,nombre){
    let elementoNombre=document.createElement("H5");
    elementoNombre.innerText=nombre;
    elementoNombre.className="galeria__elemento__titulo";
    document.getElementById((String(id))).append(elementoNombre);
}
/*
    Agrega al div que tenga la id dada por parametro,el elemento h6 que va a mostrar
    el precio pasado por parametro, con la clase correspondiente
*/
function agregarPrecioJuego(id,precio){
    let cadenaPrecio=`$${precio}ARS`;
    let elementoPrecio=document.createElement("H6");
    elementoPrecio.innerText=cadenaPrecio;
    elementoPrecio.className="galeria__elemento__precio";
    document.getElementById((String(id))).append(elementoPrecio);
}
/*
    Crea todos los botones de compra de cada div y sus eventos correspondientes.
*/
function agregarBotonesComprar(arrayIndumentaria,carrito){
    for(let prenda of arrayIndumentaria){

        let idBoton=`${String(prenda.id)}_boton`;
        let boton=document.createElement("a");

        if(carrito.length>0){
            boton.innerText= (carrito.some(buscado=>buscado.id==prenda.id))?"EN EL CARRITO":"AGREGAR AL CARRITO";
        }else{
            boton.innerText="AGREGAR AL CARRITO";
        }
        boton.className="galeria__elemento__boton";
        boton.setAttribute("id",idBoton);

        boton.onclick=()=>{
            let prendaSeleccionado=(arrayIndumentaria.find(producto=>producto.id==(prenda.id)));
            let prendaEstaEnCarrito=carrito.some(buscado=>buscado.id==prenda.id);
            if(!prendaEstaEnCarrito){
                carrito.push(prendaSeleccionado);
                crearProductoEnCarrito(prendaSeleccionado,carrito);
                actualizarBotonCompra(prendaSeleccionado,carrito);
                actualizarSubtotal(carrito);
                mostrarToast("El producto ha sido agregado al carrito",true);
            }
            else{
               mostrarToast("El producto ya se encontraba agregado al carrito",false);
            }
        }
        document.getElementById((prenda.id)).append(boton);
    }
}
/*
    Crea y muestra un toast con el texto pasado por parametro.Si colorVerde es true,
    el toast tiene un fondo verde, si es false tiene un fondo rojo.
*/
function mostrarToast(texto,colorVerde){
    let color = colorVerde ? "linear-gradient(to right, #00b09b, #96c93d)":"linear-gradient(to right, rgb(169, 10, 10), red)";
    Toastify({
        text: texto,
        duration: 2000,
        position: 'left',
        style: {
             background: color,
          }
        }).showToast();
}
export {crearDivsIndumentaria,mostrarToast};