const taxRate = 0.18;
const shippingPrice = 15.0;

window.onload = () => {
  window.localStorage.setItem('taxRate', taxRate);
  localStorage.setItem('shippingPrice', shippingPrice);

  window.sessionStorage.setItem('taxRate', taxRate);
  sessionStorage.setItem('shippingPrice', shippingPrice);
  calculateCartTotal();
};

let quantityDivs = document.getElementsByClassName('quantity-controller');

[...quantityDivs].forEach((quantityDiv) => {
  //minus button
  let quantityP = quantityDiv.querySelector('#product-quantity');
  quantityDiv.firstElementChild.addEventListener('click', () => {
    // if (quantityP.innerText != '1') {
    //   quantityP.innerText = parseInt(quantityP.innerText) - 1;
    // }
    quantityP.innerText = parseInt(quantityP.innerText) - 1;

    if (quantityP.innerText == '0') {
      alert('Product will be removed!');
      quantityDiv.parentElement.parentElement.remove();
    }
    calculateProductTotal(quantityP);
  });
  //plus button
  quantityDiv.lastElementChild.addEventListener('click', () => {
    quantityP.innerText = parseInt(quantityP.innerText) + 1;
    calculateProductTotal(quantityP);
  });
});

const calculateProductTotal = (quantityP) => {
  let productInfoDiv = quantityP.parentElement.parentElement;
  const productPrice = parseFloat(
    productInfoDiv.querySelector('strong').innerText
  );
  let productTotalPrice = productPrice * parseInt(quantityP.innerText);
  let productTotalDiv = productInfoDiv.querySelector('.product-line-price');
  productTotalDiv.innerText = productTotalPrice.toFixed(2);
  calculateCartTotal();
};

const calculateCartTotal = () => {
  let productTotalPrices = document.querySelectorAll('.product-line-price');
  let subtotal = 0;
  productTotalPrices.forEach((productPrice) => {
    subtotal += parseFloat(productPrice.innerText);
  });
  let taxPrice = subtotal * taxRate;
  // let taxPrice = subtotal * parseInt(localStorage.getItem('taxRate'));
  let shipping = subtotal > 0 ? shippingPrice : 0;
  let cartTotal = subtotal + shipping + taxPrice;

  document.querySelector('#cart-subtotal p:nth-child(2)').innerText =
    subtotal.toFixed(2);
  document.querySelector('#cart-tax p:nth-child(2)').innerText =
    taxPrice.toFixed(2);
  document.querySelector('#cart-shipping p:nth-child(2)').innerText =
    shipping.toFixed(2);
  document.getElementById('cart-total').lastElementChild.innerText =
    cartTotal.toFixed(2);
};

document.querySelectorAll('.remove-product').forEach((removeButton) => {
  removeButton.addEventListener('click', () => {
    removeProduct(removeButton);
    calculateCartTotal();
  });
});

const removeProduct = (removeButton) => {
  let productDiv = removeButton.parentElement.parentElement.parentElement;
  productDiv.remove();
};
