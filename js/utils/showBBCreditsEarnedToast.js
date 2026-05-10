const showBBCreditsEarnedToast = (credits) => {
  const bbCreditsEarnedToast = document.querySelector('.bbCreditsEarnedToast');
  const toast = new bootstrap.Toast(bbCreditsEarnedToast);

  // Set the toast body content
  document.getElementById('creditsEarnedToastBody').textContent = `${credits} 超级货币`;

  // Show the toast
  toast.show();
};
