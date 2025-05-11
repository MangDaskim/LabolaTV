export default {
  async fetch(request) {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response("Token tidak ditemukan", { status: 400 });
    }

    // Dekripsi token
    const secret = "Maulana123#"; // Kunci yang sama digunakan untuk enkripsi
    const decryptedData = await decryptData(decodeURIComponent(token), secret);
    
    const data = JSON.parse(decryptedData);

    const html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Secure Video Player</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.3.5/shaka-player.compiled.min.js"></script>
  <style>
    body, html { margin: 0; padding: 0; background: black; height: 100vh; }
  </style>
</head>
<body>
  <div class="relative w-full h-screen">
    <video id="video" class="w-full h-full" autoplay controls></video>
  </div>
  <script>
    shaka.polyfill.installAll();
    const player = new shaka.Player(document.getElementById('video'));
    player.configure({
      drm: {
        clearKeys: {
          "${data.keyId}": "${data.key}"
        }
      }
    });
    player.load("${data.mpd}");
  </script>
</body>
</html>
    `;

    return new Response(html, { headers: { "content-type": "text/html" } });
  }
};

// Fungsi untuk dekripsi AES
async function decryptData(token, secret) {
  const key = new TextEncoder().encode(secret);
  const data = atob(token);
  const encryptedArray = new Uint8Array([...data].map(c => c.charCodeAt(0)));

  const iv = new Uint8Array(12); // IV kosong

  const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['decrypt']);
  
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, cryptoKey, encryptedArray);
  return new TextDecoder().decode(decrypted);
}
