// Array of contact objects
const contacts = [
    { name: "National Emergency Helpline", phone: "112", org: "Government of India" },
    { name: "Police", phone: "100", org: "Government of India" },
    { name: "Ambulance", phone: "108", org: "Government of India" },
    { name: "Fire Brigade", phone: "101", org: "Government of India" },
    { name: "Women Helpline", phone: "1091", org: "Government of India" },
    { name: "Child Helpline", phone: "1098", org: "Childline India" },
    { name: "Doctors For You (India)", phone: "+91 11 2345 6789", org: "Medical NGO" }
];

// Function to render contacts
function renderContacts(filterText = "") {
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = "";

    const searchText = filterText.toLowerCase().trim();

    // Filter contacts
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchText) ||
        contact.phone.includes(searchText) ||
        contact.org.toLowerCase().includes(searchText)
    );

    // Show results
    if (filteredContacts.length === 0) {
        contactList.innerHTML = "<li>No results found</li>";
        return;
    }

    filteredContacts.forEach(contact => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${contact.name}</strong><br>
            📞 ${contact.phone}<br>
            🏢 ${contact.org}
        `;
        contactList.appendChild(li);
    });
}

// Initial render
renderContacts();

// Search event (better than keyup)
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
    renderContacts(this.value);
});