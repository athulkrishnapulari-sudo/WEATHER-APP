

const statusText = document.getElementById('status');
const manualInput = document.getElementById('manual-input');
const resultDisplay = document.getElementById('location-result');

// Helper: Detect if user is on mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 1. Run on Page Load
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGPS, failGPS);
    } else {
        failGPS();
    }
});

// 2. Success: We got the coordinates
async function successGPS(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // Get the City Name using Reverse Geocoding
    const cityName = await getCityFromCoords(lat, lon);
    displayData(lat, lon, cityName);
}

// 3. Failure: Show the manual input with device-specific message
function failGPS() {
    if (isMobileDevice()) {
        // Mobile-specific message
        statusText.innerHTML = `
            <div style="text-align: center; padding: 15px;">
                <strong>📍 Location Access Disabled</strong><br>
                <p style="margin: 10px 0; font-size: 14px;">To use auto-location, please enable location services:</p>
                <ul style="text-align: left; display: inline-block; margin: 10px 0;">
                    <li><strong>iOS:</strong> Settings → Apps → Weather App → Location → Allow</li>
                    <li><strong>Android:</strong> Settings → Apps → Weather App → Permissions → Location → Allow</li>
                </ul>
                <p style="margin: 10px 0; font-size: 14px;">Or search manually below:</p>
            </div>
        `;
    } else {
        // Desktop message
        statusText.innerText = "Location access denied. Please enable location permissions in your browser settings.";
    }
    manualInput.style.display = "block";
}

// 4. Manual Search Function
async function handleManualSearch() {
    const city = document.getElementById('city-input').value;
    if (!city) return;

    statusText.innerText = `Searching for ${city}...`;
    
    // Get coordinates from a City Name (Forward Geocoding)
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${city}&limit=1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            displayData(data[0].lat, data[0].lon, data[0].display_name);
        } else {
            statusText.innerText = "City not found. Try again.";
        }
    } catch (err) {
        statusText.innerText = "Error connecting to location service.";
    }
}

// 5. Helper: Convert Lat/Lon to City Name
async function getCityFromCoords(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.address.city || data.address.town || data.address.village || "Unknown Area";
    } catch (err) {
        return "Unknown Location";
    }
}

// 6. Final Display Logic
function displayData(lat, lon, name) {
    resultDisplay.innerText = name.toUpperCase();
}




function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'TH'; // Covers 11th, 12th, 13th, etc.
  switch (day % 10) {
    case 1:  return "ST";
    case 2:  return "ND";
    case 3:  return "RD";
    default: return "TH";
  }
}
function startLiveClock() {
  const timeDisplay = document.getElementById("current-time");
  const dateDisplay = document.getElementById("current-date");
  const dateDisplay2 = document.getElementById("current-date2");

  setInterval(() => {
    const now = new Date();

    // --- TIME ACCESS ---
    // Use padStart(2, '0') to ensure 1:05:08 instead of 1:5:8
    let hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    hrs = String(parseInt(hrs) % 12).padStart(2, '0');
    hrs = parseInt(hrs) ? hrs : String(12).padStart(2, '0'); // Convert '0' to '12' for 12-hour format
        
    const secs = String(now.getSeconds()).padStart(2, '0');

    // --- DATE ACCESS ---
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const dayName = dayNames[now.getDay()];      // Day of week (e.g., Tuesday)
    const date = now.getDate();                  // Day of month (e.g., 3)
    const monthName = monthNames[now.getMonth()]; // Month (e.g., March)
    const year = now.getFullYear();              // Year (e.g., 2026)

    // --- DISPLAY ---
    if (timeDisplay) {
      timeDisplay.textContent = `${hrs}:${mins} ${now.getHours() >= 12 ? "PM" : "AM"}`;
    }
    if (dateDisplay) {
    dateDisplay.textContent = `${dayName.toUpperCase()},`;
    const suffix = getOrdinalSuffix(date);
    dateDisplay2.textContent = `${date}${suffix} ${monthName.toUpperCase()} `
    }
  }, 1000);
}

// Call the function to start the clock
startLiveClock();