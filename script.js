// Lista para almacenar los artículos
let articles = [];

// Función para mostrar los artículos en la página
function displayArticles() {
    const articlesContainer = document.getElementById("articles");

    if (articles.length === 0) {
        articlesContainer.classList.add("hidden"); // Oculta el contenedor si no hay artículos
    } else {
        articlesContainer.classList.remove("hidden"); // Muestra el contenedor si hay artículos
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
}

// Función para capturar un nuevo artículo
function addArticle(title, image, description, author, date) {
    const newArticle = { title, image, description, author, date };
    articles.push(newArticle); // Agrega el artículo al array
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
