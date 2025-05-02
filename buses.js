document.addEventListener('DOMContentLoaded', () => {
    const busListContainer = document.getElementById('busList');
    const loading = document.getElementById('loading');
    const priceFilter = document.getElementById('priceFilter');
    const priceValue = document.getElementById('priceValue');
  
    const buses = JSON.parse(localStorage.getItem('busList'))?.data || [];
  
    // Set initial price filter
    priceValue.textContent = priceFilter.value;
  
    function renderBuses(busesToRender) {
      busListContainer.innerHTML = '';
  
      if (busesToRender.length === 0) {
        busListContainer.innerHTML = '<p>No buses found.</p>';
        return;
      }
  
      busesToRender.forEach((bus, index) => {
        const card = document.createElement('div');
        card.className = 'bus-card';
        card.innerHTML = `
          <h3>${bus.travelsName}</h3>
          <p>Departure: ${bus.departureTime}</p>
          <p>Fare: ₹${bus.fare}</p>
          <button onclick="selectBus(${index})">Select Seats</button>
        `;
        busListContainer.appendChild(card);
      });
    }
  
    function selectBus(index) {
      localStorage.setItem('selectedBus', JSON.stringify(buses[index]));
      window.location.href = 'seats.html';
    }
  
    priceFilter.addEventListener('input', () => {
      priceValue.textContent = priceFilter.value;
      const filtered = buses.filter(bus => bus.fare <= parseInt(priceFilter.value));
      renderBuses(filtered);
    });
  
    loading.style.display = 'block';
    setTimeout(() => {
      loading.style.display = 'none';
      renderBuses(buses);
    }, 800); // simulate loading delay
  });
  