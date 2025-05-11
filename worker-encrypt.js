export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Cek apakah ada data yang dikirim melalui query parameter
    const mpd = url.searchParams.get('mpd');
    const keyId = url.searchParams.get('keyId');
    const key = url.searchParams.get('key');
    
    if (!mpd || !keyId || !key) {
      return new Response("Data tidak lengkap. Pastikan semua field terisi.", { status: 400 });
    }
    
    // Enkripsi data dengan AES
    const secret = "Maulana123#"; // Kunci rahasia untuk enkripsi dan dekripsi
    const encryptedToken = encryptData({ mpd, keyId, key }, secret);
    
    // Buat URL yang berisi token terenkripsi
    const playerUrl = `https://your-worker-url.workers.dev/player?token=${encodeURIComponent(encryptedToken)}`;
    
    // Redirect ke halaman player dengan token terenkripsi
    return Response.redirect(playerUrl, 302);
  }
};

// Fungsi untuk enkripsi data menggunakan AES
function encryptData(data, secret) {
  const encoder = new TextEncoder();
  const key = encoder.encode(secret);
  
  return crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['encrypt'])
    .then(cryptoKey => {
      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // IV random
      return crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        new TextEncoder().encode(JSON.stringify(data))
      ).then(encrypted => {
        // Kembalikan hasil enkripsi dalam format base64
        const encryptedArray = new Uint8Array(encrypted);
        const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
        return encryptedBase64;
      });
    });
}
