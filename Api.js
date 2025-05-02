const BASE_URL = "https://www.intrcity.com/api/bus";

export async function fetchBuses(payload) {
  const response = await fetch(`${BASE_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return response.json();
}

export async function fetchSeatMap(resp = 1) {
  const response = await fetch(`${BASE_URL}/seatmap?resp=${resp}`, {
    method: "POST"
  });
  return response.json();
}

export async function tempBook(payload) {
  const response = await fetch(`${BASE_URL}/temp-book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return response.json();
}

export async function confirmBookingStep1(payload) {
  const response = await fetch(`${BASE_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return response.json();
}

export async function confirmFinalBooking(payload) {
  const response = await fetch(`${BASE_URL}/confirm-book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return response.json();
}
