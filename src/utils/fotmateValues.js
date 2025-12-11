export const isDiscountable = (was_price, sub_total) => {
    const wasPrice = parseFloat(was_price);
    const subTotal = parseFloat(sub_total);

    if (isNaN(wasPrice) || isNaN(subTotal)) return false;

    return wasPrice > subTotal
}

export const formatPrice = (price) => {
    const num = parseFloat(price);

    if (isNaN(num)) return price; // fallback if not a number

    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
};