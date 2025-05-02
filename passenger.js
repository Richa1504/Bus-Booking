// js/passenger.js
const bus = JSON.parse(localStorage.getItem('selectedBus'));
const seats = JSON.parse(localStorage.getItem('selectedSeats'));
const totalFare = localStorage.getItem('totalFare');

document.getElementById('busName').textContent = bus?.travelsName || '';
document.getElementById('seatNumbers').textContent = seats.join(', ');
document.getElementById('fareAmount').textContent = totalFare;

const form = document.getElementById('passengerForm');

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const passengerData = {
//     name: document.getElementById('name').value.trim(),
//     age: parseInt(document.getElementById('age').value),
//     gender: document.getElementById('gender').value,
//     email: document.getElementById('email').value.trim(),
//     phone: document.getElementById('phone').value.trim(),
//   };

//   // Validate before moving on
//   if (!passengerData.name || !passengerData.age || !passengerData.gender || !passengerData.email || !passengerData.phone) {
//     alert('Please fill in all required fields.');
//     return;
//   }

//   localStorage.setItem('passengerData', JSON.stringify(passengerData));
//   window.location.href = 'confirm.html';
// });


form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const passengerData = {
      name: document.getElementById('name').value.trim(),
      age: parseInt(document.getElementById('age').value),
      gender: document.getElementById('gender').value,
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
    };
  
    const tempBookingPayload = {
      busId: bus.id,
      selectedSeats: seats,
      ...passengerData
    };
  
    try {
      const tempRes = await fetch("https://uat.travl.tech/api/bus/temp-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempBookingPayload)
      });
      const tempData = await tempRes.json();
  
      if (!tempData.success) throw new Error("Temp booking failed");
  
      // Optional: mock payment (you can skip this step or simulate success)
      await fetch("https://uat.travl.tech/api/bus/payments", {
        method: "POST",
        body: JSON.stringify({ bookingId: tempData.bookingId }) // example format
      });
  
      const confirmRes = await fetch("https://uat.travl.tech/api/bus/confirm-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: tempData.bookingId })
      });
  
      const confirmData = await confirmRes.json();
      if (!confirmData.success) throw new Error("Booking confirmation failed");
  
      localStorage.setItem("bookingRef", confirmData.bookingRef || "REF123456");
      localStorage.setItem("passengerData", JSON.stringify(passengerData));
      window.location.href = "confirm.html";
  
    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  });
  