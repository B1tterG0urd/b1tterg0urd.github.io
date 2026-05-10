const showNoRerollTokensToast = () => {
  const noRerollTokensToast = document.querySelector(".noRerollTokensToast");
  const toast = new bootstrap.Toast(noRerollTokensToast);

  // Set the toast body content
  document.getElementById(
    "noRerollTokensToastBody"
  ).textContent = `你没有重抽令牌`;

  // Show the toast
  toast.show();
};
