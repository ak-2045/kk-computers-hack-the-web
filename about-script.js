document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

document.addEventListener('DOMContentLoaded', function() {
    const joinNowButton = document.querySelector('.join-now');
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

    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    if (enquiryModal) {
        window.addEventListener('click', function(event) {
            if (event.target == enquiryModal) {
                hideModal();
            }
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && enquiryModal.style.display === 'flex') {
            hideModal();
        }
    });
});