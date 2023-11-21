import {cart,deleteFromCart, saveToLocalStorage} from '../data/cart.js';
import {products} from '../data/products.js';
import {deliveryOptions} from '../data/deliveryOptions.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

renderPaymentSummary();
function renderPaymentSummary(){
let checkoutHTML= '';
cart.forEach((cartItem) =>{
    let  matchingItem;
    products.forEach((product) =>{
        if(product.id === cartItem.id){
            matchingItem = product;
        }
    })
    let deliveryOption;
    const DeliveryOptionId = cartItem.deliveryOptionsId;
    deliveryOptions.forEach((option) =>{
      if (DeliveryOptionId === option.id){
        deliveryOption = option;
      }
    })
    const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDate, 'day');
      const dateString = deliveryDate.format('dddd, MMMM D');
     
    checkoutHTML +=`<div class="cart-item-container js-remove-element-${matchingItem.id}">
    <div class="delivery-date">
      Delivery date: ${ dateString }
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
        ${deliveryOptionsHtml(matchingItem, cartItem)}    
      </div>
    </div>
  </div>`;
 
})
document.querySelector('.js-checkout-grid').innerHTML = checkoutHTML;
}


function deliveryOptionsHtml(matchingItem, cartItem){
  let html = '';
  deliveryOptions.forEach((item) =>{
      const today = dayjs();
      const deliveryDate = today.add(item.deliveryDate, 'day');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const shippingPrice = item.priceCents ===   0    
      ? 'FREE'
      : `$${(item.priceCents)/100}-`
      
        const isChecked = item.id === cartItem.deliveryOptionsId;    
      
      html += ` <div class="delivery-option js-deliveryOptions"
      data-product-id="${matchingItem.id}"
      data-delivery-option-id="${item.id}">
      <input type="radio"
      ${isChecked ? 'checked' : ''}
        class="delivery-option-input js-deliveryOption"
        name="delivery-option-${matchingItem.id}">
      <div>
        <div class="delivery-option-date">
         ${dateString}
        </div>
        <div class="delivery-option-price">
          ${shippingPrice} Shipping
        </div>
      </div>
    </div>`;
  })
  return html;
}

let deleteElements = document.querySelectorAll('.js-delete-elements');
deleteElements.forEach((value) =>{
  value.addEventListener('click', ()=>{
    const productId = value.dataset.productId;
    deleteFromCart(productId);
    document.querySelector(`.js-remove-element-${productId}`).remove();
    saveToLocalStorage();
  })
})


 function UpdateCartDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem) =>{
      if(productId === cartItem.id){
          matchingItem = cartItem;
      }
  })
  matchingItem.deliveryOptionsId = deliveryOptionId;
  saveToLocalStorage();
  renderPaymentSummary();
}


document.querySelectorAll('.js-deliveryOptions')
  .forEach((option) =>{
    option.addEventListener('click', () => {
      const {productId, deliveryOptionId} = option.dataset;
     UpdateCartDeliveryOption(productId, deliveryOptionId);
     renderPaymentSummary();
    })
  })



