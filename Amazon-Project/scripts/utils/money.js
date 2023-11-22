export function centsConvertor(priceCents){
    const price = (priceCents/100).toFixed(2);
    return price;
}