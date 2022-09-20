// CALCULADOR DE HONORARIOS

const multiplicar = (num1, num2) => num1 * num2

const honorariosNuevo = (x) => x * .11

const honorariosReforma = (x) => x * .15

const calcularHonorarios = (tipoDeObra, computoMetrico, precioM) => {
    
    if (tipoDeObra === "nueva") { 
        const precioObra = multiplicar (precioM, computoMetrico)
        const resultado = honorariosNuevo (precioObra)
        return resultado
        }
    else if (tipoDeObra === "reforma") { 
            const precioObra = multiplicar (precioM, computoMetrico)
            const resultado = honorariosReforma (precioObra)
            return resultado
        }    
}        

const inputCumputo = document.getElementById('inp_computo')
const inputValor = document.getElementById('inp_valor')
const inputTipo = document.getElementById('inp_tipo')

const form = document.getElementById('formulario')

const resultadoHonorarios = document.getElementById("honorarios")

form.addEventListener ('submit', (event) => {
    event.preventDefault()
    const computo = inputCumputo.value
    const valor = inputValor.value
    const tipo = inputTipo.value

const resultado = calcularHonorarios (tipo, computo, valor)

resultadoHonorarios.innerText = "Los honorarios serian de " + resultado + "!!"
})

// MODAL PARA HONORARIOS

const modalContainer = document.getElementById("modal-container")
const modal = document.querySelector('#modal')
const abrirModal = document.querySelector('#modal-open')
const cerrarModal = document.querySelector('#modal-close')

abrirModal.addEventListener('click', () => {
    modalContainer.classList.add('modal-container-active')
})

cerrarModal.addEventListener('click', () => {
    modalContainer.classList.remove('modal-container-active')
})

modal.addEventListener('click', (event) => {
    event.stopPropagation()
})


// ------------    AQUI COMIENZA EL E-COMMERCE    ------------------
class products{
    constructor(id, product, cantidad, description, price, img){
        this.id = id,
        this.product = product,
        this.cantidad = cantidad,
        this.description = description,
        this.price = price,
        this.img = img
    }
}

const stock = []
fetch("data.json")
.then((resp) => resp.json())
.then((data) => {
    data.forEach ((post) => {
        let newProd = new products(post.id, post.product, post.cantidad, post.description, post.price, post.img)
        stock.push (newProd)
    })
    stock.forEach((prod)=>{
        let cardStock = document.createElement("div")
        cardStock.innerHTML = `<article class="card">
        <h2 class="card_title">${prod.product}</h2>
        <picture class="imgClass">
        <img class="card_img" src="${prod.img}" alt="">
        </picture>
        <p class="card_description">${prod.description}</p>
        <h4 class="card_price">$${prod.price}</h4>
        <button id="btnAdd${prod.id}" "class="card_button">Agregar<i class="fas fa-shopping-cart"></i></button>
        </article>`
        cardProduct.appendChild(cardStock)
        
        let addBtn = document.getElementById(`btnAdd${prod.id}`)

        addBtn.addEventListener("click", ()=> agregarAlCarrito(prod.id))
        })
})

let cardProduct = document.getElementById("card_style")

// COMIENZO A ARMAR EL CARRITO



let carrito = []

const actualizarCarrito = () => {
    cart.innerHTML = ""
    
        carrito.forEach((prod) => {
    
            let div = document.createElement("div")
            div.className = ('productoEnCarrito')
        div.innerHTML = `<article class="card">
        <h2 class="card_title">${prod.product}</h2>
        <h4 class="card_price">$${prod.price}</h4>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button id = "removeCarrito${prod.id}" class="fas fa-trash-alt">X</button>
        </article>`
        cart.appendChild(div)
    
        let addBtn = document.getElementById(`removeCarrito${prod.id}`)
    
    addBtn.addEventListener("click", ()=> eliminarDelCarrito(prod.id))
        })
        contadorCarrito.innerText = carrito.length
        precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.price*prod.cantidad, 0)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        
    }

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

const cart = document.getElementById("carrito")
const contadorCarrito = document.getElementById('contadorCarrito')
const textCart = document.querySelector('#totalCarrito')
const precioTotal = document.querySelector('#precioTotal')

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)
    if(existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
    
    const item = stock.find((prod) => prod.id === prodId)
    carrito.push(item)
    console.log(carrito)
}
    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    
    const existe = carrito.some (prod => prod.id === prodId)
    if(existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad = 1
            }
        })
    }
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}



// HIDE/SHOW STOCK DE PRODUCTOS

const btnShow = document.getElementById("btnShow")
btnShow.addEventListener("click", respuestaClick)
function respuestaClick () {
cardProduct.classList.toggle('btn_hide')
}


function vaciarCarrito () {
    carrito.length = 0
    actualizarCarrito()
}

// VACIAR CARRITO
// AGREGANDO SWEETALERT AL BOTON DE VACIAR CARRITO

const btnVac = document.getElementById("btn_vaciar")
btnVac.addEventListener('click', () => {
    Swal.fire({
        title: 'Seguro desea vaciar el carrito?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Borrado!',
            'Tu carrito ha sido vaciado.',
            'success'
          )
          vaciarCarrito ()
        }
      })
})

// COMPRAR FINAL

const modalContainer2 = document.getElementById("modal-container2")
const modal2 = document.querySelector('#modal2')
const abrirModalCompra = document.querySelector('#modal-open2')
const cerrarModal2 = document.querySelector('#modal-close2')
const form2 = document.getElementById('formulario2')

abrirModalCompra.addEventListener('click', () => {
    modalContainer2.classList.add('modal-container-active')
})

cerrarModal2.addEventListener('click', () => {
    modalContainer2.classList.remove('modal-container-active')
})

modal2.addEventListener('click', (event) => {
    event.stopPropagation()
})

form2.addEventListener ('submit', (event) => {
    event.preventDefault()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra Aprobada',
        showConfirmButton: false,
        timer: 1500
      })
      modalContainer2.classList.remove('modal-container-active')
      })


// DARK MODE


let darkModeLS = localStorage.getItem('dark')

// APLICO OPERADOR LOGICO AND

darkModeLS === "true" && document.body.classList.add('dark'), document.body.classList.remove('fondoImg')

const btnDarkMode = document.querySelector('#dark-mode')

btnDarkMode.addEventListener('click', () => {
    
    let darkMode = localStorage.getItem('dark')

// APLICO OPERADOR

    if (darkMode === "true") {
        document.body.classList.remove('dark')
        document.body.classList.add('fondoImg')
        localStorage.setItem('dark', false)
    } else {        
        document.body.classList.add('dark')
        document.body.classList.remove('fondoImg')
        localStorage.setItem('dark', true)
    }
})


// CARROUSELL

let imagenes = ['./img/imagenesSlider/baseVariosProyectos.jpg','./img/imagenesSlider/cubo1.jpg','./img/imagenesSlider/work1.jpg','./img/imagenesSlider/mirador1.jpg'];
let contador = 0;

function carrousel(direccion) {
let direccion1 = direccion;

if(direccion1=='atras'){
  if(contador==0){
    document.getElementById('imagen').src= imagenes[imagenes.length-1];
    contador++;
  }else if (contador<imagenes.length-1) {
    document.getElementById('imagen').src= imagenes[imagenes.length-1-contador];
    contador++;

  }else {
    document.getElementById('imagen').src= imagenes[0];
    contador=0;
  }
}

if(direccion1=='adelante'){
  if(contador==0){
    document.getElementById('imagen').src= imagenes[0];
    contador++;
  }else if (contador<imagenes.length-1) {
    document.getElementById('imagen').src= imagenes[contador];
    contador++;

  }else {
    document.getElementById('imagen').src= imagenes[imagenes.length-1];
    contador=0;
  }
}}