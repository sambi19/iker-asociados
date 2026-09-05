/* Jurisprudencia: lee data/jurisprudencia.json y arma el listado */
(function () {
  'use strict';

  var lista = document.getElementById('entradas');
  var ultimas = document.getElementById('ultimas');
  if (!lista && !ultimas) return;

  var CATEGORIAS = { penal: 'Penal', familia: 'Familia', general: 'General' };
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
               'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];

  function fechaLarga(iso) {
    var p = String(iso || '').split('-');
    if (p.length !== 3) return '';
    var d = Number(p[2]), m = Number(p[1]) - 1, a = p[0];
    if (isNaN(d) || !MESES[m]) return '';
    return d + ' de ' + MESES[m] + ' de ' + a;
  }

  function texto(valor) {
    var div = document.createElement('div');
    div.textContent = valor == null ? '' : String(valor);
    return div.innerHTML;
  }

  function crearEntrada(item, indice, prefijo) {
    var cat = CATEGORIAS[item.categoria] ? item.categoria : 'general';
    var idPanel = prefijo + '-panel-' + indice;
    var idBoton = prefijo + '-boton-' + indice;

    var art = document.createElement('article');
    art.className = 'entrada';
    art.dataset.categoria = cat;

    var parrafos = Array.isArray(item.cuerpo) ? item.cuerpo : (item.cuerpo ? [item.cuerpo] : []);
    var cuerpoHtml = parrafos.map(function (p) { return '<p>' + texto(p) + '</p>'; }).join('');

    var enlace = '';
    if (item.url) {
      enlace = '<a class="entrada__fuente" href="' + texto(item.url) + '" target="_blank" rel="noopener">' +
               texto(item.fuente || 'Ver la fuente oficial') +
               '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a>';
    } else if (item.fuente) {
      enlace = '<p style="font-size:.85rem;margin:.9rem 0 1.8rem;color:var(--tinta-2)">Fuente: ' + texto(item.fuente) + '</p>';
    }

    art.innerHTML =
      '<h3 style="margin:0">' +
        '<button class="entrada__cab" id="' + idBoton + '" type="button" aria-expanded="false" aria-controls="' + idPanel + '">' +
          '<span>' +
            '<span class="entrada__meta">' +
              '<span class="etiqueta" data-cat="' + cat + '">' + CATEGORIAS[cat] + '</span>' +
              '<span class="fecha">' + texto(fechaLarga(item.fecha)) + '</span>' +
            '</span>' +
            '<span class="t-3" style="display:block;font-family:Literata,serif;font-weight:600;line-height:1.2">' + texto(item.titulo) + '</span>' +
          '</span>' +
          '<span class="mas" aria-hidden="true">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>' +
          '</span>' +
        '</button>' +
      '</h3>' +
      '<div class="entrada__cuerpo" id="' + idPanel + '" role="region" aria-labelledby="' + idBoton + '" data-abierto="false">' +
        '<div>' +
          (item.resumen ? '<p style="font-weight:500;color:var(--tinta)">' + texto(item.resumen) + '</p>' : '') +
          cuerpoHtml + enlace +
        '</div>' +
      '</div>';

    var boton = art.querySelector('.entrada__cab');
    var panel = art.querySelector('.entrada__cuerpo');
    boton.addEventListener('click', function () {
      var abierto = boton.getAttribute('aria-expanded') === 'true';
      boton.setAttribute('aria-expanded', String(!abierto));
      panel.dataset.abierto = String(!abierto);
    });

    return art;
  }

  function pintar(contenedor, datos, prefijo) {
    contenedor.textContent = '';
    if (!datos.length) {
      var vacio = document.createElement('p');
      vacio.className = 'vacio';
      vacio.textContent = 'Todavía no hay publicaciones en esta categoría.';
      contenedor.appendChild(vacio);
      return;
    }
    datos.forEach(function (item, i) {
      contenedor.appendChild(crearEntrada(item, i, prefijo));
    });
  }

  fetch('data/jurisprudencia.json', { cache: 'no-cache' })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (datos) {
      if (!Array.isArray(datos)) throw new Error('formato inesperado');

      datos.sort(function (a, b) {
        return String(b.fecha || '').localeCompare(String(a.fecha || ''));
      });

      if (ultimas) pintar(ultimas, datos.slice(0, 3), 'ult');

      if (lista) {
        pintar(lista, datos, 'jur');
        document.querySelectorAll('.filtro').forEach(function (boton) {
          boton.addEventListener('click', function () {
            var cat = boton.dataset.cat;
            document.querySelectorAll('.filtro').forEach(function (b) {
              b.setAttribute('aria-pressed', String(b === boton));
            });
            pintar(lista, cat === 'todas' ? datos : datos.filter(function (d) {
              return d.categoria === cat;
            }), 'jur');
          });
        });
      }
    })
    .catch(function () {
      [lista, ultimas].forEach(function (c) {
        if (!c) return;
        c.innerHTML = '<p class="vacio">No se pudieron cargar las publicaciones en este momento.</p>';
      });
    });
})();
