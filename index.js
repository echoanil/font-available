document.getElementById("theform").onsubmit = function () {
    const font = document.getElementById("fontInput").value;
    doesFontExist(font);
    return false;
};

// Call this function and pass in the name of the font you want to check for availability.
function doesFontExist(fontName) {
    // creating our in-memory Canvas element where the magic happens
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // the text whose final pixel size I want to measure
    const text = "abcdefghijklmnopqrstuvwxyz0123456789";

    // specifying the baseline font
    context.font = "72px monospace";

    // checking the size of the baseline text
    const baselineSize = context.measureText(text).width;

    // specifying the font whose existence we want to check
    context.font = `72px "${fontName}", monospace`;

    // checking the size of the font we want to check
    const newSize = context.measureText(text).width;

    // removing the Canvas element we created
    delete canvas;

    if (newSize == baselineSize) {
        // Font isn't available
        showPopup("This font isn't available. Bummer.");
    } else {
        // Font is available
        showPopup("Yay. This font is available!");
    }
}

// Show custom popup message
function showPopup(message) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    const content = document.createElement("div");
    content.classList.add("popup-content");
    content.textContent = message;
    popup.appendChild(content);
    document.body.appendChild(popup);

    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);

    popup.style.display = "block";
    overlay.style.display = "block";

    // Close popup after 3 seconds
    setTimeout(() => {
        popup.style.display = "none";
        overlay.style.display = "none";
        document.body.removeChild(popup);
        document.body.removeChild(overlay);
    }, 3000);
}

// Get battery info
navigator.getBattery().then(function (battery) {
    const batteryLevel = Math.floor(battery.level * 100) + "%";
    document.querySelector(".battery").textContent = batteryLevel;
});

// Get network connectivity
function updateNetworkStatus() {
    const isOnline = navigator.onLine;
    const networkIcon = document.querySelector(".network");
    if (isOnline) {
        networkIcon.textContent = "Online";
        networkIcon.style.backgroundColor = "green";
    } else {
        networkIcon.textContent = "Offline";
        networkIcon.style.backgroundColor = "red";
    }
}

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);

// Call the function to initially set the network status
updateNetworkStatus();

// Update time every second
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timeString = `${hours}:${minutes}`;
    document.querySelector(".time").textContent = timeString;
}

setInterval(updateTime, 1000); // Update every second
updateTime(); // Update immediately