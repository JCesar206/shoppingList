const CLAVE_LOCAL = "lista_compras";

document.addEventListener("DOMContentLoaded", () => {
    cargarListaDesdeStorage();
});

function agregarProducto() {
    const input = document.getElementById("productoInput");
    const texto = input.value.trim();

    if (texto === "") return;
    crearElementoLista(texto);
    guardarProductoEnStorage(texto);

    input.value = "";
    input.focus();
}

function crearElementoLista(texto, yaComprado = false) {
    const li = document.createElement("li");
    li.textContent = texto;

    if (yaComprado) {
        li.classList.add("comprado");
    }

    li.addEventListener("click", function() {
        li.classList.toggle("comprado");
        actualizarEstadoEnStorage(texto, li.classList.contains("comprado"));
    });

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
        eliminarDeStorage(texto);
    });
        li.appendChild(botonEliminar);
        document.getElementById("lista").appendChild(li);
    }   

    function guardarProductoEnStorage(producto) {
        const lista = obtenerListaStorage();
        lista.push({texto: producto, comprado: false});
        localStorage.setItem(CLAVE_LOCAL, JSON.stringify(lista));
    }
    
    function obtenerListaStorage() {
        const datos = localStorage.getItem(CLAVE_LOCAL);
        return datos ? JSON.parse(datos) : [];
    }

    function cargarListaDesdeStorage() {
        const lista = obtenerListaStorage();
        lista.forEach(item => crearElementoLista(item.texto, item.comprado));
    }

function eliminarDeStorage(producto) {
  let lista = obtenerListaStorage();
  lista = lista.filter(item => item.texto !== producto);
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(lista));
}

function actualizarEstadoEnStorage(producto, comprado) {
  const lista = obtenerListaStorage();
  const item = lista.find(item => item.texto === producto);
  if (item) {
    item.comprado = comprado;
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify(lista));
  }
}