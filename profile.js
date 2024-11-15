// Enhanced logout function
function logout() {
    // Clear session storage
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    alert('Sesión cerrada correctamente');
    window.location.href = 'login.html';
}

// Load dynamic profile data
function loadProfileData() {
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    if (username && email) {
        document.getElementById('username').textContent = username;
        document.getElementById('email').textContent = email;
    } else {
        alert('Por favor, inicia sesión primero');
        window.location.href = 'login.html';
    }
}

// Edit profile function (placeholder)
function editProfile() {
    alert('Esta funcionalidad aún no está implementada');
}

// Load profile data when the page loads
window.onload = function() {
    if (document.body.classList.contains('profile-page')) {
        loadProfileData();
    }
};