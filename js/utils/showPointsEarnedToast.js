const showPointsEarnedToast = (pointsEarned) => {
  const pointsEarnedToast = document.querySelector(".pointsEarnedToast");
  const toast = new bootstrap.Toast(pointsEarnedToast);

  // Set the toast body content
  document.getElementById(
    "pointsEarnedToastBody"
  ).textContent = `${pointsEarned} 点积分！`;

  // Show the toast
  toast.show();
};
