let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let signup = document.getElementById("signup");
let login = document.getElementById("login");
let profile = document.getElementById("profileing");
let main = document.getElementById("main-contect");
let logy = document.getElementById("logy");
let body = document.body;
let join = document.getElementById("join");
let adver = document.getElementById("adver");

showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

setInterval(() => {
  plusSlides(1);
}, 4000);

// جلب وعرض المنتجات لقسم Most Popular// جلب المنتجات من dummyjson
async function getTopProducts() {
  const urls = [
    "https://dummyjson.com/products/category/mens-shirts",
    "https://dummyjson.com/products/category/mens-shoes",
  ];

  let allProducts = [];

  for (const url of urls) {
    const res = await fetch(url);
    const data = await res.json();
    allProducts.push(...data.products);
  }

  const topSix = allProducts.slice(0, 8);
  const container = document.getElementById("most-popular-container");

  let cardsHTML = "";

  topSix.forEach((product) => {
    cardsHTML += `
      <div class="product-card">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price} USD</p>
        <a href="product.html?id=${product.id}&source=dummyjson">Buy Now</a>
      </div>
    `;
  });

  container.innerHTML = cardsHTML;
}

// جلب المنتجات من fakestoreapi
async function fetchTopSellers() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=8");
    const products = await response.json();

    const container = document.getElementById("top-sellers-container");
    container.innerHTML = "";

    products.forEach((product) => {
      const card = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}" />
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <a href="product.html?id=${product.id}&source=fakestore">Buy Now</a>
        </div>
      `;
      container.innerHTML += card;
    });
  } catch (error) {
    console.error("Error fetching Top Sellers products:", error);
  }
}

// تغير صفحة الدخول والتسجيل
profile.addEventListener("click", () => {
  signup.style.display = "block";
  main.style.display = "none";
});
logy.addEventListener("click", () => {
  login.style.display = "block";
  body.style.background = "linear-gradient(to left, #c9d6ff,rgb(65, 68, 67))";
  signup.style.display = "none";
  main.style.display = "none";
});
join.addEventListener("click", () => {
  signup.style.display = "block";
  main.style.display = "none";
});
adver.addEventListener("click", () => {
  signup.style.display = "block";
  main.style.display = "none";
});

// نداء الدوال لما الصفحة تحمل
window.onload = function () {
  getTopProducts();
  fetchTopSellers();
};
