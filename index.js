let link = "https://giant-breezy-duck.glitch.me/book.json";
let bookData = [];
let currentPage = 1;
const itemsPerPage = 1;


fetch(link)
    .then(response => response.json())
    .then(data => {
        bookData = data; 
        displayPage(1, bookData);
    })
    .catch(error => console.error('Error:', error));

function displayPage(page, data) {
    let displayDiv = document.getElementById("display_data");
    displayDiv.innerHTML = "";

    if (data.length === 0) {
        displayDiv.innerHTML = "<p>No books found</p>";
        return;
    }

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedData = data.slice(start,end);
     

    // using foreach=================================
    paginatedData.forEach(elem => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src", elem.image);

        let title = document.createElement("p");
        title.innerText = elem.title;

        let price = document.createElement("h4");
        price.innerText = "Rs: " + elem.price;

        let author = document.createElement("p");
        author.innerText = "Author: " + elem.author;

        div.append(img, title, price, author);
        displayDiv.append(div);
    });
}

// Function to handle nxt page================================================== 
document.getElementById("nxt").addEventListener("click", () => {
    let totalPages = Math.ceil(bookData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage, bookData);
    }
});

// Function to handle pre page ================================================
document.getElementById("pre").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage, bookData);
    }
});

// Srh===========================================================
function searchBooks() {
    console.log("Searching...");
    let query = document.getElementById("ipt").value.toLowerCase();

    if (!query) {
        alert("Please type anything");
        return;
    }

    let filteredData = bookData.filter(book => book.title.toLowerCase().includes(query));
    currentPage = 1; // Reset to first page
    displayPage(currentPage, filteredData);
}



document.getElementById("bttn").addEventListener("click", searchBooks);

