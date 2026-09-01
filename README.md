# Estudio Jurídico Iker & Asociados — Sitio web

Landing de una sola página (HTML/CSS/JS puro, sin build) para el estudio jurídico
**Iker & Asociados**, especialistas en Derecho Penal y Derecho de Familia.

## Estructura

```
public/
  index.html    Todo el sitio (estilos y scripts inline)
  _headers      Cabeceras de seguridad y caché (Cloudflare Pages)
  robots.txt
  sitemap.xml
```

## Despliegue en Cloudflare Pages

1. Sube este repositorio a GitHub.
2. En Cloudflare → **Workers & Pages** → **Create** → **Pages** → *Connect to Git*.
3. Selecciona el repositorio y configura:
   - **Framework preset:** `None`
   - **Build command:** *(vacío)*
   - **Build output directory:** `public`
4. Deploy. Cada `git push` a `main` publica automáticamente.

Alternativa por CLI:

```bash
npx wrangler pages deploy public --project-name=iker-asociados
```

## Datos a personalizar antes de publicar

Todos los marcadores están en `public/index.html`:

| Qué | Valor actual (placeholder) | Dónde |
|---|---|---|
| Número de WhatsApp | `51900000000` | constante `WA` en el script + todos los `wa.me/` y `tel:` |
| Correo | `contacto@ikerasociados.pe` | topbar, contacto, footer, JSON-LD |
| Dirección de oficina | «Atención con cita previa» | sección Contacto |
| Dominio | `ikerasociados.pages.dev` | `robots.txt`, `sitemap.xml`, JSON-LD |

Para cambiar el WhatsApp de golpe basta con reemplazar `51900000000` en todo el archivo
(formato internacional, sin `+` ni espacios).

## Abogados

- **Juan Pablo II Reaño Arana** — C.A.L.L. N° 6035
- **José Elve Zuloeta Coronel** — I.C.A.L. N° 10724
