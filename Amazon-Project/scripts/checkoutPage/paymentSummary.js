import {cart} from '../../data/cart.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
//import {centsConvertor} from './utils/money.js';

export function renderPayment(){
    let orderCost = 0;
    let shippingCost = 0;

    cart.forEach((product) =>{
        orderCost += product.priceCents * product.quantity;

        const deliveryOptionId = product.deliveryOptionsId;

        deliveryOptions.forEach((option) =>{
            if(option.id == deliveryOptionId){
                shippingCost += deliveryOptions.priceCents;
            }
        })
    });
    const total = orderCost+shippingCost;
    const Totaltax = 0.1*(orderCost+shippingCost);
    const orderTotal = total-Totaltax;

    let paymentHTML = '';
    paymentHTML += `      <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items (3):</div>
    <div class="payment-summary-money">$${orderCost}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${shippingCost}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${total}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${Totaltax}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${orderTotal}</div>
    </div>

    <button class="place-order-button button-primary">
    Place your order
    </button>`;

    document.querySelector('.js-order-summary').innerHTML = paymentHTML;
}