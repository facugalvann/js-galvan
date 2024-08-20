const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const productos = [
    {
        id: "Aj1-phantom",
        titulo: "Aj1 Phantom",
        precio: 3000,
        img: "./assets/aj-travis.avif",
    },
    {
        id: "Aj1-panda",
        titulo: "Aj1 Panda",
        precio: 3000,
        img: "./assets/aj1-byw.avif",
    },
    {
        id: "Aj1-travis",
        titulo: "Aj1 Travis",
        precio: 3000,
        img: "./assets/aj1-travis.avif",

    },
    {
        id: "Retro-4-insustrial-blue",
        titulo: "Retro 4 industrial blue",
        precio: 3000,
        img: "./assets/retro4-industrial-blue.avif"
    },
    {
        id: "Remera-anti-social-negra",
        titulo: "Remera anti social-negra",
        precio: 3000,
        img: "./assets/remera-anti-social-negro-y-rosa.avif",
    },
    {
        id: "Remera=anti-social",
        titulo: "Remera anti social",
        precio: 3000,
        img: "./assets/remera-anti-social.avif",
    },

    {
        id: "Remera-essentials-blanca",
        titulo: "Remera essentials",
        precio: 3000,
        img: "./assets/remera-essentials-bca.avif",
    },


    {
        id: "Remera-essentials",
        titulo: "Remera essentials",
        precio: 3000,
        img: "./assets/remera-essentials-gris.webp",
    },
    {
        id: "Aj1-concord",
        titulo: "Aj1 concord",
        precio: 3000,
        img: "./assets/aj1-concord.avif",
    },


    {
        id: "Aj1-court-purple",
        titulo: "Aj1 court purple",
        precio: 3000,
        img: "./assets/aj1-court-purple.avif",
    },
    {
        id: "Retro-4-red-cement",
        titulo: "Retro 4 red cement",
        precio: 3000,
        img: "./assets/retro4-blanca-y-roja.avif",
    },


    {
        id: "Aj1-chicago",
        titulo: "Jordan 1 chicago",
        precio: 3000,
        img: "./assets/jordan1-chicago.avif",
    },
];








const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const vaciarCarrito = document.querySelector("#vaciar-carrito");



productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
     <img class="producto-img" src="${producto.img}" alt="">
    <h5>${producto.titulo}</h5>
    <p>$${producto.precio}</p>
    
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto)
    })

    div.append(button);
    contenedorProductos.append(div);
})



const agregarAlCarrito = (producto) => {
    let productoEnCarrito = carrito.find((item) => item.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();

    Toastify({
        text: "Agregaste " + producto.titulo,
        avatar: producto.img,
        duration: 1500,
        close: true,
        style: {
            background: "red",
            color: "white"
        },
    }).showToast();
}
function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        vaciarCarrito.classList.add("d-none")
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        vaciarCarrito.classList.remove("d-none")

        carritoProductos.innerHTML = ""
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = ` 
                        <h3>${producto.titulo}</h3>
                        <p>$${producto.precio}</p>
                        <p>${producto.cantidad}</p>
                        <p>$${producto.cantidad * producto.precio}</p>
            `;

            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");
            button.innerText = "❌";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            })
            div.append(button);
            carritoProductos.append(div);
        })
    }
    actualizarTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}
actualizarCarrito();

function borrarDelCarrito(producto) {
    const indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = "$" + total;

}
vaciarCarrito.addEventListener("click", () => {
    const cantidadTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    swal.fire({
        title: "¿Estas seguro de vaciar el carrito?",
        text: "se van a eliminar " + cantidadTotal + " productos.",
        icon: "question",
        showDenyButton: true,
        denyBruttonText: "no",
        confirmButtonText: "si"
    }).then((result) => {

        if (result.isConfirmed) {
            carrito.length = 0;
            actualizarCarrito();
            Swal.fire({
                icon: "success",
                title: "Vaciaste tu carrito",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
})
