import {deliveryOptions} from './deliveryOptions.js';
import {matchingProduct} from './products.js'

export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart =[];
}
export function addToCart(productId){
    let matchingItem = '';
    cart.forEach((item) =>{
        if(productId === item.id){
            matchingItem = item;
        }
    })
    if(matchingItem){
        matchingItem.quantity += 1;
    }else{
        cart.push({
            id: productId,
            quantity: 1,
            deliveryOptionsId:'1'
        })
    }
    saveToLocalStorage();
}



export function deleteFromCart(productId){
    let newCart = [];

    cart.forEach((item) =>{
        if(item.id !== productId){
            newCart.push(item);
        }
    })
    cart = newCart;
    saveToLocalStorage();
}


export function saveToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

 export function  matchingDeliveryOption(item){
    let matchingOption;
    deliveryOptions.forEach((option) =>{
        if(item.deliveryOptionsId === option.id){
            matchingOption = option;
        }
    })
    return matchingOption;
}

export function totalCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((item) =>{
        cartQuantity += item.quantity;
    }); 
   document.querySelector('.js-cartQuantity').innerHTML = cartQuantity;
  }










