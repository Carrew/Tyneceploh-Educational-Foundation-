// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Handle student result lookup form submission
  const resultForm = document.getElementById("resultForm");
  resultForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const pinInput = document.getElementById("studentPin");
    const pin = pinInput.value.trim();
    if (pin.length === 0) {
      alert("Please enter your result PIN.");
      return;
    }
    // Redirect to student.html with PIN as query param
    window.location.href = `student.html?pin=${encodeURIComponent(pin)}`;
  });

  // Handle Learn More buttons on policies
  const learnMoreButtons = document.querySelectorAll(".learn-more-btn");
  learnMoreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPage = btn.getAttribute("data-target");
      if (targetPage) {
        window.location.href = targetPage;
      }
    });
  });
});
