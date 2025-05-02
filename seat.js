
const seatMapContainer = document.getElementById('seatMapContainer');
const selectedSeatsDisplay = document.getElementById('selectedSeats');
const totalFareDisplay = document.getElementById('totalFare');
const continueBtn = document.getElementById('continueBtn');

const selectedBus = JSON.parse(localStorage.getItem('selectedBus'));
const selectedSeats = new Set();
let seatFare = selectedBus?.fare || 0;

// Choose random layout between 1 and 4 for demo
const layoutResp = Math.ceil(Math.random() * 4);
fetch(`https://uat.travl.tech/api/bus/seatmap?resp=${layoutResp}`, {
  method: 'POST',
})
  .then(res => res.json())
  .then(data => {
    const seats = data?.data?.seats || [];

    seats.forEach(seat => {
      const seatEl = document.createElement('div');
      seatEl.classList.add('seat');
      seatEl.dataset.number = seat.number;
      seatEl.title = `Seat: ${seat.number}, Fare: ₹${seatFare}`;

      if (seat.available) {
        seatEl.classList.add('available');
        seatEl.addEventListener('click', () => toggleSeat(seat.number, seatEl));
      } else {
        seatEl.classList.add('booked');
      }

      seatMapContainer.appendChild(seatEl);
    });
  });

function toggleSeat(seatNumber, seatEl) {
  if (selectedSeats.has(seatNumber)) {
    selectedSeats.delete(seatNumber);
    seatEl.classList.remove('selected');
  } else {
    selectedSeats.add(seatNumber);
    seatEl.classList.add('selected');
  }

  updateSelectionUI();
}

function updateSelectionUI() {
  const seatArr = Array.from(selectedSeats);
  selectedSeatsDisplay.textContent = seatArr.length ? seatArr.join(', ') : 'None';
  totalFareDisplay.textContent = seatArr.length * seatFare;
  continueBtn.disabled = seatArr.length === 0;
}

continueBtn.addEventListener('click', () => {
  localStorage.setItem('selectedSeats', JSON.stringify([...selectedSeats]));
  localStorage.setItem('totalFare', totalFareDisplay.textContent);
  window.location.href = 'passenger.html';
});
