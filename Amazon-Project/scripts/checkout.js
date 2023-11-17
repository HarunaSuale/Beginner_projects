import {cart,deleteFromCart, saveToLocalStorage} from '../data/cart.js';
import {products} from '../data/products.js';



let checkoutHTML= '';
cart.forEach((cartItem) =>{

    let  matchingItem;
    products.forEach((product) =>{
        if(product.id === cartItem.id){
            matchingItem = product;
        }
    })

    checkoutHTML +=`<div class="cart-item-container js-remove-element-${matchingItem.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingItem.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingItem.name}
        </div>
        <div class="product-price">
          $${matchingItem.priceCents/100}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary
          js-delete-elements" data-product-id = "${matchingItem.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  
 
})
document.querySelector('.js-checkout-grid').innerHTML = checkoutHTML;

let deleteElements = document.querySelectorAll('.js-delete-elements');

deleteElements.forEach((value) =>{
  value.addEventListener('click', ()=>{
    const productId = value.dataset.productId;
    deleteFromCart(productId);

    document.querySelector(`.js-remove-element-${productId}`).remove();
    saveToLocalStorage();
  })
})