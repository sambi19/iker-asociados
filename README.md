# Estudio Jurídico Iker Asociados

Sitio web completo (cinco páginas) en HTML, CSS y JavaScript sin dependencias ni
proceso de compilación. Pensado para Cloudflare Pages.

## Estructura

```
public/
  index.html            Portada
  areas.html            Áreas de práctica (penal y familia, en detalle)
  estudio.html          El estudio, proceso, abogados y horarios
  jurisprudencia.html   Publicaciones, con filtro por materia
  contacto.html         Formulario y datos de contacto
  admin.html            Ayuda para publicar en Jurisprudencia (no indexada)
  data/
    jurisprudencia.json Contenido de la sección Jurisprudencia
  assets/
    css/site.css        Sistema de diseño completo
    js/site.js          Menú, animaciones, formularios
    js/jurisprudencia.js Carga y filtra las publicaciones
    img/                Escudo, marca, favicon y fotografías
  _headers  robots.txt  sitemap.xml
PRODUCT.md  DESIGN.md   Contexto de marca y sistema de diseño
```

## Publicar una novedad en Jurisprudencia

El dueño no necesita tocar código.

1. Entrar a `admin.html` del sitio publicado.
2. Llenar el formulario y pulsar **Generar**, luego **Copiar**.
3. Abrir `public/data/jurisprudencia.json` en GitHub y pulsar el lápiz.
4. Pegar el bloque después del primer `[`, poniendo una coma si ya hay entradas.
5. **Commit changes**. Cloudflare republica en menos de un minuto.

Las categorías válidas son `penal`, `familia` y `general`. Las tres entradas más
recientes aparecen también en la portada.

> El archivo trae tres entradas de ejemplo marcadas con la palabra EJEMPLO.
> Bórrelas al publicar la primera novedad real.

## Despliegue en Cloudflare Pages

Workers & Pages → Create → Pages → Connect to Git → este repositorio.

- Framework preset: `None`
- Build command: *(vacío)*
- Build output directory: `public`

Cada `git push` a `main` republica. Por línea de comandos:

```bash
npx wrangler pages deploy public --project-name=iker-asociados
```

## Datos del estudio

- WhatsApp y teléfono: **+51 993 071 645**
- Facebook: <https://www.facebook.com/estudiojuridicoiker>
- Horario: lunes a viernes 8:00 a 13:00 y 14:30 a 18:00; sábados 9:00 a 13:00
- Juan Pablo II Reaño Arana, C.A.L.L. N° 6035
- José Elve Zuloeta Coronel, I.C.A.L. N° 10724

## Pendientes

| Qué | Valor actual | Dónde |
|---|---|---|
| Correo | `contacto@ikerasociados.pe` (sin confirmar) | las cinco páginas |
| Dirección de oficina | "Atención con cita previa" | `estudio.html` |
| Dominio | `ikerasociados.pages.dev` | `robots.txt`, `sitemap.xml` |
| Escudo | Recreación vectorial | `assets/img/escudo.svg` y `marca.svg` |

El escudo es una recreación en SVG hecha a partir de la foto del letrero, no el
archivo original de la marca. Si aparece el archivo original en alta resolución,
conviene reemplazar `escudo.svg` y `marca.svg` por él.

## Fotografías

Las cinco fotos provienen de Pexels (licencia libre, uso comercial permitido).
Se descartaron a propósito las fotos de "equipos de abogados" de banco de
imágenes: son modelos posando y darían a entender que son los abogados del
estudio.
