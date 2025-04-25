const API_BASE = 'https://zalocator-production.up.railway.app/api/business';

export const fetchBusinesses = async () => (await fetch(API_BASE)).json();
export const fetchByCity = async city => (await fetch(`${API_BASE}/city/${city}`)).json();
export const createBusiness = async data => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};