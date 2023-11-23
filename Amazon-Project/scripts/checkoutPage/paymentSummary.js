import {cart, matchingDeliveryOption} from '../../data/cart.js';
import {matchingProduct} from '../../data/products.js';
import {centsConvertor} from '../utils/money.js';



export function renderPayment(){
    let itemsCost = 0;
    let shippingCost = 0;

    cart.forEach((item) =>{
        const matchingItem = matchingProduct(item);
        itemsCost += matchingItem.priceCents * item.quantity;
        const matchingOption = matchingDeliveryOption(item);
        shippingCost += matchingOption.priceCents ;
    })
    const totalB4Tax = itemsCost + shippingCost;
    const taxCost = 0.1*totalB4Tax;
    const orderTotal = totalB4Tax - taxCost;

    let paymentHTML = '';
    paymentHTML += `<div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${centsConvertor(itemsCost)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${centsConvertor(shippingCost)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${centsConvertor(totalB4Tax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${centsConvertor(taxCost)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${centsConvertor(orderTotal)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>`;
  
        document.querySelector('.js-order-summary').innerHTML = paymentHTML;

            
}