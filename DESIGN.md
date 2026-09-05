# Iker Asociados — sistema de diseño

## Estrategia de color: comprometida
El azul noche carga cerca de la mitad de la superficie (portada, cabecera, pie,
secciones de cierre). El papel cálido sostiene la lectura larga. El latón aparece
en dosis mínimas: filetes, colegiaturas, un botón. Nunca en degradados de texto.

Todo el color se define en OKLCH, en `assets/css/site.css`.

| Rol | Token | Uso |
|---|---|---|
| Azul noche profundo | `--noche-950` | Portada, remate, pie de columna |
| Azul noche | `--noche-900` | Cabecera, secciones oscuras |
| Papel | `--papel` | Fondo de lectura |
| Papel alterno | `--papel-2` | Secciones intercaladas |
| Latón | `--laton` | Acentos, filetes, botón principal |
| Alerta | `--alerta` | Etiqueta Penal, errores de formulario |

## Tipografía
- **Literata** para títulos. Serif de pantalla con aire de documento oficial.
- **Public Sans** para texto. Es la tipografía del sistema de diseño del gobierno
  de EE.UU.: institucional y neutra, sin personalidad de marca de software.

Se descartaron a propósito Cormorant, Playfair e Inter: son las opciones reflejo
que producen el aspecto de plantilla generada.

Escala fluida con `clamp()`, razón cercana a 1.32. Línea de texto tope 68ch.

## Reglas de composición
- Sin rejillas de tarjetas idénticas. Las áreas de práctica usan una composición
  asimétrica de dos columnas con numeración, no tarjetas con ícono.
- Sin etiquetas diminutas en mayúsculas encima de cada sección. En su lugar, un
  filete de latón de 44px.
- Sin degradados sobre texto, sin bordes laterales de color, sin glassmorphism.
- Las secciones colapsables animan `grid-template-rows`, nunca `height`.
- Curvas de salida exponenciales, sin rebote.

## Estructura
```
index.html          Portada
areas.html          Áreas de práctica
estudio.html        El estudio, proceso, equipo, horarios
jurisprudencia.html Listado filtrable, se alimenta de data/jurisprudencia.json
contacto.html       Formulario y datos
admin.html          Ayuda para redactar entradas (noindex)
```
