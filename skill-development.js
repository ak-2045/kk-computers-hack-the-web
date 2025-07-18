
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll(".fade-in, .fade-in-up").forEach((el) => {
  observer.observe(el);
});

function enroll() {
  alert("Thank you for your interest! Our team will contact you soon.");
}

document.addEventListener('DOMContentLoaded', function () {
    const joinNowButton = document.querySelector('.join-now');
    const joinPopularButtons = document.querySelectorAll('.join-btn-popular');
    const enquiryModal = document.getElementById('enquiryModal');
    const closeButton = document.querySelector('.close-button');

    function showModal() {
        enquiryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        enquiryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (joinNowButton) {
        joinNowButton.addEventListener('click', showModal);
    }

    joinPopularButtons.forEach(function (button) {
        button.addEventListener('click', showModal);
    });

    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    window.addEventListener('click', function (event) {
        if (event.target === enquiryModal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && enquiryModal.style.display === 'flex') {
            hideModal();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});