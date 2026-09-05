/* Iker Asociados — comportamiento común */
(function () {
  'use strict';

  var WA = '51993071645';

  /* --- año en el pie --- */
  document.querySelectorAll('[data-anio]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- menú móvil --- */
  var boton = document.getElementById('hamburguesa');
  var nav = document.getElementById('nav');
  if (boton && nav) {
    boton.addEventListener('click', function () {
      var abierto = nav.dataset.abierto === 'true';
      nav.dataset.abierto = String(!abierto);
      boton.setAttribute('aria-expanded', String(!abierto));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.dataset.abierto = 'false';
        boton.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.dataset.abierto === 'true') {
        nav.dataset.abierto = 'false';
        boton.setAttribute('aria-expanded', 'false');
        boton.focus();
      }
    });
  }

  /* --- aparición al entrar en pantalla --- */
  var surgen = document.querySelectorAll('.surge');
  if (surgen.length) {
    if (!('IntersectionObserver' in window)) {
      surgen.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('visible');
            obs.unobserve(en.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px' });
      surgen.forEach(function (el, i) {
        el.style.transitionDelay = (i % 3) * 90 + 'ms';
        obs.observe(el);
      });
    }
  }

  /* --- formularios que se envían por WhatsApp --- */
  function validar(form) {
    var primero = null;
    form.querySelectorAll('[required]').forEach(function (campo) {
      var vacio = campo.type === 'checkbox' ? !campo.checked : !campo.value.trim();
      campo.setAttribute('aria-invalid', String(vacio));
      if (vacio && !primero) primero = campo;
    });
    if (primero) primero.focus();
    return primero;
  }

  document.querySelectorAll('form[data-wa]').forEach(function (form) {
    var aviso = form.querySelector('.aviso');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (validar(form)) {
        if (aviso) {
          aviso.textContent = 'Faltan datos obligatorios. Revise los campos marcados.';
          aviso.dataset.estado = 'error';
        }
        return;
      }
      var datos = new FormData(form);
      var lineas = ['Consulta desde la web de Iker Asociados', ''];
      datos.forEach(function (valor, clave) {
        if (clave === 'acepto') return;
        var texto = String(valor).trim();
        if (!texto) return;
        var etiqueta = clave.charAt(0).toUpperCase() + clave.slice(1);
        lineas.push(etiqueta + ': ' + texto);
      });
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lineas.join('\n')), '_blank', 'noopener');
      if (aviso) {
        aviso.textContent = 'Se abrió WhatsApp con su consulta lista para enviar.';
        aviso.dataset.estado = 'ok';
      }
      form.reset();
      form.querySelectorAll('[aria-invalid]').forEach(function (c) { c.removeAttribute('aria-invalid'); });
    });
  });
})();
