document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const searchBtn = document.getElementById('search-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const patientIdInput = document.getElementById('patient-id-input');
    const resultsSection = document.getElementById('results-section');
    const patientDetailsSection = document.getElementById('patient-details');

    // --- Authentication and Session Management ---
    function checkAuth() {
        if (!localStorage.getItem('isLoggedIn') && window.location.pathname !== '/index.html') {
            window.location.href = 'index.html';
        }
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const biometricId = document.getElementById('biometric-id').value;
            const errorMessage = document.getElementById('error-message');

            // Simple validation: check for a specific hardcoded username and ID
            if (username === 'emtuser' && biometricId === '55555') {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Invalid credentials. Please try again.';
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // --- Dashboard Functionality ---
    if (searchBtn) {
        checkAuth(); // Protect this page
        searchBtn.addEventListener('click', () => {
            const patientId = patientIdInput.value.trim();
            resultsSection.innerHTML = '';
            const patient = getPatientById(patientId);
            
            if (patient) {
                // Display a simple card for the found patient
                const patientCard = document.createElement('div');
                patientCard.className = 'patient-card';
                patientCard.innerHTML = `
                    <h3>${patient.name}</h3>
                    <p><strong>ID:</strong> ${patient.id}</p>
                `;
                patientCard.addEventListener('click', () => {
                    localStorage.setItem('currentPatientId', patient.id);
                    window.location.href = 'patient-history.html';
                });
                resultsSection.appendChild(patientCard);
            } else {
                resultsSection.innerHTML = '<p class="error-message">Patient not found. Please check the ID.</p>';
            }
        });
    }

    // --- Patient History Functionality ---
    if (patientDetailsSection) {
        checkAuth(); // Protect this page
        const patientId = localStorage.getItem('currentPatientId');
        const patient = getPatientById(patientId);

        if (patient) {
            recordAccess('emtuser', patient.id); // Simulate an audit log entry
            patientDetailsSection.innerHTML = `
                <h2>${patient.name} (${patient.age})</h2>
                <h3>Allergies</h3>
                <ul>
                    ${patient.allergies.map(allergy => `<li>${allergy}</li>`).join('')}
                </ul>
                <h3>Chronic Conditions</h3>
                <ul>
                    ${patient.chronicConditions.map(condition => `<li>${condition}</li>`).join('')}
                </ul>
                <h3>Current Medications</h3>
                <ul>
                    ${patient.currentMedications.map(med => `<li>${med}</li>`).join('')}
                </ul>
                <h3>Emergency Contacts</h3>
                <ul>
                    ${patient.emergencyContacts.map(contact => `<li>${contact.name} (${contact.relationship}): ${contact.phone}</li>`).join('')}
                </ul>
            `;
        } else {
            patientDetailsSection.innerHTML = `<p class="error-message">No patient data found. Please return to the dashboard.</p>`;
        }
    }
});