const fonts = [
  'Arial, sans-serif',
  'Courier New, monospace',
  'Georgia, serif',
  'Times New Roman, serif',
  'Verdana, sans-serif'
];

const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
document.body.style.fontFamily = randomFont;

fetch('modals.php')
  .then(response => response.json())
  .then(files => {
    files.forEach((file, idx) => {
      const starEl = document.createElement('div');
      starEl.className = 'star';
      starEl.dataset.modal = `#modal${idx}`;
      starEl.style.top = `${Math.random() * 90}%`;
      starEl.style.left = `${Math.random() * 90}%`;
      starEl.style.zIndex = 10; // Ensure yellow stars are on top
      document.body.appendChild(starEl);

      const modalWrapper = document.createElement('div');
      modalWrapper.className = 'modal';
      modalWrapper.id = `modal${idx}`;
      modalWrapper.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <div class="modal-body"></div>
        </div>
      `;
      document.getElementById('modals').appendChild(modalWrapper);

      fetch(`modals/${file}`)
        .then(response => response.text())
        .then(data => {
          modalWrapper.querySelector('.modal-body').innerHTML = data;
        });
    });

    document.querySelectorAll('.star').forEach(star => {
      star.addEventListener('click', () => {
        // Close any open modal
        document.querySelectorAll('.modal').forEach(modal => {
          modal.style.display = 'none';
        });

        const targetModal = document.querySelector(star.dataset.modal);
        if (targetModal) {
          targetModal.style.display = 'block';
        }
      });
    });

    document.querySelectorAll('.close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
      });
    });

    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    });

    // Apply random scaling to gold stars
    document.querySelectorAll('.star:not(.white-star)').forEach(goldStar => {
      const scale = 0.5 + Math.random() * 4.5; // scales 20px base between 10-100px
      goldStar.style.transform += ` scale(${scale})`;
    });

    // Create non-clickable white stars
    for (let i = 0; i < 100; i++) {
      const size = 10 + Math.random() * 40; // Ensures 10-50px
      const xPerc = Math.random() * 90;
      const yPerc = Math.random() * 90;

      const starEl = document.createElement('div');
      starEl.className = 'star white-star';
      starEl.style.top = `${yPerc}%`;
      starEl.style.left = `${xPerc}%`;
      starEl.style.transform = `scale(${(size / 20).toFixed(2)})`;
      starEl.style.zIndex = 1; // Ensure white stars are below yellow stars
      document.body.appendChild(starEl);
    }
  });
