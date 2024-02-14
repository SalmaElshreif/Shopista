const productDetailsCartNumSpan = document.getElementById('cartNumSpan');
    if (productDetailsCartNumSpan) {
      const totalCartCount = calculateTotalCartCount();
      productDetailsCartNumSpan.innerText = totalCartCount.toString();
    }

    function calculateTotalCartCount() {
      let totalCartCount = 0;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('cart_')) {
          const count = parseInt(localStorage.getItem(key), 10) || 0;
          totalCartCount += count;
        }
      }
      return totalCartCount;
    }

      document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");
  
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        displayProductDetails(data);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  });
  
  const displayProductDetails = (product) => {
    const productDetailsContainer = document.getElementById("product-details");
  
    if (!product) {
      productDetailsContainer.innerHTML = "<p>Product not found.</p>";
      return;
    }

    const maxWords = 19; 

  const truncatedDescription = truncateWords(product.description, maxWords);
  
    productDetailsContainer.innerHTML = `
      <img src="${product.image}" alt="Product Image">
      <div class="text-container">
      <h1>${product.title}</h1>
      <p> <span id="pBold"> Category: </span> ${product.category}</p>
      <p> <span id="pBold"> Description: </span> ${truncatedDescription}</p>
      <p> <span id="pBold"> Price: </span> $${product.price}</p>
      <button id="backBtn">Go Back</button>
      </div>
    `;
  
    const goBackButton = document.getElementById("backBtn");
    goBackButton.addEventListener("click", () => {
      window.location.href = "../ProductsPage/products.html";
    });
  };

  function truncateWords(str, maxWords) {
    const words = str.split(' ');
    const truncatedWords = words.slice(0, maxWords);
    return truncatedWords.join(' ');
  }