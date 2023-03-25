import { arrayIndumentariaInicial} from "../baseDeDatos/baseDatos.js";
import {crearDivsIndumentaria} from "../funcionesGaleriaIndumentaria/funcionesGaleria.js";
import {actualizarBotonCompra} from "../funcionesCarrito/funcionesCarrito.js";
let arrayIndumentaria=arrayIndumentariaInicial;
/*
    Funcion que elimina todos los divs presentes de prendas en la galeria, los que esten en
    el "arrayIndumentaria".
*/
function eliminarDivsIndumentaria(){
    for(let prendaBuscado of arrayIndumentaria){
        let divBuscado=document.getElementById(prendaBuscado.id);
        divBuscado.remove();
    }
}
/*
    Agrega el evento de enviar al formulario que filtra los productos por genero.
*/
function agregarEventoGenero(carrito){
    let boton=document.getElementById("filtrar");
    boton.onclick=(e)=>{
        let formulario=document.getElementById("formulario");
        let form= new FormData(formulario);
        e.preventDefault();
        let generoSeleccionado=(form.get("genero"));
        if(generoSeleccionado!=null){
            let galeria=document.querySelector("#galeria");
            galeria.style.opacity="0";
            setTimeout(filtrarPorGenero,800,generoSeleccionado,carrito);
        }
    }
}
/*
    Realiza la accion de crear un nuevo array solo con prendas del genero recibido por parametro
*/
function filtrarPorGenero(genero,carrito){
    let nuevoArray=arrayIndumentariaInicial.filter(prenda=>prenda.genero==genero);
    eliminarDivsIndumentaria();
    arrayIndumentaria=nuevoArray;
    crearDivsIndumentaria(nuevoArray,carrito);
    actualizarTodosLosBotones(nuevoArray,carrito);
}
/*
    Agrega el evento para reestablecer los prendas sin ningun filtro.
*/
function agregarEventoReestablecer(carrito){
    let botonReset=document.getElementById("reestablecer");
    botonReset.onclick=()=>{
        let galeria=document.querySelector("#galeria");
        galeria.style.opacity="0";
        setTimeout(function(){
            eliminarDivsIndumentaria();
            arrayIndumentaria=arrayIndumentariaInicial;
            crearDivsIndumentaria(arrayIndumentariaInicial,carrito);
            actualizarTodosLosBotones(arrayIndumentariaInicial,carrito);
        },700);
    }
}
/*
    Actualiza todos los botones de compra segun el carrito, o sea que va a decir "AGREGAR AL CARRITO"
    si no está, o "EN EL CARRITO" si está.
*/
function actualizarTodosLosBotones(cualquierArrayIndumentaria,carrito){
    for (let prenda of cualquierArrayIndumentaria){
        actualizarBotonCompra(prenda,carrito);
    }

}
/*
    Agrega al boton de ordenar, el evento correspondiente para que pueda realizar dicha accion.
*/
function agregarEventoOrdenar(carrito){
    let botonOrdenar=document.getElementById("ordenar");
    botonOrdenar.onclick=(e)=>{
        e.preventDefault();
        let galeria=document.querySelector("#galeria");
        galeria.style.opacity="0";
        let orden=document.getElementById("select-orden").value;
       setTimeout(function(){
        switch(orden){
            case "Menor a mayor precio":
                ordenarMenorAMayor(carrito);
                break;
            case "Mayor a menor precio":
                ordenarMayorAMenor(carrito);
                break;
            case "Alfabéticamente":
                ordenarAlfabeticamente(carrito);
                break;
        }
       },800);
    }
}
/*
    Utiliza arrayIndumentaria para ordenar por precio los prendas , de MENOR a MAYOR precio.
*/
function ordenarMenorAMayor(carrito){
    let nuevoArray=arrayIndumentaria;
    eliminarDivsIndumentaria();
    nuevoArray.sort((a,b)=>a.precio- b.precio);
    crearDivsIndumentaria(nuevoArray,carrito);
    actualizarTodosLosBotones(nuevoArray,carrito);

}
/*
    Utiliza arrayIndumentaria para ordenar por precio los prendas , de MAYOR a MENOR precio.
*/
function ordenarMayorAMenor(carrito){
    let nuevoArray=arrayIndumentaria;
    eliminarDivsIndumentaria();
    nuevoArray.sort((a,b)=>b.precio-a.precio);
    crearDivsIndumentaria(nuevoArray,carrito);
    actualizarTodosLosBotones(nuevoArray,carrito);
}
/*
    Funcion auxiliar para ordenar por nombre los prendas.
*/
function SortArray(a,b){
    return a.nombre.localeCompare(b.nombre);
}
/*
    Utiliza arrayIndumentaria para ordenar por orden alfabetico los prendas.
*/
function ordenarAlfabeticamente(carrito){
    let nuevoArray=arrayIndumentaria;
    eliminarDivsIndumentaria();
    nuevoArray=nuevoArray.sort(SortArray);
    crearDivsIndumentaria(nuevoArray,carrito);

    actualizarTodosLosBotones(nuevoArray,carrito);
}
export {agregarEventoGenero,agregarEventoReestablecer,agregarEventoOrdenar,ordenarAlfabeticamente,arrayIndumentaria};