document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const findButton = document.getElementById('findBtn');

    if (!searchInput || !findButton) {
        return;
    }

    const toggleButton = () => {
        findButton.disabled = searchInput.value.trim().length === 0;
    };

    toggleButton();
    searchInput.addEventListener('input', toggleButton);
});
