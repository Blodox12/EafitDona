// Variables globales
const donationForm = document.getElementById('donationForm');
const uploadButton = document.getElementById('uploadButton');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const dropZone = document.getElementById('dropZone');
const donationItems = document.getElementById('donationItems');

// Array para almacenar las donaciones (en una aplicación real, esto vendría de una base de datos)
let donations = [];

// Manejador para el botón de subida
uploadButton.addEventListener('click', () => {
    imageInput.click();
});

// Previsualización de la imagen cuando se selecciona
imageInput.addEventListener('change', handleImageSelect);

// Configurar zona de arrastrar y soltar
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        imageInput.files = files;
        handleImageSelect({ target: imageInput });
    }
});

// Función para manejar la selección de imagen
function handleImageSelect(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            dropZone.style.display = 'none';
        };
        
        reader.readAsDataURL(file);
    }
}

// Manejar el envío del formulario
donationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const imageFile = imageInput.files[0];
    
    if (!imageFile) {
        alert('Por favor selecciona una imagen');
        return;
    }
    
    // En una aplicación real, aquí enviarías los datos al servidor
    // Por ahora, simularemos agregando la donación localmente
    const donation = {
        id: Date.now(),
        image: await getBase64(imageFile),
        description: description,
        date: new Date().toLocaleDateString()
    };
    
    donations.push(donation);
    displayDonations();
    resetForm();
});

// Función para convertir la imagen a Base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Función para mostrar las donaciones
function displayDonations() {
    donationItems.innerHTML = donations.map(donation => `
        <div class="item">
            <img src="${donation.image}" alt="Donación">
            <p>${donation.description}</p>
            <p class="date">Publicado: ${donation.date}</p>
            <button onclick="requestDonation(${donation.id})">Solicitar</button>
            <button onclick="viewDetails(${donation.id})">Ver más</button>
        </div>
    `).join('');
}

// Función para solicitar una donación
function requestDonation(id) {
    // Aquí implementarías la lógica para solicitar la donación
    alert('Solicitud enviada');
}

// Función para ver detalles
function viewDetails(id) {
    const donation = donations.find(d => d.id === id);
    if (donation) {
        alert(`Detalles de la donación:\n${donation.description}`);
    }
}

// Función para resetear el formulario
function resetForm() {
    donationForm.reset();
    imagePreview.style.display = 'none';
    dropZone.style.display = 'block';
    document.getElementById('description').value = '';
}