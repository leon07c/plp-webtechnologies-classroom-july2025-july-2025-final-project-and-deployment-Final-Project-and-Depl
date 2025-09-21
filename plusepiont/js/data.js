// This file simulates a database of patient records.
// In a real application, this data would be fetched securely from a server.

const patientRecords = [
    {
        id: "123456",
        name: "Jane Doe",
        age: 45,
        allergies: ["Penicillin", "Bees"],
        chronicConditions: ["Hypertension"],
        currentMedications: ["Lisinopril"],
        emergencyContacts: [
            { name: "John Doe", relationship: "Husband", phone: "555-123-4567" }
        ]
    },
    {
        id: "789012",
        name: "Peter Jones",
        age: 28,
        allergies: ["None"],
        chronicConditions: ["Asthma"],
        currentMedications: ["Albuterol Inhaler"],
        emergencyContacts: [
            { name: "Sarah Jones", relationship: "Mother", phone: "555-987-6543" }
        ]
    }
    // Add more patient records here...
];

function getPatientById(id) {
    return patientRecords.find(patient => patient.id === id);
}

function recordAccess(userId, patientId) {
    // In a real app, this would send data to an audit log on the server.
    console.log(`AUDIT LOG: User '${userId}' accessed patient ID '${patientId}' at ${new Date().toISOString()}`);
}