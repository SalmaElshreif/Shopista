const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCardsContainer = document.querySelector("#filterable-cards");
const showMoreButton = document.getElementById("showMore");
const showLessButton = document.getElementById("showLess");

if (showMoreButton) {
  const cardsPerLoad = 6;
  let currentCardLimit = cardsPerLoad;

  const createCard = (data) => {
    const card = document.createElement("div");
    card.classList.add("card", "p-0");
    card.setAttribute("data-name", data.category);

    card.innerHTML = `
      <img src="${data.image}" alt="img">
      <div class="card-body">
        <h6 class="card-title">${data.name}</h6>
        <p class="card-text-category"><span id="categorySpan">Category: </span>${data.category}</p>
        <p class="card-text-price"><span id="priceSpan">Price: </span>$${data.price}</p>
        <button class="viewBtn"><i class="fa-solid fa-eye"></i></button>
        <button class="addToCartBtn" data-product-id="${data.id}"><i class="fa-solid fa-cart-plus"></i></button>
        </div>
    `;

  const addToCartBtn = card.querySelector('.addToCartBtn');
  addToCartBtn.addEventListener('click', () => {
    const productId = addToCartBtn.dataset.productId;

    let cartCount = parseInt(localStorage.getItem(`cart_${productId}`)) || 0;

    cartCount++;

    localStorage.setItem(`cart_${productId}`, cartCount);

  const productDetails = {
    id: data.id,
    image: data.image,
    name: data.name,
    category: data.category,
    price: data.price,
  };

  localStorage.setItem(`product_${productId}`, JSON.stringify(productDetails));

    updateCartNumber();

    populateCartContent();
  });
    return card;
  };


const updateCartNumber = () => {
  const cartNumSpan = document.getElementById('cartNumSpan');
  let totalCartCount = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('cart_')) {
      const count = parseInt(localStorage.getItem(key), 10) || 0; 
      totalCartCount += count;
    }
  }

  cartNumSpan.innerText = totalCartCount;
};

const initializeCartCount = () => {
  updateCartNumber();
};

document.addEventListener("DOMContentLoaded", initializeCartCount);

  const fetchDataAndPopulateCards = (filter, limit) => {
    const fakeApiUrl = "https://fakestoreapi.com/products"; 

    fetch(fakeApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = filter === "all" ? data : data.filter((item) => item.category && item.category.toLowerCase() === filter.toLowerCase());

        filterableCardsContainer.innerHTML = "";

        filteredData.slice(0, limit).forEach((item) => {
          const card = createCard({
            id : item.id,
            image: item.image,
            name: item.title,
            category: item.category,
            price: item.price,
          });

          const viewButton = card.querySelector('.viewBtn');
          viewButton.addEventListener('click', () => {
            window.location.href = `../ProductDetails/productDetails.html?productId=${item.id}`;
          });

          filterableCardsContainer.appendChild(card);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const filterCards = (e) => {
    document.querySelector("#filter-buttons .active").classList.remove("active");
    e.target.classList.add("active");
    fetchDataAndPopulateCards(e.target.dataset.filter, currentCardLimit);
  };

  const showMoreCards = () => {
    currentCardLimit += cardsPerLoad;
    const activeButton = document.querySelector("#filter-buttons button.active");
    const filter = activeButton ? activeButton.dataset.filter : "all";
    fetchDataAndPopulateCards(filter, currentCardLimit);
  };

  const showLessCards = () => {
    currentCardLimit -= cardsPerLoad;
    const activeButton = document.querySelector("#filter-buttons button.active");
    const filter = activeButton ? activeButton.dataset.filter : "all";
    fetchDataAndPopulateCards(filter, currentCardLimit);
  };

  filterButtons.forEach((button) => button.addEventListener("click", filterCards));
  if (showMoreButton) {
    showMoreButton.addEventListener("click", showMoreCards);
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetchDataAndPopulateCards("all", currentCardLimit);

    const populateCartContent = () => {
      const cartContentContainer = document.getElementById('cartContentContainer');
      cartContentContainer.innerHTML = '';

      let totalPrice = 0;
    
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('cart_')) {
          const productId = key.split('_')[1];
          const productDetails = JSON.parse(localStorage.getItem(`product_${productId}`));
    
          if (productDetails) {
            const cartItemCard = document.createElement('div');
            cartItemCard.classList.add('cart-item-card');
    
            const quantity = parseInt(localStorage.getItem(`cart_${productId}`)) || 0;
            const itemTotalPrice = quantity * parseFloat(productDetails.price);
            totalPrice += itemTotalPrice;

            cartItemCard.innerHTML = `
              <img src="${productDetails.image}" alt="Product Image">
              <div class="cart-item-details">
              <div class="details-header">
                <h6>${productDetails.name}</h6>
                <p>Price: $${productDetails.price}</p>
                <div class="quantity-controls">
                <button class="quantity-btn minus" data-product-id="${productId}">-</button>
                <p>Quantity: <span id="quantity_${productId}">${localStorage.getItem(`cart_${productId}`)}</span></p>
                <button class="quantity-btn plus" data-product-id="${productId}">+</button>
              </div>
              <p id="totalItem" >Total: $${itemTotalPrice.toFixed(2)}</p>
              </div>
                <button class="deleteCartItemBtn" data-product-id="${productId}"><i class="fa-solid fa-trash-can"></i></button>
              </div>
            `;
    
            const deleteCartItemBtn = cartItemCard.querySelector('.deleteCartItemBtn');
            deleteCartItemBtn.addEventListener('click', () => {
              const productId = deleteCartItemBtn.dataset.productId;
    
              localStorage.removeItem(`cart_${productId}`);
              localStorage.removeItem(`product_${productId}`);
    
              updateCartNumber();
    
              populateCartContent();
            });

        const plusBtn = cartItemCard.querySelector('.quantity-btn.plus');
        plusBtn.addEventListener('click', () => {
          const productId = plusBtn.dataset.productId;
          let quantity = parseInt(localStorage.getItem(`cart_${productId}`)) || 0;
          quantity++;
          localStorage.setItem(`cart_${productId}`, quantity);
          document.getElementById(`quantity_${productId}`).innerText = quantity;
          updateCartNumber();
          populateCartContent(); 
        });

        const minusBtn = cartItemCard.querySelector('.quantity-btn.minus');
        minusBtn.addEventListener('click', () => {
          const productId = minusBtn.dataset.productId;
          let quantity = parseInt(localStorage.getItem(`cart_${productId}`)) || 0;
          if (quantity > 1) {
            quantity--;
            localStorage.setItem(`cart_${productId}`, quantity);
            document.getElementById(`quantity_${productId}`).innerText = quantity;
            updateCartNumber();
            populateCartContent(); 
          }
        });
    
            cartContentContainer.appendChild(cartItemCard);
      }
    }
  }
  const totalPriceButton = document.createElement('button');
  totalPriceButton.classList.add('total-price-btn');
  totalPriceButton.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
  cartContentContainer.appendChild(totalPriceButton);
}

    const showCartSidebar = () => {
      const cartSidebar = document.getElementById('cartSidebar');
      cartSidebar.classList.add('show');
  
      populateCartContent();
    };
  
    const hideCartSidebar = () => {
      const cartSidebar = document.getElementById('cartSidebar');
      cartSidebar.classList.remove('show');
    };
  
    const cartNumLink = document.querySelector('.cartNum');
    if (cartNumLink) {
      cartNumLink.addEventListener('click', showCartSidebar);
    }
  
    const closeCartBtn = document.getElementById('closeCartBtn');
    if (closeCartBtn) {
      closeCartBtn.addEventListener('click', hideCartSidebar);
    }

  });

  if (showLessButton) {
    showLessButton.addEventListener("click", showLessCards);
  }
}
