# Taller de hojas (lotes 10 en adelante)

Fuentes de las hojas hechas desde el 12-nov-2026. Cada archivo de `src/lNN/` trae la hoja (`<article>`), la marca `<!--SCENE-->` y las escenas de animación.

- Armar un lote: `python3 taller/build.py 11 "Potencias"` → `out/hojas/lote11/*.html` (hojas sueltas) y `out/lote11.html` (tarjeta de revisión, con el modo corrección de `src/revision.js`).
- El molde (cabecera, estilos y motor de animación) se toma de `cuerpos-redondos/lote05/H02_volumen_del_cilindro_v002.html`; la ruta está al comienzo de `build.py`.
- Rigor: antes de mostrar una hoja, `python3 qa/rigor/verificar_tex.py taller/src/lNN/*.html` y `node qa/rigor/rotulos_animaciones.js taller/src/lNN/*.html > /tmp/r.html && python3 qa/rigor/verificar_tex.py /tmp/r.html`. Ver `qa/rigor/`.
- Capturas sin conexión de las animaciones: `python3 taller/shot2.py lote11.html 1 <id-de-la-hoja>` (necesita Chrome y playwright).
