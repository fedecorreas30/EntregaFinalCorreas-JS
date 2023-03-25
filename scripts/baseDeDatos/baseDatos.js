const obtenerIndumentaria = async () => {
    const response = await fetch('scripts/baseDeDatos/stock.json');
    let prendas = await response.json();
    return prendas;
};
let arrayIndumentariaInicial=(await obtenerIndumentaria());

export{arrayIndumentariaInicial};

