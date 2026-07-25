const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeButton = document.querySelector('.lightbox-close');

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  document.body.style.overflow = '';
}

if (closeButton) {
  closeButton.addEventListener('click', closeLightbox);
}

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});

const quoteForm = document.querySelector('.quote-form');
const formStatus = document.querySelector('.form-status');

if (quoteForm) {
  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = quoteForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : 'Request Free Quote';

    if (formStatus) {
      formStatus.textContent = 'Sending your request...';
      formStatus.className = 'form-status pending';
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const formData = new FormData(quoteForm);
      formData.append('_captcha', 'false');
      formData.append('_subject', 'New quote request from Completely Floored website');

      const response = await fetch(quoteForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      if (formStatus) {
        formStatus.textContent = 'Thanks! Your request has been sent. We will be in touch shortly.';
        formStatus.className = 'form-status success';
      }

      quoteForm.reset();
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = 'Sorry, something went wrong. Please call us directly on 0411 454 553.';
        formStatus.className = 'form-status error';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

function loadGalleryImages() {
  const container = document.getElementById('gallery-images');
  if (!container) return;

  const curatedFiles = [
    'IMG_1351.jpeg',
    'IMG_1352.jpeg',
    'IMG_1353.jpeg',
    'IMG_1354.jpeg',
    'IMG_1356.jpeg',
    'IMG_1357.jpeg',
    'IMG_1358.jpeg',
    'IMG_1359.jpeg',
    'IMG_1360.jpeg',
    'IMG_1361.jpeg',
    'IMG_1362.jpeg',
    'IMG_1363.jpeg',
    'IMG_1364.jpeg'
  ];

  const imageFiles = [...new Set(curatedFiles)].filter(file => file);

  if (!imageFiles.length) {
    container.innerHTML = '<div class="gallery-empty">Recent project photos will appear here soon.</div>';
    return;
  }

  container.innerHTML = imageFiles.map(file => `
    <article class="gallery-item gallery-photo" tabindex="0" role="button" data-src="images/${file}" data-alt="${file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}">
      <img src="images/${file}" alt="${file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}">
    </article>
  `).join('');

  container.querySelectorAll('.gallery-photo').forEach(card => {
    card.addEventListener('click', () => openLightbox(card.dataset.src, card.dataset.alt));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(card.dataset.src, card.dataset.alt);
      }
    });
  });
}

loadGalleryImages();

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const videos = document.querySelectorAll('.before-after-video');

const playVideosOnScroll = () => {
  videos.forEach((video) => {
    const rect = video.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
};

window.addEventListener('scroll', playVideosOnScroll, { passive: true });
window.addEventListener('load', playVideosOnScroll);
