/* menu */
const menuBtn = document.getElementById('menu-btn');
const menu = document.querySelector('.nav_links');
const closeBtn = document.querySelector('.close-btn');
/* overlay  when menu opened*/ 
const overlay = document.querySelector('.overlay');

/* open */
menuBtn.addEventListener('click', () => {
    menu.classList.add("active");
    overlay.classList.add("active");
});

/* close */
closeBtn.addEventListener('click', () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});

/* ---------------------- */
/* Button minus and plus */
const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const amountNum = document.querySelector('.amount');

let amountValue = 0;

/*plus */
plusBtn.addEventListener('click', () => {
    amountValue++;
    amountNum.innerText = amountValue;
});

/*minus*/
minusBtn.addEventListener('click', () => {
    if(amountValue > 0) {
        amountValue--;
    }
    amountNum.innerText = amountValue;
});

/* ---------------------- */
/*click next and previous image button  */
const thumbMob = document.querySelector('.thumb-mob');
const nextBtn = document.querySelector('#next');
const previousBtn = document.querySelector('#previous');

let currentImg = 1;

/* next */
function nextImg() {
    if (currentImg === 4) {
        currentImg = 1;
    } else {
        currentImg++;
    }
    thumbMob.src = `./images/image-product-${currentImg}.jpg`
}

/*previous*/
function prevImage() {
    if (currentImg === 1) {
        currentImg = 4;
    } else {
        currentImg--;
    }
    thumbMob.src = `./images/image-product-${currentImg}.jpg`;
}

nextBtn.addEventListener('click', nextImg);
previousBtn.addEventListener('click', prevImage);

/* ---------------------- */
/* cart button */

const cartBtn = document.querySelector('.cart-btn');
const cartWRP = document.querySelector('.cart-wrp');

// Toggle cart visibility
cartBtn.addEventListener('click', () => {
    /* open shopping cart */
    cartWRP.classList.toggle("invisible");
});

// Close the cart when clicking anywhere outside
document.addEventListener('click', (event) => {
    // Check if the click is outside the cart wrapper and cart button
    if (!cartWRP.contains(event.target) && !cartBtn.contains(event.target)) {
        cartWRP.classList.add("invisible");
    }
});

/* ---------------------- */
/* add to cart and remove products */

const indicator = document.querySelector('.indicator');
const wrp = document.querySelector('.cart-content');

const addToCart = document.querySelector('.add_btn')
    .addEventListener('click', addItem);

function addItem() {
    if (amountValue > 0) {  
        const total = 125.00 * amountValue;
        wrp.classList.remove("empty");
        wrp.innerHTML = `
        <div class="product">
            <div>
                <img src="./images/image-product-1-thumbnail.jpg" alt="product" class="product-img">
                <div class="product-info">
                    <p class="product-title">Fall Litmited Edition Sneakers</p>
                    <p>
                        <span>$125.00</span> x 
                        <span>${amountValue}</span>
                        <b>$${total}</b>
                    </p>
                </div>
                <button class="delete-btn"><img src="./images/icon-delete.svg" alt="delete"></button>
            </div>
            <button class="checkout-btn">Checkout</button>
        </div>
        `;
        const deleteBtn = document.querySelector(`.delete-btn`);
        deleteBtn.addEventListener('click', deleteItem);


        indicator.innerHTML = amountValue;
        indicator.style.display = "block";
    }
}

function deleteItem() {
    wrp.classList.add("empty");
    wrp.innerHTML = `<p>Your cart is empty`;
    indicator.style.display = "none";
}

/* ---------------------- */
/* open and close lightbox of product */

const lightbox = document.querySelector('.lightbox');
const mainThumbNail = document.querySelector('.main-thumbnail');
const closeLightboxBtn = document.querySelector('.close-lightbox');
const lightBoxContainer = document.querySelector('.lightbox-container');

/* open light box , we have to remove invisible*/
mainThumbNail.addEventListener('click', () => {
    lightbox.classList.remove("invisible");
});

/* close light box, we have to do it not appear on the screen */
closeLightboxBtn.addEventListener('click', () => {
    lightbox.classList.add("invisible");
});

/* close light box without X icon (click anywhere) */
document.addEventListener('click', (event) => {
    if (!closeLightboxBtn.contains(event.target) &&
        !mainThumbNail.contains(event.target) &&
        !lightBoxContainer.contains(event.target)) {
            
        lightbox.classList.add("invisible");
    }
});


// Select necessary DOM elements
const mainImages = document.querySelectorAll('.main-thumbnail'); // Select both main-thumbnail elements
const previewThumbnails = document.querySelectorAll('.preview img'); // Thumbnails inside lightbox
const outsideThumbnails = document.querySelectorAll('.lightbox-inside img'); // Thumbnails outside lightbox
const nextBtn1 = document.getElementById('next-lightbox');
const prevBtn = document.getElementById('previous-lightbox');

let currentIndex = 0; // Track the current image index

// Function to update all main-thumbnail elements
function updateMainImages(index) {
    const newSrc = previewThumbnails[index].src.replace('-thumbnail', ''); // Get the new image src
    mainImages.forEach(mainImage => {
        mainImage.src = newSrc; // Update each main-thumbnail
    });

    // Update thumbnail highlighting for both inside and outside thumbnails
    previewThumbnails.forEach(thumb => thumb.classList.remove('selected'));
    outsideThumbnails.forEach(thumb => thumb.classList.remove('selected'));

    previewThumbnails[index].classList.add('selected');
    outsideThumbnails[index].classList.add('selected');
}

// Event listener for Next button
nextBtn1.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % previewThumbnails.length; // Increment index, loop back to start
    updateMainImages(currentIndex);
});

// Event listener for Previous button
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + previewThumbnails.length) % previewThumbnails.length; // Decrement index, loop back to end
    updateMainImages(currentIndex);
});

// Add event listeners to inside lightbox thumbnails
previewThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        currentIndex = index; // Set currentIndex to the clicked thumbnail's index
        updateMainImages(currentIndex); // Update main images and highlight both inside and outside thumbnails
    });
});

// Add event listeners to outside thumbnails
outsideThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        currentIndex = index; // Set currentIndex to the clicked thumbnail's index
        updateMainImages(currentIndex); // Update main images and highlight both inside and outside thumbnails
    });
});

// Initialize with the first image
updateMainImages(currentIndex);
