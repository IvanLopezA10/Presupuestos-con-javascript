const ingresos = [
    new Ingreso('salario', 2200),
    new Ingreso('Venta coche',1500)
];

const egresos =[
    new Egreso('Renta Departamento', 900),
    new Egreso('Ropa',600)
];

const cargarApp =()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

const totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

const totalEgresos =()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

const cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.querySelector('#presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.querySelector('#porcentaje').innerHTML = formatoPorcentaje (porcentajeEgreso);
    document.querySelector('#ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.querySelector('#egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor)=>{
   return valor.toLocaleString('es-MX',{style:'currency', currency:'MXN', minimunFraccionDigits:2});
}

const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('es-mx',{style:'percent',minimunFraccionDigits:2});
}

const cargarIngresos =()=>{
    let ingresosHTML = "";
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.querySelector('#lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML =(ingreso)=>{
    let ingresosHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name='close-circle-outline'
                    onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresosHTML;
}

const eliminarIngreso =(id)=>{
   let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
   ingresos.splice(indiceEliminar, 1);
   cargarCabecero();
   cargarIngresos();
}

const cargarEgresos = ()=> {
    let egresosHTML = "";
    for(let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.querySelector('#lista-egresos').innerHTML = egresosHTML;
    
}

const crearEgresosHTML = (egreso) =>{
    let egresosHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje (egreso.valor /totalEgresos())}</div>
            <div class="elemento_eliminar">
                 <button class="elemento_eliminar--btn">
                    <ion-icon name='close-circle-outline'
                    onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return egresosHTML;
}

const eliminarEgreso =(id)=>{
    let indiceEliminar = ingresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
 }

const btnAgregarDatos = document.querySelector('#btn-agregar');
btnAgregarDatos.addEventListener('click', agregarDatos =()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso (descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }else if (tipo.value === 'egreso'){
            egresos.push( new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
});
