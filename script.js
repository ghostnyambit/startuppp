// Digital Clock for GMT+7 (Jakarta)
function updateClock() {
    const now = new Date();
    
    // Adjust for GMT+7
    const jakartaTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
    
    const hours = jakartaTime.getHours().toString().padStart(2, '0');
    const minutes = jakartaTime.getMinutes().toString().padStart(2, '0');
    const seconds = jakartaTime.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = jakartaTime.toLocaleDateString('en-US', options);
}

// Mini Calendar
function renderMiniCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    
    // Get first day of month and total days in month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get days from previous month to show
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    const calendarEl = document.getElementById('calendar');
    calendarEl.innerHTML = '';
    
    // Day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        calendarEl.appendChild(dayHeader);
    });
    
    // Days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayEl = document.createElement('div');
        dayEl.className = 'day other-month';
        dayEl.textContent = prevMonthDays - i;
        calendarEl.appendChild(dayEl);
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'day';
        dayEl.textContent = i;
        
        if (i === today) {
            dayEl.classList.add('today');
        }
        
        calendarEl.appendChild(dayEl);
    }
    
    // Days from next month to fill the grid
    const totalCells = 42; // 6 rows x 7 days
    const remainingCells = totalCells - (firstDay + daysInMonth);
    
    for (let i = 1; i <= remainingCells; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'day other-month';
        dayEl.textContent = i;
        calendarEl.appendChild(dayEl);
    }
}

// Weather Data for Banyuwangi
async function fetchWeather() {
    try {
        // Note: In a real implementation, you would use a weather API
        // This is a mock implementation with placeholder data
        const mockWeather = {
            temperature: 28,
            conditions: "Partly Cloudy",
            humidity: 78,
            windSpeed: 12,
            icon: "cloud-sun"
        };
        
        document.getElementById('temperature').textContent = `${mockWeather.temperature}°C`;
        document.getElementById('conditions').textContent = mockWeather.conditions;
        document.getElementById('humidity').innerHTML = `<i class="fas fa-droplet"></i> ${mockWeather.humidity}%`;
        document.getElementById('wind').innerHTML = `<i class="fas fa-wind"></i> ${mockWeather.windSpeed} km/h`;
        document.getElementById('weather-icon').className = `fas fa-${mockWeather.icon}`;
        
        // Real API implementation would look like:
        // const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Banyuwangi,ID&units=metric&appid=YOUR_API_KEY');
        // const data = await response.json();
        // Process real data here...
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('conditions').textContent = "Weather data unavailable";
    }
}

// Initialize everything
function init() {
    updateClock();
    renderMiniCalendar();
    fetchWeather();
    
    // Update clock every second
    setInterval(updateClock, 1000);
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);