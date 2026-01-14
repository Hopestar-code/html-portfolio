// Small site JS: nav toggle and simple form feedback
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('show');
    });
  }

  // Insert current year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple form feedback (does not send)
  const form = document.getElementById('bookingForm');
  if(form){
    form.addEventListener('submit', function(e){
      // If action is still placeholder, prevent actual submission and show a friendly message
      if(form.action.includes('formspree.io') || form.action === '' ){ 
        e.preventDefault();
        alert('Thanks! Your booking request has been received. We will contact you to confirm the appointment.');
        form.reset();
      }
    });
  }

  /* Lightbox / gallery viewer */
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox && lightbox.querySelector('.lightbox__img');
  const lbClose = lightbox && lightbox.querySelector('.lightbox__close');
  const lbPrev = lightbox && lightbox.querySelector('.lightbox__prev');
  const lbNext = lightbox && lightbox.querySelector('.lightbox__next');

  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const sources = items.map(i => i.getAttribute('href'));
  let current = -1;

  function openLightbox(idx){
    if(!lightbox || !lbImg) return;
    current = idx;
    lbImg.src = sources[idx];
    lbImg.alt = items[idx].querySelector('img')?.alt || '';
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus for accessibility
    lbClose?.focus();
  }
  function closeLightbox(){
    if(!lightbox) return;
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
    current = -1;
  }
  function showNext(){ if(current < sources.length - 1) openLightbox(current + 1); }
  function showPrev(){ if(current > 0) openLightbox(current - 1); }

  // click on gallery items
  items.forEach((el, idx) => {
    el.addEventListener('click', function(e){
      e.preventDefault();
      openLightbox(idx);
    });
  });

  // controls
  lbClose?.addEventListener('click', closeLightbox);
  lbNext?.addEventListener('click', showNext);
  lbPrev?.addEventListener('click', showPrev);

  // close on overlay click (but not when clicking image or controls)
  lightbox?.addEventListener('click', function(e){
    if(e.target === this) closeLightbox();
  });

  // keyboard navigation
  document.addEventListener('keydown', function(e){
    if(current === -1) return; // lightbox closed
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') showNext();
    if(e.key === 'ArrowLeft') showPrev();
  });

});