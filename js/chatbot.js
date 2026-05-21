/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


/* ============================================
   ENIGMA — chatbot.js
   ============================================ */

(function () {

  const WA_NUMBER = '573205775112';
  const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

  /* ------------------------------------------
     BASE DE CONOCIMIENTO
  ------------------------------------------ */
  const KB = {
    catalog: {
      msg: '🍃 Tenemos <strong>3 colecciones</strong>:<br>🍍 <em>Frutal</em>: Ilusión, Euforia, Pasión, Dulzura<br>🌿 <em>Botánica</em>: Amor, Serenidad<br>☕ <em>Gourmet</em>: Capricho, Suave, Intenso, Armonía<br><br>¿Cuál te llama más la atención?',
      opts: [
        { label: '🍍 Frutal',    key: 'frutal'   },
        { label: '🌿 Botánica', key: 'botanica' },
        { label: '☕ Gourmet',  key: 'gourmet'  },
        { label: '💰 Precios',  key: 'prices'   },
      ]
    },
    prices: {
      msg: '💰 <strong>Precios ENIGMA:</strong><br><br><u>Botella recuperada:</u><br>210ml → $25.000 · 375ml → $35.000 · 750ml → $65.000<br><br><u>Edición especial ENIGMA:</u><br>210ml → $30.000 · 375ml → $40.000 · 750ml → $70.000<br><br>☕ Café artesanal (libra molida) → $35.000',
      opts: [
        { label: 'Hacer pedido', key: 'order'   },
        { label: 'Ver sabores',  key: 'catalog' },
      ]
    },
    order: {
      msg: '✅ ¡Perfecto! Te conectamos con nuestro equipo en WhatsApp. Hacemos envíos a <strong>todo Colombia</strong> 🇨🇴',
      opts: [
        { label: 'Ver sabores', key: 'catalog' },
        { label: 'Ver precios', key: 'prices'  },
      ],
      wa: true
    },
    delivery: {
      msg: '🚚 Hacemos envíos a <strong>todo el país</strong>. Estamos en Guaduas, Cundinamarca. El costo de envío depende de tu ciudad — escríbenos para cotizar.',
      opts: [
        { label: 'Hacer pedido', key: 'order'  },
        { label: 'Ver precios',  key: 'prices' },
      ]
    },
    frutal: {
      msg: '🍍 <strong>Ilusión</strong> — Piña (Tropical · Fresco · Dulce)<br>🍌 <strong>Euforia</strong> — Banano (Dulce · Cremoso)<br>🌟 <strong>Pasión</strong> — Maracuyá (Ácido · Cítrico)<br>🫐 <strong>Dulzura</strong> — Mora Azul (Frutal · Vibrante)',
      opts: [
        { label: 'Precios',      key: 'prices' },
        { label: 'Hacer pedido', key: 'order'  },
      ]
    },
    botanica: {
      msg: '🌸 <strong>Amor</strong> — Pétalos (Floral · Aromático · Delicado)<br>🌿 <strong>Serenidad</strong> — Yerbabuena (Herbal · Fresco · Ligero)<br><br>Perfectos para momentos especiales.',
      opts: [
        { label: 'Precios',      key: 'prices' },
        { label: 'Hacer pedido', key: 'order'  },
      ]
    },
    gourmet: {
      msg: '🍫 <strong>Capricho</strong> — Cacao (Chocolate · Elegante)<br>☕ <strong>Suave</strong> — Café colombiano (Aromático · Tostado)<br>🫘 <strong>Intenso</strong> — Café fuerte (Robusto · Persistente)<br>🎁 <strong>Armonía</strong> — Café artesanal (Panela · Cítrico)',
      opts: [
        { label: 'Precios',      key: 'prices' },
        { label: 'Hacer pedido', key: 'order'  },
      ]
    },
    default: {
      msg: 'Para darte la mejor atención, te invitamos a escribirnos directamente por WhatsApp. ¡Responderemos enseguida! 🥃',
      opts: [
        { label: 'Hacer pedido', key: 'order'   },
        { label: 'Ver catálogo', key: 'catalog' },
        { label: '💰 Precios',   key: 'prices'  },
      ]
    }
  };

  const KEYWORD_MAP = [
    { words: ['precio','costo','valor','cuanto','cuánto'],       key: 'prices'   },
    { words: ['catálogo','sabor','licor','colección','producto'], key: 'catalog'  },
    { words: ['envío','envio','enviar','despacho','colombia'],    key: 'delivery' },
    { words: ['pedido','comprar','pedir','quiero','ordenar'],     key: 'order'    },
    { words: ['frutal','piña','banano','maracuyá','mora'],        key: 'frutal'   },
    { words: ['botánica','flor','menta','yerbabuena','pétalo'],   key: 'botanica' },
    { words: ['gourmet','café','cacao','chocolate','intenso'],    key: 'gourmet'  },
  ];

  const LABEL_MAP = {
    catalog:  'Ver catálogo',
    prices:   'Precios',
    order:    'Hacer pedido',
    delivery: 'Envíos',
    frutal:   'Colección Frutal',
    botanica: 'Colección Botánica',
    gourmet:  'Colección Gourmet',
  };

  /* ------------------------------------------
     DOM
  ------------------------------------------ */
  let chatOpen = false;

  const toggleBtn  = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const msgArea    = document.getElementById('chat-messages');
  const optsArea   = document.getElementById('chat-opts');
  const inputEl    = document.getElementById('chat-input');
  const sendBtn    = document.getElementById('chat-send');

  if (!toggleBtn || !chatWindow) return; // Guard: si no existe el chatbot en el DOM

  /* ------------------------------------------
     TOGGLE
  ------------------------------------------ */
  toggleBtn.addEventListener('click', () => {
    chatOpen = !chatOpen;
    chatWindow.classList.toggle('open', chatOpen);
    toggleBtn.textContent = chatOpen ? '✕' : '🥃';
    if (chatOpen) inputEl && inputEl.focus();
  });

  /* ------------------------------------------
     AGREGAR MENSAJE
  ------------------------------------------ */
  function addMsg(text, sender = 'bot') {
    const wrap = document.createElement('div');
    wrap.className = `msg ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = text;
    wrap.appendChild(bubble);
    msgArea.appendChild(wrap);
    msgArea.scrollTop = msgArea.scrollHeight;
  }

  /* ------------------------------------------
     RENDERIZAR OPCIONES
  ------------------------------------------ */
  function setOpts(opts) {
    optsArea.innerHTML = '';
    opts.forEach(o => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.textContent = o.label;
      btn.addEventListener('click', () => handleKey(o.key));
      optsArea.appendChild(btn);
    });
  }

  /* ------------------------------------------
     RESPONDER POR KEY
  ------------------------------------------ */
  function handleKey(key) {
    const resp = KB[key] || KB.default;

    // Mostrar texto del usuario
    const userLabel = LABEL_MAP[key] || key;
    addMsg(userLabel, 'user');

    // Respuesta del bot con delay
    setTimeout(() => {
      addMsg(resp.msg, 'bot');
      setOpts(resp.opts || []);

      // Si requiere WhatsApp, abrir automáticamente
      if (resp.wa) {
        const waMsg = encodeURIComponent('¡Hola! Quiero hacer un pedido de licores ENIGMA 🥃');
        setTimeout(() => window.open(`${WA_BASE}?text=${waMsg}`, '_blank'), 600);
      }
    }, 450);
  }

  /* ------------------------------------------
     ENVIAR MENSAJE LIBRE
  ------------------------------------------ */
  function sendFreeText() {
    const text = inputEl.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    inputEl.value = '';

    const lower = text.toLowerCase();
    let matched = 'default';

    for (const entry of KEYWORD_MAP) {
      if (entry.words.some(w => lower.includes(w))) {
        matched = entry.key;
        break;
      }
    }

    const resp = KB[matched];
    setTimeout(() => {
      addMsg(resp.msg, 'bot');
      setOpts(resp.opts || []);
      if (resp.wa) {
        const waMsg = encodeURIComponent(`¡Hola! ${text}`);
        setTimeout(() => window.open(`${WA_BASE}?text=${waMsg}`, '_blank'), 600);
      }
    }, 500);
  }

  // Inicializar opciones del chatbot
  setOpts([
    { label: '📖 Ver catálogo', key: 'catalog'  },
    { label: '💰 Precios',      key: 'prices'   },
    { label: '🛒 Hacer pedido', key: 'order'    },
    { label: '🚚 Envíos',       key: 'delivery' },
  ]);

  sendBtn && sendBtn.addEventListener('click', sendFreeText);
  inputEl && inputEl.addEventListener('keypress', e => { if (e.key === 'Enter') sendFreeText(); });

})();

/* ============================================
   ENIGMA — chatbot.js
   ============================================ */

(function () {

  const WA_NUMBER = '573205775112';
  const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

  /* ------------------------------------------
     BASE DE CONOCIMIENTO
  ------------------------------------------ */
  const KB = {
    catalog: {
      msg: '🍃 Tenemos <strong>3 colecciones</strong>:<br>🍍 <em>Frutal</em>: Ilusión, Euforia, Pasión, Dulzura<br>🌿 <em>Botánica</em>: Amor, Serenidad<br>☕ <em>Gourmet</em>: Capricho, Suave, Intenso, Armonía<br><br>¿Cuál te llama más la atención?',
      opts: [
        { label: '🍍 Frutal',    key: 'frutal'   },
        { label: '🌿 Botánica', key: 'botanica' },
        { label: '☕ Gourmet',  key: 'gourmet'  },
        { label: '💰 Precios',  key: 'prices'   },
      ]
    },
    prices: {
      msg: '💰 <strong>Precios ENIGMA:</strong><br><br><u>Botella recuperada:</u><br>210ml → $25.000 · 375ml → $35.000 · 750ml → $65.000<br><br><u>Edición especial ENIGMA:</u><br>210ml → $30.000 · 375ml → $40.000 · 750ml → $70.000<br><br>☕ Café artesanal (libra molida) → $35.000',
      opts: [
        { label: 'Hacer pedido', key: 'order'   },
        { label: 'Ver sabores',  key: 'catalog' },
      ]
    },
    order: {
      msg: '✅ ¡Perfecto! Te conectamos con nuestro equipo en WhatsApp. Hacemos envíos a <strong>todo Colombia</strong> 🇨🇴',
      opts: [
        { label: 'Ver sabores', key: 'catalog' },
        { label: 'Ver precios', key: 'prices'  },
      ],
      wa: true
    },
    delivery: {
      msg: '🚚 Hacemos envíos a <strong>todo el país</strong>. Estamos en Guaduas, Cundinamarca. El costo de envío depende de tu ciudad — escríbenos para cotizar.',
      opts: [
        { label: 'Hacer pedido', key: 'order'  },
        { label: 'Ver precios',  key: 'prices' },
      ]
    },
    frutal: {
      msg: '🍍 <strong>Ilusión</strong> — Piña (Tropical · Fresco · Dulce)<br>🍌 <strong>Euforia</strong> — Banano (Dulce · Cremoso)<br>🌟 <strong>Pasión</strong> — Maracuyá (Ácido · Cítrico)<br>🫐 <strong>Dulzura</strong> — Mora Azul (Frutal · Vibrante)',
      opts: [
        { label: 'Precios',      key: 'prices' },
        { label: 'Hacer pedido', key: 'order'  },
      ]
    },
    botanica: {
      msg: '🌸 <strong>Amor</strong> — Pétalos (Floral · Aromático · Delicado)<br>🌿 <strong>Serenidad</strong> — Yerbabuena (Herbal · Fresco · Ligero)<br><br>Perfectos para momentos especiales.',
      opts: [
        { label: 'Precios',      key: 'prices' },
        { label: 'Hacer pedido', key: 'order'  },
      ]
    },
    gourmet: {
      msg: '🍫 <strong>Capricho</strong> — Cacao (Chocolate · Elegante)<br>☕ <strong>Suave</strong> — Café colombiano (Aromático · Tostado)<br>🫘 <strong>Intenso</strong> — Café fuerte (Robusto · Persistente)<br>🎁 <strong>Armonía</strong> — Café artesanal (Panela · Cítrico)',
      opts: [
        { label: 'Precios',      key: 'prices' },
        { label: 'Hacer pedido', key: 'order'  },
      ]
    },
    default: {
      msg: 'Para darte la mejor atención, te invitamos a escribirnos directamente por WhatsApp. ¡Responderemos enseguida! 🥃',
      opts: [
        { label: 'Hacer pedido', key: 'order'   },
        { label: 'Ver catálogo', key: 'catalog' },
        { label: '💰 Precios',   key: 'prices'  },
      ]
    }
  };

  const KEYWORD_MAP = [
    { words: ['precio','costo','valor','cuanto','cuánto'],       key: 'prices'   },
    { words: ['catálogo','sabor','licor','colección','producto'], key: 'catalog'  },
    { words: ['envío','envio','enviar','despacho','colombia'],    key: 'delivery' },
    { words: ['pedido','comprar','pedir','quiero','ordenar'],     key: 'order'    },
    { words: ['frutal','piña','banano','maracuyá','mora'],        key: 'frutal'   },
    { words: ['botánica','flor','menta','yerbabuena','pétalo'],   key: 'botanica' },
    { words: ['gourmet','café','cacao','chocolate','intenso'],    key: 'gourmet'  },
  ];

  const LABEL_MAP = {
    catalog:  'Ver catálogo',
    prices:   'Precios',
    order:    'Hacer pedido',
    delivery: 'Envíos',
    frutal:   'Colección Frutal',
    botanica: 'Colección Botánica',
    gourmet:  'Colección Gourmet',
  };

  /* ------------------------------------------
     DOM
  ------------------------------------------ */
  let chatOpen = false;

  const toggleBtn  = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const msgArea    = document.getElementById('chat-messages');
  const optsArea   = document.getElementById('chat-opts');
  const inputEl    = document.getElementById('chat-input');
  const sendBtn    = document.getElementById('chat-send');

  if (!toggleBtn || !chatWindow) return; // Guard: si no existe el chatbot en el DOM

  /* ------------------------------------------
     TOGGLE
  ------------------------------------------ */
  toggleBtn.addEventListener('click', () => {
    chatOpen = !chatOpen;
    chatWindow.classList.toggle('open', chatOpen);
    toggleBtn.textContent = chatOpen ? '✕' : '🥃';
    if (chatOpen) inputEl && inputEl.focus();
  });

  /* ------------------------------------------
     AGREGAR MENSAJE
  ------------------------------------------ */
  function addMsg(text, sender = 'bot') {
    const wrap = document.createElement('div');
    wrap.className = `msg ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = text;
    wrap.appendChild(bubble);
    msgArea.appendChild(wrap);
    msgArea.scrollTop = msgArea.scrollHeight;
  }

  /* ------------------------------------------
     RENDERIZAR OPCIONES
  ------------------------------------------ */
  function setOpts(opts) {
    optsArea.innerHTML = '';
    opts.forEach(o => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.textContent = o.label;
      btn.addEventListener('click', () => handleKey(o.key));
      optsArea.appendChild(btn);
    });
  }

  /* ------------------------------------------
     RESPONDER POR KEY
  ------------------------------------------ */
  function handleKey(key) {
    const resp = KB[key] || KB.default;

    // Mostrar texto del usuario
    const userLabel = LABEL_MAP[key] || key;
    addMsg(userLabel, 'user');

    // Respuesta del bot con delay
    setTimeout(() => {
      addMsg(resp.msg, 'bot');
      setOpts(resp.opts || []);

      // Si requiere WhatsApp, abrir automáticamente
      if (resp.wa) {
        const waMsg = encodeURIComponent('¡Hola! Quiero hacer un pedido de licores ENIGMA 🥃');
        setTimeout(() => window.open(`${WA_BASE}?text=${waMsg}`, '_blank'), 600);
      }
    }, 450);
  }

  /* ------------------------------------------
     ENVIAR MENSAJE LIBRE
  ------------------------------------------ */
  function sendFreeText() {
    const text = inputEl.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    inputEl.value = '';

    const lower = text.toLowerCase();
    let matched = 'default';

    for (const entry of KEYWORD_MAP) {
      if (entry.words.some(w => lower.includes(w))) {
        matched = entry.key;
        break;
      }
    }

    const resp = KB[matched];
    setTimeout(() => {
      addMsg(resp.msg, 'bot');
      setOpts(resp.opts || []);
      if (resp.wa) {
        const waMsg = encodeURIComponent(`¡Hola! ${text}`);
        setTimeout(() => window.open(`${WA_BASE}?text=${waMsg}`, '_blank'), 600);
      }
    }, 500);
  }

  // Inicializar opciones del chatbot
  setOpts([
    { label: '📖 Ver catálogo', key: 'catalog'  },
    { label: '💰 Precios',      key: 'prices'   },
    { label: '🛒 Hacer pedido', key: 'order'    },
    { label: '🚚 Envíos',       key: 'delivery' },
  ]);

  sendBtn && sendBtn.addEventListener('click', sendFreeText);
  inputEl && inputEl.addEventListener('keypress', e => { if (e.key === 'Enter') sendFreeText(); });

})();