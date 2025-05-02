
const passenger = JSON.parse(localStorage.getItem('passengerData'));
const bus = JSON.parse(localStorage.getItem('selectedBus'));
const seats = JSON.parse(localStorage.getItem('selectedSeats'));
const totalFare = localStorage.getItem('totalFare');

document.getElementById('passengerName').textContent = passenger.name;
document.getElementById('passengerAge').textContent = passenger.age;
document.getElementById('passengerGender').textContent = passenger.gender;
document.getElementById('passengerEmail').textContent = passenger.email;
document.getElementById('passengerPhone').textContent = passenger.phone;

document.getElementById('busName').textContent = bus.travelsName;
document.getElementById('seatNumbers').textContent = seats.join(', ');
document.getElementById('fareAmount').textContent = totalFare;

// Generate fake booking reference
// const bookingRef = 'BK' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
// document.getElementById('bookingRef').textContent = bookingRef;

document.getElementById('bookingRef').textContent =
  localStorage.getItem('bookingRef') || 'REF123456';


