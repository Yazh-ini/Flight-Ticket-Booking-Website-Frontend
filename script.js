// Mock data for available flights
const flights = [
    { id: 1, name: "Flight: Air India", time: "10.00 AM", cost: "$100" },
    { id: 2, name: "Flight: Air Decan", time: "12.00 PM", cost: "$150" },
];

// Mock booked seats
const bookedSeats = ["A1", "A2", "B1"];

// Show and hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none'); // Hide all sections
    document.getElementById(sectionId).style.display = 'block'; // Show selected section
}

// Check availability of flights based on user input
function checkAvailability() {
    // Validate form fields
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const passengers = document.getElementById('passengers').value;

    if (!source || !destination || !date || !passengers) {
        alert("Please fill in all fields.");
        return;
    }

    // Clear previous options
    const flightSelect = document.getElementById('flight-select');
    flightSelect.innerHTML = '';

    // Display available flights
    flights.forEach(flight => {
        const option = document.createElement('option');
        option.value = flight.id;
        option.textContent = `${flight.name} | Time: ${flight.time} | Cost: ${flight.cost}`;
        flightSelect.appendChild(option);
    });

    // Show flight options if any
    if (flightSelect.options.length > 0) {
        document.getElementById('flight-options').style.display = 'block';
    } else {
        alert("No flights available for the selected route.");
    }
}

function goToSeatSelection() {
    document.getElementById('flight-options').style.display = 'none';
    document.getElementById('seat-selection').style.display = 'block';
    createSeatMap();
}

function createSeatMap() {
    const seatMap = document.getElementById('seat-map');
    seatMap.innerHTML = ''; // Clear previous seats

    const rows = ['A', 'B', 'C']; // Example rows
    const seatsPerRow = 3;

    rows.forEach(row => {
        for (let i = 1; i <= seatsPerRow; i++) {
            const seat = document.createElement('div');
            seat.textContent = `${row}${i}`;
            seat.className = 'seat';
            if (bookedSeats.includes(seat.textContent)) {
                seat.classList.add('booked'); // Mark booked seats
            } else {
                seat.onclick = function () {
                    seat.classList.toggle('selected'); // Toggle seat selection
                };
            }
            seatMap.appendChild(seat);
        }
    });
}

function proceedToPayment() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat!");
        return;
    }

    document.getElementById('seat-selection').style.display = 'none';
    document.getElementById('payment').style.display = 'block';
}


function confirmBooking() {
    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCVV = document.getElementById('card-cvv').value;

    // Validate that all payment fields are filled
    if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
        alert("Please fill in all payment details!");
        return;
    }

    // Optional: Additional validation (e.g., card number length, CVV format, etc.)
    if (cardNumber.length !== 16) {
        alert("Card number must be 16 digits.");
        return;
    }
    if (cardCVV.length !== 3) {
        alert("CVV must be 3 digits.");
        return;
    }

    // Proceed with booking
    const selectedSeats = Array.from(document.querySelectorAll('.seat.selected')).map(seat => seat.textContent);
    const ticketDetails = `Source: ${document.getElementById('source').value}, 
                          Destination: ${document.getElementById('destination').value}, 
                          Date: ${document.getElementById('date').value}, 
                          Passengers: ${document.getElementById('passengers').value}, 
                          Seats: ${selectedSeats.join(', ')}`;

    document.getElementById('payment').style.display = 'none';
    document.getElementById('ticket').style.display = 'block';
    document.getElementById('ticket-details').textContent = ticketDetails;
}
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic form validation (you can extend this)
    if (name === "" || email === "" || message === "") {
        document.getElementById('form-status').innerHTML = "Please fill out all fields.";
        document.getElementById('form-status').style.color = "red";
    } else {
        document.getElementById('form-status').innerHTML = "Thank you for contacting us, " + name + "!";
        document.getElementById('form-status').style.color = "green";

        // Reset form after submission
        document.getElementById('contact-form').reset();
    }
});
