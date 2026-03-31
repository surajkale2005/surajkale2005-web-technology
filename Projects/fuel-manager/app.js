// ======================== GLOBAL STATE ========================
let remainingFuel = { petrol: 0, diesel: 0 };
let averages = { petrol: 40, diesel: 35 };          // fixed defaults
let transactions = [];
let nextId = 100;

// Temporary storage for a pending pump request
let pendingRequest = null;   // { fuelType, liters, billNumber }

// ---------- IIFE: initial demo data ----------
(function initializeDemoData() {
    addFuelTransaction("petrol", 4, "Initial fill");
    const dist = 15;
    const avgUsed = averages.petrol;
    const consumed = dist / avgUsed;
    if (remainingFuel.petrol >= consumed) {
        remainingFuel.petrol -= consumed;
        addTravelTransaction("petrol", dist, consumed, `Trip ${dist}km (avg ${avgUsed})`);
    } else {
        console.warn("not enough fuel for demo travel");
    }
    renderAll();
})();

// ========== Helper functions ==========
function validateNumber(value, fieldName) {
    let num = Number(value);
    if (isNaN(num) || typeof num !== "number") throw new Error(`${fieldName} must be a valid number`);
    if (num <= 0 && fieldName.includes("liters") && fieldName !== "distance") throw new Error(`${fieldName} > 0 required`);
    return num;
}

function addFuelTransaction(fuelType, liters, remark = "") {
    if (liters <= 0) return false;
    remainingFuel[fuelType] = +(remainingFuel[fuelType] + liters).toFixed(3);
    const transaction = {
        id: nextId++,
        type: "FILL",
        fuelType: fuelType,
        detail: remark || `Added ${liters}L ${fuelType}`,
        delta: +liters,
        date: new Date().toLocaleString(),
        litersAdded: liters
    };
    transactions.unshift(transaction);
    return true;
}

function addTravelTransaction(fuelType, distanceKm, consumedFuel, detailMsg) {
    const transaction = {
        id: nextId++,
        type: "TRIP",
        fuelType: fuelType,
        detail: detailMsg || `${distanceKm} km traveled`,
        delta: -consumedFuel,
        date: new Date().toLocaleString(),
        distance: distanceKm,
        fuelUsed: consumedFuel
    };
    transactions.unshift(transaction);
    return true;
}

function recordTravel(fuelType, distanceKm, customAvg = null) {
    let avgValue = customAvg && customAvg > 0 ? customAvg : averages[fuelType];
    if (!avgValue || avgValue <= 0) throw new Error(`Invalid average for ${fuelType}`);
    const consumed = distanceKm / avgValue;
    if (consumed <= 0) throw new Error("Consumed fuel near zero");
    if (remainingFuel[fuelType] < consumed) {
        throw new Error(`Insufficient ${fuelType}! Remaining: ${remainingFuel[fuelType].toFixed(2)}L, need ${consumed.toFixed(3)}L`);
    }
    remainingFuel[fuelType] = +(remainingFuel[fuelType] - consumed).toFixed(3);
    addTravelTransaction(fuelType, distanceKm, consumed, `🚴 Trip ${distanceKm}km | avg:${avgValue} km/l → used ${consumed.toFixed(3)}L`);
    return consumed;
}

// ========== Stats ==========
function computeStats() {
    const totalFuelConsumed = transactions
        .filter(t => t.type === "TRIP")
        .reduce((sum, t) => sum + Math.abs(t.delta), 0);
    const totalDistance = transactions
        .filter(t => t.type === "TRIP")
        .reduce((sum, t) => sum + (t.distance || 0), 0);
    const totalFilled = transactions
        .filter(t => t.type === "FILL")
        .reduce((sum, t) => sum + (t.litersAdded || t.delta), 0);
    return { totalFuelConsumed: totalFuelConsumed.toFixed(2), totalDistance: totalDistance.toFixed(1), totalFilled: totalFilled.toFixed(2) };
}

// ========== Render Functions ==========
function renderDashboard() {
    const stats = computeStats();
    const warningPetrol = remainingFuel.petrol <= 2;
    const warningDiesel = remainingFuel.diesel <= 2;
    const dashboardHtml = `
        <div class="card ${warningPetrol ? 'fuel-warning' : ''}">
            <h3>⛽ PETROL REMAINING</h3>
            <div class="value">${remainingFuel.petrol.toFixed(2)} L</div>
            <small>${warningPetrol ? '⚠️ Low! ≤2 liters left' : '✅ Sufficient'}</small>
        </div>
        <div class="card ${warningDiesel ? 'fuel-warning' : ''}">
            <h3>🛢️ DIESEL REMAINING</h3>
            <div class="value">${remainingFuel.diesel.toFixed(2)} L</div>
            <small>${warningDiesel ? '⚠️ Low! ≤2 liters left' : '✅ OK'}</small>
        </div>
        <div class="card">
            <h3>📊 TOTAL DISTANCE</h3>
            <div class="value">${stats.totalDistance} km</div>
            <small>all trips combined</small>
        </div>
        <div class="card">
            <h3>🔥 TOTAL FUEL CONSUMED</h3>
            <div class="value">${stats.totalFuelConsumed} L</div>
            <small>map/filter/reduce applied</small>
        </div>
    `;
    document.getElementById("dashboardStats").innerHTML = dashboardHtml;
}

function renderLogs() {
    const tbody = document.getElementById("logTableBody");
    if (!transactions.length) {
        tbody.innerHTML = "<tr><td colspan='6'>No transactions yet. Add fuel or travel!</td></tr>";
        return;
    }
    const rows = transactions.map(trans => {
        const { id, type, fuelType, detail, delta, date } = trans;
        const deltaFormatted = (delta >= 0 ? `+${delta.toFixed(2)}` : `${delta.toFixed(2)}`);
        const typeIcon = type === "FILL" ? "⛽ FILL" : "🏍️ TRIP";
        return `
            <tr>
                <td>${id}</td>
                <td>${typeIcon}</td>
                <td>${fuelType.toUpperCase()}</td>
                <td>${detail}</td>
                <td style="font-weight:bold; color:${delta>=0?'#2c7da0':'#e67e22'}">${deltaFormatted} L</td>
                <td>${date}</td>
            </tr>
        `;
    }).join('');
    tbody.innerHTML = rows;
}

function renderAll() {
    renderDashboard();
    renderLogs();
    // Update request panel status message
    const petrolLow = remainingFuel.petrol <= 2;
    const dieselLow = remainingFuel.diesel <= 2;
    let warnMsg = "";
    if (petrolLow) warnMsg += "⚠️ Petrol low (≤2L). ";
    if (dieselLow) warnMsg += "⚠️ Diesel low (≤2L). ";
    const statusDiv = document.getElementById("requestStatus");
    if (statusDiv && warnMsg) statusDiv.innerHTML = `🔥 ${warnMsg} You can request fuel from nearest pump.`;
    else if (statusDiv) statusDiv.innerHTML = `✅ Fuel levels OK. (request if needed)`;
}

// ========== Event Handlers ==========
document.getElementById("addFuelBtn").addEventListener("click", () => {
    const fuelType = document.getElementById("fuelTypeFill").value;
    let liters = parseFloat(document.getElementById("fillLiters").value);
    try {
        liters = validateNumber(liters, "liters");
        addFuelTransaction(fuelType, liters, `User filled ${liters}L ${fuelType}`);
        renderAll();
        document.getElementById("fillLiters").value = "";
    } catch (err) {
        alert(err.message);
    }
});

document.getElementById("addTravelBtn").addEventListener("click", () => {
    const fuelType = document.getElementById("travelFuelType").value;
    let distance = parseFloat(document.getElementById("distanceKm").value);
    let customAvgVal = parseFloat(document.getElementById("customAvg").value);
    try {
        distance = validateNumber(distance, "distance");
        if (isNaN(customAvgVal)) customAvgVal = null;
        recordTravel(fuelType, distance, customAvgVal);
        renderAll();
        document.getElementById("distanceKm").value = "";
        document.getElementById("customAvg").value = "";
    } catch (err) {
        alert(`Travel error: ${err.message}`);
    }
});

// ==================== Enhanced Pump Request with Manual Confirmation ====================
function requestFuelFromPump(fuelType, requestedLiters) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const billId = `BILL-${fuelType.toUpperCase()}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
            const finalBill = `#${billId}`;
            resolve({ success: true, billNumber: finalBill, fuelType, liters: requestedLiters });
        }, 1500);
    });
}

async function handleSendRequest() {
    const requestBtn = document.getElementById("sendRequestBtn");
    const statusDiv = document.getElementById("requestStatus");
    const fuelType = document.getElementById("requestFuelType").value;
    let reqLiters = parseFloat(document.getElementById("requestLiters").value);
    
    if (isNaN(reqLiters) || reqLiters <= 0) {
        statusDiv.innerHTML = "❌ Please enter valid positive liters.";
        return;
    }
    
    const currentRemaining = remainingFuel[fuelType];
    if (currentRemaining > 2) {
        statusDiv.innerHTML = `⚠️ ${fuelType.toUpperCase()} remaining ${currentRemaining.toFixed(2)}L > 2L. Request only when ≤2L (demo rule).`;
        return;
    }
    
    statusDiv.innerHTML = `📡 Sending request to nearest pump for ${reqLiters}L of ${fuelType}... Please wait.`;
    requestBtn.disabled = true;
    
    try {
        const pumpResponse = await requestFuelFromPump(fuelType, reqLiters);
        if (pumpResponse.success) {
            // Store pending request details
            pendingRequest = {
                fuelType: pumpResponse.fuelType,
                liters: pumpResponse.liters,
                billNumber: pumpResponse.billNumber
            };
            statusDiv.innerHTML = `✅ Pump accepted! Bill: <strong class="bill">${pumpResponse.billNumber}</strong>. Click "Confirm Receipt" to add fuel.`;
            // Show confirmation buttons
            document.getElementById("confirmReceiptArea").style.display = "flex";
            document.getElementById("confirmReceiptArea").style.gap = "10px";
        } else {
            statusDiv.innerHTML = `❌ Pump rejected request. Try again.`;
        }
    } catch (error) {
        statusDiv.innerHTML = `⚠️ Network error: ${error.message}`;
    } finally {
        requestBtn.disabled = false;
    }
}

function confirmReceipt() {
    if (!pendingRequest) return;
    const { fuelType, liters, billNumber } = pendingRequest;
    // Add fuel to remaining
    remainingFuel[fuelType] = +(remainingFuel[fuelType] + liters).toFixed(3);
    // Log transaction with bill number
    const transaction = {
        id: nextId++,
        type: "FILL",
        fuelType: fuelType,
        detail: `✅ Pump delivery confirmed | Bill: ${billNumber} | ${liters}L received`,
        delta: +liters,
        date: new Date().toLocaleString(),
        litersAdded: liters,
        bill: billNumber
    };
    transactions.unshift(transaction);
    renderAll();
    
    // Clear pending and hide confirmation buttons
    pendingRequest = null;
    document.getElementById("confirmReceiptArea").style.display = "none";
    document.getElementById("requestStatus").innerHTML = `🎉 Fuel added! ${liters}L of ${fuelType} now in tank.`;
    document.getElementById("requestLiters").value = "";
}

function cancelReceipt() {
    pendingRequest = null;
    document.getElementById("confirmReceiptArea").style.display = "none";
    document.getElementById("requestStatus").innerHTML = `❌ Receipt cancelled. No fuel added.`;
    document.getElementById("requestLiters").value = "";
}

document.getElementById("sendRequestBtn").addEventListener("click", handleSendRequest);
document.getElementById("confirmReceiptBtn").addEventListener("click", confirmReceipt);
document.getElementById("cancelReceiptBtn").addEventListener("click", cancelReceipt);

// ========== Additional Demos (unchanged) ==========
(function showObjectLoop() {
    let summary = "Averages: ";
    for(let key in averages) {
        summary += `${key}:${averages[key]}km/l `;
    }
    console.log("Object loop demo (for...in):", summary);
})();

function extraDemoForEach() {
    let totalDist = 0;
    transactions.forEach(t => { if(t.type === "TRIP") totalDist += (t.distance || 0); });
    console.log(`[forEach] total distance: ${totalDist} km`);
}
extraDemoForEach();

console.log("💡 Stack: primitives (remainingFuel values), Heap: transactions array & objects");
(function demonstrateBlockScope() {
    if(true) {
        let blockScopedMsg = "inside block (let)";
        console.log(blockScopedMsg);
    }
})();

renderAll();