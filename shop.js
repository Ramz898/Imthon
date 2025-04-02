document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-list");
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("category-filter");
    const sortFilter = document.getElementById("sort-filter");
    const cartContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPriceElement = document.getElementById("total-price");
    const orderButton = document.getElementById("order-button");

    let products = [
        { title: "Yotoqxona to‘plami", price: 5000, category: "yotoqxona", image: "pic/download.jpg" },
        { title: "Zamonaviy divan", price: 750, category: "divan", image: "pic/shopping-1.webp" },
        { title: "Stul", price: 500, category: "stul", image: "pic/shopping2.webp" },
        { title: "Divan", price: 750, category: "divan", image: "pic/download3.jpg" },
        { title: "Divan", price: 1200, category: "divan", image: "pic/ dadada3.jpg" },
        { title: "Stul", price: 450, category: "stul", image: "pic/shopping-2.webp" },
        { title: "Yotoqxona to‘plami", price: 6000, category: "Yotoqxona to‘plami", image: "pic/download-1.jpg" },
        { title: "tummochka", price: 200, category: "tummochka", image: "pic/download-2.jpg" },
        


        { title: "Stol", price: 700, category: "stol", image: "pic/download-3.jpg" },
        { title: "Yotoqxona to‘plami", price: 8000, category: "yotoqxona", image: "pic/download-5.jpg" },
        { title: "Stol", price: 900, category: "stol", image: "pic/download-4.jpg" },
        { title: "Divan", price: 2000, category: "divan", image: "pic/download-6.jpg" },
        { title: "Stul", price: 200, category: "stul", image: "pic/download-7.jpg" },
        { title: "tummochka", price: 400, category: "tummochka", image: "pic/images.jpg" },
        { title: "Dars qiladigon stol", price: 450, category: "dars qiladigon stol", image: "pic/images-1.jpg" },
        { title: "Stol", price: 6000, category: "stol", image: "pic/images-2.jpg" },
        { title: "Divan", price: 800, category: "divan", image: "pic/images-3.jpg" },
        { title: "Yotoqxona", price: 5000, category: "yotoqxona", image: "pic/download-8.jpg" },
        { title: "Yotoqxona", price: 5500, category: "yotoqxona", image: "pic/images-4.jpg" }
    ];

    let cart = [];

    function displayProducts(filteredProducts) {
        productContainer.innerHTML = "";
        filteredProducts.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.price} $</p>
                <button class="add-to-cart" data-index="${index}">Savatga qo‘shish</button>
            `;
            productContainer.appendChild(productCard);
        });

        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                addToCart(products[index]);
            });
        });
    }

    function addToCart(product) {
        let existingItem = cart.find(item => item.title === product.title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.title} (${item.quantity}) - ${item.price * item.quantity} $</p>
                <button class="remove-from-cart" data-index="${index}">❌</button>
            `;
            cartContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.innerText = `Jami: ${totalPrice} $`;
        cartCount.innerText = cart.length;

        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                removeFromCart(index);
            });
        });

        orderButton.style.display = cart.length > 0 ? "block" : "none";
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function filterProducts() {
        let filteredProducts = products;
        const searchValue = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedSort = sortFilter.value;

        if (searchValue) {
            filteredProducts = filteredProducts.filter(product =>
                product.title.toLowerCase().includes(searchValue)
            );
        }

        if (selectedCategory !== "all") {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        if (selectedSort === "cheap") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (selectedSort === "expensive") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        displayProducts(filteredProducts);
    }

    orderButton.addEventListener("click", () => {
        alert("Buyurtmangiz qabul qilindi!");
        cart = [];
        updateCart();
    });

    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
    sortFilter.addEventListener("change", filterProducts);

    displayProducts(products);
});
