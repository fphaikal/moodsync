import NodeCache from 'node-cache';

const tokenCache = new NodeCache({ stdTTL: 3600 }); // Cache dengan TTL 1 jam

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

/**
 * Fungsi untuk mendapatkan token Spotify.
 * Menunggu hingga token berhasil diperoleh sebelum dikembalikan.
 */
export async function getSpotifyToken() {
  // Cek token di cache terlebih dahulu
  let token = tokenCache.get('spotify_token');
  if (token) {
    return token;
  }

  // Jika token tidak ada, refresh token dari Spotify API
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch Spotify token: ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Simpan token di cache dengan TTL yang sesuai
    token = data.access_token;
    tokenCache.set('spotify_token', token, data.expires_in);

    return token;
  } catch (error) {
    console.error('Error refreshing Spotify token:', error);
    throw error; // Lempar error agar dapat ditangani di API routes
  }
}
