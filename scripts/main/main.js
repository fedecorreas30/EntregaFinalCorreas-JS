import { arrayIndumentariaInicial } from "../baseDeDatos/baseDatos.js";
import { setearEstadoCarrito,crearProductoEnCarrito ,actualizarBotonCompra,actualizarSubtotal} from "../funcionesCarrito/funcionesCarrito.js";
import {crearDivsIndumentaria} from "../funcionesGaleriaIndumentaria/funcionesGaleria.js";
import {agregarEventoGenero, arrayIndumentaria,agregarEventoReestablecer, agregarEventoOrdenar, ordenarAlfabeticamente} from "../filtradoYOrden/filtradoYOrden.js";
let carrito=[];
let carritoEnLS=localStorage.getItem('Carrito');
if(carritoEnLS){
    carrito=JSON.parse(carritoEnLS);
}
function agregarReproduccionAutomaticaVideo(){
    let body=document.getElementById("body");
    let video=document.getElementById("video");
    video.play();
    body.onscroll=()=>{
        if(window.scrollY<150){
            video.play();
        }
    }
}


agregarReproduccionAutomaticaVideo();
setearEstadoCarrito(carrito,arrayIndumentaria);
crearDivsIndumentaria(arrayIndumentaria,carrito);
agregarEventoGenero(carrito);
agregarEventoReestablecer(carrito);
agregarEventoOrdenar(carrito);



for(let producto of carrito){
    crearProductoEnCarrito(producto,carrito);
    actualizarBotonCompra(producto,carrito);
    actualizarSubtotal(carrito);
}