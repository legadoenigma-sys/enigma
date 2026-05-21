/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


/* ============================================
   ENIGMA — main.js
   ============================================ */


document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     CURSOR PERSONALIZADO
  ------------------------------------------ */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursor && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Ring con pequeño lag
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover sobre elementos interactivos
    const interactives = document.querySelectorAll('a, button, .product-card, .tab-btn, .why-card, .opt-btn');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        cursorRing.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        cursorRing.classList.remove('hovered');
      });
    });
  }

  /* ------------------------------------------
     PARTÍCULAS EN HERO
  ------------------------------------------ */
  const particleContainer = document.getElementById('hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 45; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 2.5 + 0.5;
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${Math.random() * 18 + 10}s;
        animation-delay: ${Math.random() * 18}s;
        opacity: 0;
      `;
      particleContainer.appendChild(p);
    }
  }

  /* ------------------------------------------
     NAVBAR — efecto scroll
  ------------------------------------------ */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------
     HAMBURGER / MENÚ MÓVIL
  ------------------------------------------ */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ------------------------------------------
     SCROLL REVEAL
  ------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------
     TABS — Colecciones
  ------------------------------------------ */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById('panel-' + btn.dataset.tab);
      if (panel) {
        panel.classList.add('active');
        // Re-observar reveal dentro del panel
        panel.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => revealObserver.observe(el), 50);
        });
      }
    });
  });

});

/* ------------------------------------------
   FUNCIÓN GLOBAL — orderProduct
   Redirige a WhatsApp con el producto
------------------------------------------ */
function orderProduct(productName) {
  const msg = encodeURIComponent(
    `¡Hola! Me interesa el licor ENIGMA: *${productName}*.\n¿Pueden darme más información y precios? 🥃`
  );
  window.open(`https://wa.me/573205775112?text=${msg}`, '_blank');
}

