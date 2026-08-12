/* ==========================================
   AMAZON CLONE JAVASCRIPT
   STEP 1 - SHOPPING CART
========================================== */

/* ==========================================
   SEARCH BAR - FIND PRODUCT
========================================== */

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");


function performSearch() {

    if (!searchInput) return;


    const searchText =
        searchInput.value.trim().toLowerCase();


    if (searchText === "") {
        return;
    }


    /* Find all products */

    const products =
        document.querySelectorAll(".item");


    let foundProduct = null;


    /* Look for matching product */

    products.forEach(function (product) {

        const productName =
            (
                product.dataset.name ||
                product.textContent
            ).toLowerCase();


        if (
            !foundProduct &&
            productName.includes(searchText)
        ) {

            foundProduct = product;

        }

    });


    /* Product found */

    if (foundProduct) {

        /* Make sure the product is visible */

        foundProduct.style.display = "";


        /* Scroll directly to the product */

        foundProduct.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });


        /* Highlight the product */

        foundProduct.classList.add(
            "search-highlight"
        );


        /* Remove highlight after 2 seconds */

        setTimeout(function () {

            foundProduct.classList.remove(
                "search-highlight"
            );

        }, 2000);


    } else {

        alert(
            "Sorry, we couldn't find \"" +
            searchInput.value +
            "\"."
        );

    }

}


/* ==========================================
   SEARCH BUTTON
========================================== */

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        performSearch
    );

}


/* ==========================================
   PRESS ENTER TO SEARCH
========================================== */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        }
    );

}
/* ==========================================
   ALL BUTTON
========================================== */

const allBtn =
    document.getElementById("allBtn");

const allMenu =
    document.getElementById("allMenu");


if (allBtn && allMenu) {

    allBtn.addEventListener(
        "click",
        function () {

            allMenu.classList.toggle("active");

        }
    );


    /* Close menu when clicking outside */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !allBtn.contains(event.target) &&
                !allMenu.contains(event.target)
            ) {

                allMenu.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* ==========================================
   HERO IMAGE SLIDER
========================================== */

const slides = document.querySelectorAll(".slide");

const nextButton = document.querySelector(".slider-btn.next");

const prevButton = document.querySelector(".slider-btn.prev");

let currentSlide = 0;


/* Show a specific slide */

function showSlide(index) {

    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    slides[index].classList.add("active");

}


/* Next slide */

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);

}


/* Previous slide */

function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);

}


/* Next button */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextSlide
    );

}


/* Previous button */

if (prevButton) {

    prevButton.addEventListener(
        "click",
        previousSlide
    );

}


/* Automatic sliding */

let autoSlide = setInterval(
    nextSlide,
    5000
);


/* Reset automatic timer when user
   manually changes the slide */

function resetAutoSlide() {

    clearInterval(autoSlide);

    autoSlide = setInterval(
        nextSlide,
        5000
    );

}


if (nextButton) {

    nextButton.addEventListener(
        "click",
        resetAutoSlide
    );

}


if (prevButton) {

    prevButton.addEventListener(
        "click",
        resetAutoSlide
    );

}

/* ==========================================
   LOAD CART
========================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* ==========================================
   FIX OLD CART DATA
========================================== */

cart = cart.map(function (item) {

    return {
        ...item,
        quantity: Number(item.quantity) || 1
    };

});


/* Save fixed cart */

localStorage.setItem(
    "cart",
    JSON.stringify(cart)
);


/* ==========================================
   CART COUNTER
========================================== */

const cartCount =
    document.getElementById("cart-count");

const cartTotalItems =
    document.getElementById("cart-total-items");


function updateCartCount() {

    let totalItems = 0;

    cart.forEach(function (item) {

        totalItems +=
            Number(item.quantity) || 1;

    });


    // Header cart counter

    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }


    // Cart summary item count

    if (cartTotalItems) {

        cartTotalItems.textContent =
            totalItems;

    }

}


// Run when page loads

updateCartCount();


/* Run when page loads */

updateCartCount();


/* ==========================================
   ADD TO CART
========================================== */

const addToCartBtn =
    document.getElementById("addToCart");


const productDetails =
    document.querySelector(".product-details");


if (addToCartBtn && productDetails) {

    addToCartBtn.addEventListener(
        "click",
        function () {


            /* Get product information */

            const product = {

                name:
                    productDetails.dataset.name,

                price:
                    Number(
                        productDetails.dataset.price
                    ),

                image:
                    productDetails.dataset.image,

                quantity: 1

            };


            /* Check if product already exists */

            const existingProduct =
                cart.find(function (item) {

                    return item.name === product.name;

                });


            /* Increase quantity */

            if (existingProduct) {

                existingProduct.quantity += 1;

            }


            /* Add new product */

            else {

                cart.push(product);

            }


            /* Save cart */

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            /* Update cart number */

            updateCartCount();


            /* Confirmation */

            alert(
                product.name +
                " added to cart!"
            );

        }
    );

}
/* ==========================================
   BUY NOW
========================================== */

const buyNowBtn = document.getElementById("buyNow");

if (buyNowBtn && productDetails) {

    buyNowBtn.addEventListener("click", function () {

        /* Get product information */

        const product = {

            name: productDetails.dataset.name,

            price: Number(
                productDetails.dataset.price
            ),

            image: productDetails.dataset.image,

            quantity: 1

        };


        /* Check if product already exists */

        const existingProduct = cart.find(function (item) {

            return item.name === product.name;

        });


        /* Increase quantity */

        if (existingProduct) {

            existingProduct.quantity += 1;

        }

        /* Add new product */

        else {

            cart.push(product);

        }


        /* Save cart */

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        /* Go to checkout */

        window.location.href = "checkout.html";

    });

}
/* ==========================================
   STEP 5 - CART QUANTITY CONTROLS
========================================== */

const cartItems =
    document.getElementById("cartItems");

const subtotal =
    document.getElementById("subtotal");


if (cartItems && subtotal) {

    cartItems.innerHTML = "";

    let total = 0;


    /* ======================================
       EMPTY CART
    ====================================== */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty.</h2>

                <a href="index.html">
                    Continue Shopping
                </a>

            </div>

        `;

        subtotal.textContent = "₦0";

    }


    /* ======================================
   DISPLAY CART PRODUCTS
====================================== */

else {

    cart.forEach(function (product, index) {

        const quantity =
            Number(product.quantity) || 1;

        const price =
            Number(product.price) || 0;

        const productTotal =
            price * quantity;

        total += productTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <!-- IMAGE -->

                <div class="cart-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <!-- INFORMATION -->

                <div class="cart-info">

                    <h2>
                        ${product.name}
                    </h2>

                    <p class="stock">
                        In Stock
                    </p>

                    <p class="price">
                        ₦${price.toLocaleString()}
                    </p>

                    <!-- ITEM TOTAL -->

                    <p class="item-total">

                        Item Total:
                        ₦${productTotal.toLocaleString()}

                    </p>


                    <!-- QUANTITY -->

                    <div class="quantity-control">

                        <button
                            type="button"
                            class="quantity-minus"
                            data-index="${index}"
                        >
                            −
                        </button>


                        <span class="quantity-number">
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            class="quantity-plus"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>


                    <!-- REMOVE -->

                    <button
                        type="button"
                        class="delete-btn"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });
        // ==========================================



        /* ==================================
           UPDATE SUBTOTAL
        ================================== */

        subtotal.textContent =
            "₦" + total.toLocaleString();


        /* ==================================
           PLUS BUTTON
        ================================== */

        document
            .querySelectorAll(".quantity-plus")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );

                        cart[index].quantity += 1;


                        localStorage.setItem(
                            "cart",
                            JSON.stringify(cart)
                        );


                        location.reload();

                    }
                );

            });


        /* ==================================
           MINUS BUTTON
        ================================== */

        document
            .querySelectorAll(".quantity-minus")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        if (cart[index].quantity > 1) {

                            cart[index].quantity -= 1;

                        } else {

                            cart.splice(index, 1);

                        }


                        localStorage.setItem(
                            "cart",
                            JSON.stringify(cart)
                        );


                        location.reload();

                    }
                );

            });


        /* ==================================
           REMOVE BUTTON
        ================================== */

        document
            .querySelectorAll(".delete-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        cart.splice(index, 1);


                        localStorage.setItem(
                            "cart",
                            JSON.stringify(cart)
                        );


                        updateCartCount();


                        location.reload();

                    }
                );

            });

    }

}
/* ==========================================
   STEP 3 - WISHLIST
========================================== */


/* ==========================================
   LOAD WISHLIST
========================================== */

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


/* ==========================================
   WISHLIST COUNTER
========================================== */

const wishlistCount =
    document.getElementById("wishlist-count");


function updateWishlistCount() {

    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;

    }

}


updateWishlistCount();


/* ==========================================
   WISHLIST HEART BUTTONS
========================================== */

const wishlistButtons =
    document.querySelectorAll(".wishlist-btn");


wishlistButtons.forEach(function (button) {

    const item =
        button.closest(".item");


    if (!item) {
        return;
    }


    const icon =
        button.querySelector("i");


    const productName =
        item.dataset.name;


    /* ======================================
       CHECK IF ALREADY IN WISHLIST
    ====================================== */

    const alreadySaved =
        wishlist.some(function (product) {

            return product.name === productName;

        });


    /* Make heart solid */

    if (alreadySaved) {

        if (icon) {

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

        }

        button.classList.add("active");

    }


    /* ======================================
       HEART CLICK
    ====================================== */

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();


            const product = {

                name:
                    item.dataset.name,

                price:
                    Number(
                        item.dataset.price
                    ),

                image:
                    item.dataset.image

            };


            /* Find existing product */

            const existingIndex =
                wishlist.findIndex(
                    function (savedProduct) {

                        return savedProduct.name ===
                            product.name;

                    }
                );


            /* ==================================
               REMOVE FROM WISHLIST
            ================================== */

            if (existingIndex !== -1) {

                wishlist.splice(
                    existingIndex,
                    1
                );


                if (icon) {

                    icon.classList.remove(
                        "fa-solid"
                    );

                    icon.classList.add(
                        "fa-regular"
                    );

                }


                button.classList.remove(
                    "active"
                );

            }


            /* ==================================
               ADD TO WISHLIST
            ================================== */

            else {

                wishlist.push(product);


                if (icon) {

                    icon.classList.remove(
                        "fa-regular"
                    );

                    icon.classList.add(
                        "fa-solid"
                    );

                }


                button.classList.add(
                    "active"
                );

            }


            /* ==================================
               SAVE WISHLIST
            ================================== */

            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );


            /* Update counter */

            updateWishlistCount();

        }
    );

});


/* ==========================================
   STEP 4 - DISPLAY WISHLIST
========================================== */

const wishlistItems =
    document.getElementById("wishlistItems");


/* ==========================================
   PRODUCT PAGE LINKS
========================================== */

function getProductPage(productName) {

    const pages = {

        "Apple AirPods Pro":
            "airpods.html",

        "Apple AirPods Pro (2nd Generation)":
            "airpods.html",

        "Sony Headphones":
            "sony-headphones.html",

        "Extension Cable":
            "extension-cable.html",

        "Blender":
            "blender.html",

        "Fridge":
            "fridge.html",

        "Shirts":
            "shirts.html",

        "Loafers":
            "loafers.html",

        "Sneakers":
            "sneakers.html"

    };


    return pages[productName] ||
        "index.html";

}

/* ==========================================
   DISPLAY WISHLIST PRODUCTS
========================================== */

if (wishlistItems) {

    wishlistItems.innerHTML = "";


    /* ======================================
       EMPTY WISHLIST
    ====================================== */

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `

            <div class="empty-wishlist">

                <i class="fa-regular fa-heart"></i>

                <h2>
                    Your wishlist is empty.
                </h2>

                <p>
                    Save products you like by
                    clicking the heart icon.
                </p>

                <a href="index.html">
                    Continue Shopping
                </a>

            </div>

        `;

    }


    /* ======================================
       DISPLAY SAVED PRODUCTS
    ====================================== */

    else {

        wishlist.forEach(
            function (product, index) {

                const productPage =
                    getProductPage(
                        product.name
                    );


                wishlistItems.innerHTML += `

                    <div class="cart-item">


                        <!-- PRODUCT LINK -->

                        <a
                            href="${productPage}"
                            class="wishlist-product-link"
                        >


                            <!-- IMAGE -->

                            <div class="cart-image">

                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                >

                            </div>


                            <!-- INFORMATION -->

                            <div class="cart-info">

                                <h2>
                                    ${product.name}
                                </h2>

                                <p class="stock">
                                    In Stock
                                </p>

                                <p class="price">
                                    ₦${Number(
                                        product.price
                                    ).toLocaleString()}
                                </p>

                            </div>


                        </a>


                        <!-- BUTTONS -->

                        <div class="wishlist-buttons">


                            <!-- ADD TO CART -->

                            <button
                                type="button"
                                class="add-cart-btn"
                                data-index="${index}"
                            >
                                Add to Cart
                            </button>


                            <!-- REMOVE -->

                            <button
                                type="button"
                                class="delete-btn"
                                data-index="${index}"
                            >
                                Remove
                            </button>


                        </div>


                    </div>

                `;

            }
        );


        /* ======================================
           REMOVE FROM WISHLIST
        ====================================== */

        document
            .querySelectorAll(".delete-btn")
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const index =
                                Number(
                                    this.dataset.index
                                );


                            wishlist.splice(
                                index,
                                1
                            );


                            localStorage.setItem(
                                "wishlist",
                                JSON.stringify(
                                    wishlist
                                )
                            );


                            updateWishlistCount();


                            location.reload();

                        }
                    );

                }
            );


        /* ======================================
           ADD WISHLIST ITEM TO CART
        ====================================== */

        document
            .querySelectorAll(".add-cart-btn")
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const index =
                                Number(
                                    this.dataset.index
                                );


                            const product =
                                wishlist[index];


                            if (!product) {
                                return;
                            }


                            /* Check cart */

                            const existingProduct =
                                cart.find(
                                    function (item) {

                                        return item.name ===
                                            product.name;

                                    }
                                );


                            /* Already in cart */

                            if (existingProduct) {

                                existingProduct.quantity += 1;

                            }


                            /* New cart item */

                            else {

                                cart.push({

                                    name:
                                        product.name,

                                    price:
                                        Number(
                                            product.price
                                        ),

                                    image:
                                        product.image,

                                    quantity: 1

                                });

                            }


                            /* Save cart */

                            localStorage.setItem(
                                "cart",
                                JSON.stringify(cart)
                            );


                            /* Update cart counter */

                            updateCartCount();


                            alert(
                                product.name +
                                " added to cart!"
                            );

                        }
                    );

                }
            );

    }

}
/* ======================================
   CHECKOUT PAGE
====================================== */

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutForm =
    document.getElementById("checkoutForm");


if (checkoutItems && checkoutTotal) {

    checkoutItems.innerHTML = "";

    let total = 0;


    /* ======================================
       EMPTY CART
    ====================================== */

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-checkout">

                <p>Your cart is empty.</p>

                <a href="index.html">
                    Continue Shopping
                </a>

            </div>

        `;

        checkoutTotal.textContent = "₦0";

    }


    /* ======================================
       DISPLAY CART PRODUCTS
    ====================================== */

    else {

        cart.forEach(function (product) {

            const quantity =
                Number(product.quantity) || 1;

            const price =
                Number(product.price) || 0;

            const productTotal =
                price * quantity;


            total += productTotal;


            checkoutItems.innerHTML += `

                <div class="checkout-item">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div class="checkout-item-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            Quantity: ${quantity}
                        </p>

                        <p class="price">
                            ₦${productTotal.toLocaleString()}
                        </p>

                    </div>

                </div>

            `;

        });


        /* ==================================
           CHECKOUT TOTAL
        ================================== */

        checkoutTotal.textContent =
            "₦" + total.toLocaleString();

    }

}


/* ==========================================
   PLACE ORDER
========================================== */

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (cart.length === 0) {

                alert("Your cart is empty.");

                return;

            }

            /* Clear cart */

            cart = [];

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            updateCartCount();

            /* Go to confirmation page */

            window.location.href =
                "order-success.html";

        }
    );

}
/* ==========================================
   SIGN UP FORM
========================================== */

const showSignUp =
    document.getElementById("showSignUp");

const signupBox =
    document.getElementById("signupBox");


if (showSignUp && signupBox) {

    showSignUp.addEventListener(
        "click",
        function () {

            signupBox.style.display = "block";

            signupBox.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}


/* ==========================================
   CREATE ACCOUNT
========================================== */

const signUpForm =
    document.getElementById("signUpForm");


if (signUpForm) {

    signUpForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("signupName").value.trim();

            const email =
                document.getElementById("signupEmail").value.trim();

            const password =
                document.getElementById("signupPassword").value;

            const confirmPassword =
                document.getElementById("signupConfirm").value;


            if (password !== confirmPassword) {

                alert("Passwords do not match.");

                return;

            }


            const user = {

                name: name,

                email: email,

                password: password

            };


            localStorage.setItem(
                "amazonUser",
                JSON.stringify(user)
            );


            alert(
                "Account created successfully!"
            );


            signUpForm.reset();

        }
    );

}
/* ==========================================
   START SELLING BUTTON
========================================== */

const startSellingBtn =
    document.getElementById("startSellingBtn");

if (startSellingBtn) {

    startSellingBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "seller-signup.html";

        }
    );

}
/* ==========================================
   SELLER SIGNUP FORM
========================================== */

const sellerSignupForm =
    document.getElementById("sellerSignupForm");

if (sellerSignupForm) {

    sellerSignupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const seller = {

                name:
                    document.getElementById(
                        "sellerName"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "sellerEmail"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "sellerPhone"
                    ).value.trim(),

                business:
                    document.getElementById(
                        "businessName"
                    ).value.trim()

            };


            localStorage.setItem(
                "sellerAccount",
                JSON.stringify(seller)
            );


            alert(
                "Seller account created successfully!"
            );


            window.location.href =
                "sell.html";

        }
    );

}
/* ==========================================
   GIFT CARD FORM
========================================== */

const giftCardForm =
    document.getElementById("giftCardForm");

if (giftCardForm) {

    giftCardForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const amount =
                document.getElementById(
                    "giftAmount"
                ).value;

            const name =
                document.getElementById(
                    "recipientName"
                ).value.trim();

            const email =
                document.getElementById(
                    "recipientEmail"
                ).value.trim();


            const giftCard = {

                amount: Number(amount),

                recipientName: name,

                recipientEmail: email

            };


            localStorage.setItem(
                "giftCard",
                JSON.stringify(giftCard)
            );


            alert(
                "Gift card order created successfully!"
            );


            giftCardForm.reset();

        }
    );

}
/* ==========================================
   REGISTRY FORM
========================================== */

const registryForm =
    document.getElementById("registryForm");

if (registryForm) {

    registryForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const registry = {

                name:
                    document.getElementById(
                        "registryName"
                    ).value.trim(),

                type:
                    document.getElementById(
                        "registryType"
                    ).value,

                date:
                    document.getElementById(
                        "registryDate"
                    ).value

            };


            localStorage.setItem(
                "registry",
                JSON.stringify(registry)
            );


            alert(
                "Registry created successfully!"
            );


            registryForm.reset();

        }
    );

}

/* ==========================================
   CONTACT US BUTTON
========================================== */

const contactSupportBtn =
    document.getElementById("contactSupportBtn");

const supportBox =
    document.getElementById("supportBox");


if (contactSupportBtn && supportBox) {

    contactSupportBtn.addEventListener(
        "click",
        function () {

            supportBox.classList.toggle("show");


            if (supportBox.classList.contains("show")) {

                supportBox.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


/* ==========================================
   SUPPORT FORM
========================================== */

const supportForm =
    document.getElementById("supportForm");


if (supportForm) {

    supportForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const supportRequest = {

                name:
                    document.getElementById(
                        "supportName"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "supportEmail"
                    ).value.trim(),

                message:
                    document.getElementById(
                        "supportMessage"
                    ).value.trim(),

                date:
                    new Date().toLocaleString()

            };


            localStorage.setItem(
                "supportRequest",
                JSON.stringify(supportRequest)
            );


            alert(
                "Your message has been sent successfully!"
            );


            supportForm.reset();

        }
    );

}
/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const contactMessage = {

                name:
                    document.getElementById(
                        "contactName"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "contactEmail"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "contactPhone"
                    ).value.trim(),

                subject:
                    document.getElementById(
                        "contactSubject"
                    ).value,

                orderNumber:
                    document.getElementById(
                        "orderNumber"
                    ).value.trim(),

                message:
                    document.getElementById(
                        "contactMessage"
                    ).value.trim(),

                date:
                    new Date().toLocaleString()

            };

            localStorage.setItem(
                "contactMessage",
                JSON.stringify(contactMessage)
            );

            alert(
                "Thank you! Your message has been sent successfully."
            );

            contactForm.reset();

        }
    );

}
/* ==========================================
   KITCHEN PAGE
   CART + WISHLIST
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       GET ELEMENTS
    ========================================== */

    const kitchenProducts =
        document.querySelectorAll(
            ".category-products-page .product-card"
        );

    const cartCount =
        document.getElementById("cart-count");

    const wishlistCount =
        document.getElementById("wishlist-count");


    /* ==========================================
       GET SAVED DATA
    ========================================== */

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];


    /* ==========================================
       UPDATE COUNTS
    ========================================== */

    function updateCounts() {

        if (cartCount) {

            cartCount.textContent = cart.length;

        }

        if (wishlistCount) {

            wishlistCount.textContent =
                wishlist.length;

        }

    }


    /* ==========================================
       SAVE DATA
    ========================================== */

    function saveData() {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        updateCounts();

    }


    /* ==========================================
       ADD TO CART
    ========================================== */

    kitchenProducts.forEach(function (product) {

        const cartButton =
            product.querySelector(".add-cart-btn");

        const wishlistButton =
            product.querySelector(".wishlist-btn");


        /* --------------------------------------
           PRODUCT INFORMATION
        -------------------------------------- */

        const name =
            product.dataset.name;

        const price =
            Number(product.dataset.price);

        const image =
            product.dataset.image;


        /* ======================================
           ADD TO CART BUTTON
        ====================================== */

        if (cartButton) {

            cartButton.addEventListener(
                "click",
                function () {

                    const existingProduct =
                        cart.find(
                            item => item.name === name
                        );


                    if (existingProduct) {

                        existingProduct.quantity += 1;

                    } else {

                        cart.push({

                            name: name,

                            price: price,

                            image: image,

                            quantity: 1

                        });

                    }


                    saveData();


                    /* Button feedback */

                    const originalText =
                        cartButton.textContent;

                    cartButton.textContent =
                        "Added ✓";

                    setTimeout(function () {

                        cartButton.textContent =
                            originalText;

                    }, 1000);

                }
            );

        }


        /* ======================================
           WISHLIST BUTTON
        ====================================== */

        if (wishlistButton) {

            const icon =
                wishlistButton.querySelector("i");


            /* Check if already in wishlist */

            const alreadySaved =
                wishlist.some(
                    item => item.name === name
                );


            if (alreadySaved) {

                icon.classList.remove(
                    "fa-regular"
                );

                icon.classList.add(
                    "fa-solid"
                );

            }


            wishlistButton.addEventListener(
                "click",
                function () {

                    const index =
                        wishlist.findIndex(
                            item => item.name === name
                        );


                    /* --------------------------------
                       REMOVE FROM WISHLIST
                    -------------------------------- */

                    if (index !== -1) {

                        wishlist.splice(index, 1);


                        icon.classList.remove(
                            "fa-solid"
                        );

                        icon.classList.add(
                            "fa-regular"
                        );

                    }


                    /* --------------------------------
                       ADD TO WISHLIST
                    -------------------------------- */

                    else {

                        wishlist.push({

                            name: name,

                            price: price,

                            image: image

                        });


                        icon.classList.remove(
                            "fa-regular"
                        );

                        icon.classList.add(
                            "fa-solid"
                        );

                    }


                    saveData();

                }
            );

        }

    });


    /* ==========================================
       INITIAL COUNTS
    ========================================== */

    updateCounts();

});