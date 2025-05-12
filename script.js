  const playerList = {
    // BEIN SPORTS
    "bein1": "https://labolatv.pages.dev/player2.html?data=U2FsdGVkX194pSW%2BhpKfwQ1sGdKbrIFDkVqy1KlNWURu%2BIRKSwMYPTN17%2FtpjkkRlaeM60hjn5FQ%2B1CE86iLE64hDyTWXUHFA%2BvoR4bylgE%3D",
    "bein1a": "https://labolatv.pages.dev/player2.html?data=U2FsdGVkX1%2FVJjGN%2B6eICdiUkNm5pZRDMnBPqK12%2BLIu8wvgA0nfP6ge8SzmhvvYVimIEiTI%2BmMvvyiU%2Fpt2NPecVK%2FuGHw4%2FoCmOeBo%2BkQ%3D",
    "bein2": "https://labolatv.pages.dev/player2.html?data=U2FsdGVkX18QWUtObbfEkAWsTSWPMGOB2rFXskPHZos03UMdRIFWNCpAS%2F%2Fj7Y2uct2I05G8GmCJvALi37pdXPlr%2FuJrCgquNlpgDT%2BI3z0%3D"
  };

  document.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash.substring(1); // Ambil ID dari URL
    const iframeURL = playerList[hash];

    if (iframeURL) {
      const iframe = `
        <div class="match-schedule">
          <iframe 
            src="${iframeURL}" 
            allow="encrypted-media; autoplay"
            width="100%" 
            height="360" 
            frameborder="0" 
            allowfullscreen
            style="border-radius: 10px; max-width: 100%;">
          </iframe>
        </div>
      `;
      document.getElementById("player-container").innerHTML = iframe;
    } else {
      document.getElementById("player-container").innerHTML = `
        <div class="match-schedule">
          <p style="color: red; text-align: center;">Player tidak ditemukan.</p>
        </div>
      `;
    }
  });
