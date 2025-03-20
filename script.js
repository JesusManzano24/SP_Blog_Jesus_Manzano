// Lista para almacenar los artículos
let articles = [];

// Función para cargar artículos desde LocalStorage
function loadArticles() {
    const storedArticles = localStorage.getItem("articles"); // Obtén los datos del almacenamiento
    if (storedArticles) {
        articles = JSON.parse(storedArticles); // Convierte los datos a un array
    } else {
        articles = []; // Si no hay datos, inicia con un array vacío
    }
}

// Función para guardar artículos en LocalStorage
function saveArticles() {
    localStorage.setItem("articles", JSON.stringify(articles)); // Guarda los datos como un string
}

// Función para mostrar los artículos en la página
function displayArticles() {
    const articlesContainer = document.getElementById("articles");
    const showFormButton = document.getElementById("showFormButton");

    if (articles.length === 0) {
        // Si no hay artículos, muestra un mensaje
        articlesContainer.innerHTML = "<p>No hay artículos disponibles. Haz clic en 'Agregar Artículo' para añadir uno.</p>";
    } else {
        articlesContainer.innerHTML = ""; // Limpia el contenedor antes de renderizar
        articles
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Ordena los artículos por fecha
            .forEach(article => {
                const articleCard = `
                    <div class="article-card">
                        <h2>${article.title}</h2>
                        <img src="${article.image}" alt="Imagen del artículo" style="max-width: 100%;">
                        <p>${article.description}</p>
                        <p><strong>Autor:</strong> ${article.author}</p>
                        <p><strong>Fecha:</strong> ${article.date}</p>
                    </div>
                `;
                articlesContainer.innerHTML += articleCard;
            });
    }

    // Asegura que el botón "Agregar Artículo" esté visible
    showFormButton.classList.remove("hidden");
}

// Función para capturar un nuevo artículo
function addArticle(title, image, description, author, date) {
    const newArticle = { title, image, description, author, date };
    articles.push(newArticle); // Agrega el artículo al array
    saveArticles(); // Guarda los artículos en LocalStorage
    displayArticles(); // Actualiza la vista
}

// Referencias a los botones y contenedores
const showFormButton = document.getElementById("showFormButton");
const formContainer = document.getElementById("formContainer");
const cancelFormButton = document.getElementById("cancelFormButton");

// Mostrar el formulario
showFormButton.addEventListener("click", () => {
    formContainer.style.display = "flex"; // Muestra el formulario
});

// Ocultar el formulario
cancelFormButton.addEventListener("click", () => {
    formContainer.style.display = "none"; // Oculta el formulario
});

// Detectar el envío del formulario
const form = document.getElementById("articleForm");
form.addEventListener("submit", event => {
    event.preventDefault(); // Evita que se recargue la página

    // Capturar los valores del formulario
    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;
    const author = document.getElementById("author").value;
    const date = new Date().toISOString().split("T")[0]; // Fecha actual

    // Agregar el artículo y actualizar la vista
    addArticle(title, image, description, author, date);
    form.reset(); // Limpia los campos del formulario
    formContainer.style.display = "none"; // Oculta el formulario
});

// Mostrar los artículos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadArticles(); // Carga los artículos desde LocalStorage
    formContainer.style.display = "none"; // Asegura que el formulario esté oculto al cargar
    displayArticles(); // Muestra los artículos (si los hay)
});
