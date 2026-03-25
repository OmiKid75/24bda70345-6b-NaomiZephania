import axios from 'axios';

const SOLARWINDS_URL = 'https://logs.collector.solarwinds.com/v1/logs';
const token = process.env.SOLARWINDS_TOKEN || '';

export async function sendToSolarWinds(logEntry) {
  if (!token) return; 

  try {
    await axios.post(SOLARWINDS_URL, logEntry, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('Failed to send log to SolarWinds:', err.message);
  }
}
