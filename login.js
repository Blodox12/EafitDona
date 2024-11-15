// Function to show login modal
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

// Function to show register modal
function showRegister() {
    document.getElementById('registerModal').style.display = 'block';
}

// Function to close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Enhanced Login function with session simulation
function login() {
    const username = document.querySelector('#loginModal input[type="text"]').value;
    const password = document.querySelector('#loginModal input[type="password"]').value;

    // Simulate login with dummy data (this can be replaced by an API call)
    if (username === 'user' && password === 'pass') {
        alert('Inicio de sesión exitoso');
        
        // Simulate storing session data
        sessionStorage.setItem('username', username);
        window.location.href = 'profile.html';
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }

    closeModal('loginModal');
}

// Enhanced Register function with basic validation
function register() {
    const username = document.querySelector('#registerModal input[type="text"]').value;
    const password = document.querySelector('#registerModal input[type="password"]').value;
    const email = document.querySelector('#registerModal input[type="email"]').value;

    // Simple validation
    if (username && password && email) {
        alert('Registro exitoso');
        window.location.href = 'login.html';
    } else {
        alert('Por favor, completa todos los campos');
    }

    closeModal('registerModal');
}

// Contact form submission
function submitContactForm() {
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    if (name && email && message) {
        alert('Formulario de contacto enviado exitosamente');
        window.location.href = 'contact.html';
    } else {
        alert('Por favor, completa todos los campos del formulario');
    }
}

// Donation request form submission
function submitDonationRequest() {
    const item = document.querySelector('input[name="item"]').value;
    const reason = document.querySelector('textarea[name="reason"]').value;

    if (item && reason) {
        alert('Solicitud de donación enviada exitosamente');
        window.location.href = 'solicitar.html';
    } else {
        alert('Por favor, completa todos los campos del formulario');
    }
}

// Enhanced logout function
function logout() {
    // Clear session storage
    sessionStorage.removeItem('username');
    alert('Sesión cerrada correctamente');
    window.location.href = 'login.html';
}

// Load dynamic profile data
function loadProfileData() {
    const username = sessionStorage.getItem('username');
    if (username) {
        // Simulate user data loading
        document.querySelector('.container p:nth-child(2)').innerHTML = `Nombre de usuario: ${username}`;
        document.querySelector('.container p:nth-child(3)').innerHTML = `Correo electrónico: ${username}@mail.com`;
    } else {
        alert('Por favor, inicia sesión primero');
        window.location.href = 'login.html';
    }
}

// Dynamic donor list population
function loadDonors() {
    const donorList = [
        { name: 'Donante 1', link: 'donante1.html' },
        { name: 'Donante 2', link: 'donante2.html' }
    ];

    const donorContainer = document.querySelector('ul');
    donorContainer.innerHTML = ''; // Clear existing content

    donorList.forEach(donor => {
        const listItem = document.createElement('li');
        const donorLink = document.createElement('a');
        donorLink.href = donor.link;
        donorLink.textContent = donor.name;
        listItem.appendChild(donorLink);
        donorContainer.appendChild(listItem);
    });
}

// Load donation details dynamically
function loadDonationDetails() {
    const donationDetails = {
        description: 'Camiseta del equipo local',
        condition: 'Nueva',
        availability: 'Disponible'
    };

    document.querySelector('.container p:nth-child(2)').innerHTML = `Descripción del artículo donado: ${donationDetails.description}`;
    document.querySelector('.container p:nth-child(3)').innerHTML = `Condiciones: ${donationDetails.condition}`;
    document.querySelector('.container p:nth-child(4)').innerHTML = `Disponibilidad: ${donationDetails.availability}`;
}


window.onload = function() {
    
    if (document.querySelector('form[action="loginServlet"]')) {
        document.querySelector('form[action="loginServlet"]').addEventListener('submit', function(event) {
            event.preventDefault();
            submitLoginForm(event);
        });
    }

    if (document.querySelector('form[action="registerServlet"]')) {
        document.querySelector('form[action="registerServlet"]').addEventListener('submit', function(event) {
            event.preventDefault();
            submitRegisterForm(event);
        });
    }

    if (document.querySelector('form[action="contactServlet"]')) {
        document.querySelector('form[action="contactServlet"]').addEventListener('submit', function(event) {
            event.preventDefault();
            submitContactForm();
        });
    }

    if (document.querySelector('form[action="requestDonationServlet"]')) {
        document.querySelector('form[action="requestDonationServlet"]').addEventListener('submit', function(event) {
            event.preventDefault();
            submitDonationRequest();
        });
    }

    
    if (document.body.classList.contains('profile-page')) {
        loadProfileData();
    }

    
    if (document.querySelector('ul')) {
        loadDonors();
    }

    
    if (document.body.classList.contains('donation-details')) {
        loadDonationDetails();
    }
};
