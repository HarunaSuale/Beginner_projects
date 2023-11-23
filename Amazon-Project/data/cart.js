import {deliveryOptions} from './deliveryOptions.js';
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart =[{
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionsId: '1',
    },{
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        deliveryOptionsId: '2',
    }];
}






export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartItem) =>{
        if(productId === cartItem.id){
            matchingItem = cartItem;
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










