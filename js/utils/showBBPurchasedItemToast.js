const showBBPurchasedItemToast = (itemName) => {
  const bbPurchaseItemToast = document.querySelector(".bbPurchaseToast");
  const toast = new bootstrap.Toast(bbPurchaseItemToast);

  // Set the toast body content
  document.getElementById(
    "purchasedItemToastBody"
  ).textContent = `${itemName} 已添加到库存`;

  // Show the toast
  toast.show();
};
