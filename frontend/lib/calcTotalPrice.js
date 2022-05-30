export default function calcTotalPrice(cart) {
  return cart.reduce((sum, cartItem) => {
    if (!cartItem.product) return sum;
    return sum + cartItem.quantity * cartItem.product.price;
  }, 0);
}
