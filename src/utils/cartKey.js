export const getCartKey = () => {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
  return user.email ? `cart_${user.email}` : "cart_guest";
};
