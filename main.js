const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const vaciarCarrito = document.querySelector("#vaciar-carrito");


const cargarProductos = () => {
    fetch("./data/productos.json") 
        .then(response => response.json())
        .then(data => {
            productos = data; 
            renderizarProductos();
        })
       .catch(error => console.error('Error al cargar productos:', error));
};


const renderizarProductos = () => {
    contenedorProductos.innerHTML = ''; 
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
            agregarAlCarrito(producto);
        });

        div.append(button);
        contenedorProductos.append(div);
    });
};


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
        vaciarCarrito.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        vaciarCarrito.classList.remove("d-none");

        carritoProductos.innerHTML = "";
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
            });
            div.append(button);
            carritoProductos.append(div);
        });
    }
    actualizarTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function borrarDelCarrito(producto) {
    Swal.fire({
        title: "¿Estás seguro de eliminar este producto del carrito?",
        text: "Este producto será eliminado del carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
          
            const indice = carrito.findIndex((item) => item.id === producto.id);
            if (indice !== -1) {
                carrito.splice(indice, 1); 
                actualizarCarrito(); 

              
                Swal.fire({
                    icon: "success",
                    title: "Producto eliminado",
                    text: "El producto ha sido eliminado del carrito.",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }
    });
}





function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
        carritoTotal.innerText = "$" + total;

    }


vaciarCarrito.addEventListener("click", () => {
    const cantidadTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    Swal.fire({
        title: "¿Estás seguro de vaciar el carrito?",
        text: "Se van a eliminar " + cantidadTotal + " productos.",
        icon: "question",
        showDenyButton: true,
        denyButtonText: "No",
        confirmButtonText: "Sí"
    })
    .then((result) => {
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
    });
});


cargarProductos();

