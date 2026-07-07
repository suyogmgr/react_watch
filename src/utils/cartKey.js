export const getCartKey = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  return user.email ? `cart_${user.email}` : "cart_guest";
};
