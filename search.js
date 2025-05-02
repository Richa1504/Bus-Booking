
document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('loading').style.display = 'block';
  
    const body = {
      from: document.getElementById('from').value,
      to: document.getElementById('to').value,
      date: document.getElementById('journeyDate').value,
    };
  
    const res = await fetch('https://uat.travl.tech/api/bus/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });
  
    const data = await res.json();
    localStorage.setItem('busList', JSON.stringify(data));
    window.location.href = 'buses.html';
  });
  