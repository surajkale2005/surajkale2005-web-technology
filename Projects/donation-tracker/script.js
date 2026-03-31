const goal = 4000000;
let donations = JSON.parse(localStorage.getItem("warDonations")) || [];

function updateUI() {
    const total = donations.reduce((sum, d) => sum + d.amount, 0);
    const percent = Math.min((total / goal) * 100, 100);

    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("totalDisplay").innerText =
        `Total Donated: ₹${total.toLocaleString()}`;

    const list = document.getElementById("donationList");
    list.innerHTML = donations.map(d =>
        `<li>₹${d.amount} - ${d.name} (${d.date})</li>`
    ).join("");

    localStorage.setItem("warDonations", JSON.stringify(donations));
}

// 🧾 SHOW RECEIPT (NO DOWNLOAD)
function showReceipt(donation) {
    const receiptText = `
Donor Name: ${donation.name}
Amount: ₹${donation.amount}
Date: ${donation.date}

❤️ Thank you for your support!
    `;

    document.getElementById("receiptText").innerText = receiptText;
    document.getElementById("receiptModal").style.display = "block";
}

function closeReceipt() {
    document.getElementById("receiptModal").style.display = "none";
}

document.getElementById("donateBtn").addEventListener("click", () => {
    const amountInput = document.getElementById("donationAmount");
    const nameInput = document.getElementById("donorName");

    let amount = parseFloat(amountInput.value);
    let name = nameInput.value.trim();

    if (isNaN(amount) || amount <= 0 || name === "") {
        alert("Enter valid name and amount");
        return;
    }

    const donationObj = {
        name: name,
        amount: amount,
        date: new Date().toLocaleString()
    };

    donations.push(donationObj);
    updateUI();

    // 🧾 Show receipt instead of download
    showReceipt(donationObj);

    amountInput.value = "";
    nameInput.value = "";
});

document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset?")) {
        donations = [];
        updateUI();
    }
});

updateUI();