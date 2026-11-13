# Árbol del sitio oscaracademy.org

Copia del contenido del sitio con la estructura Sitio > Página > Menú interno > Cajas > Títulos.

- `arbol-sitio.md`: el árbol en texto, para leer y comparar versiones.
- `arbol-sitio.json`: el mismo árbol como datos.
- `index.html`: página de consulta con buscador.
- `datos-wix.json`: datos tal como salen del editor de Wix (con identificadores y posiciones).
- `extraer.js`: se ejecuta en el editor de Wix (solo lectura) y produce `datos-wix.json`.
- `armar.py`: `python3 armar.py datos-wix.json` produce `arbol-sitio.json` y `arbol-sitio.md`. `pagina.py` produce `index.html`.

Una caja es un contenedor de Wix con textos; su título es el primer texto. Cada caja se asigna a la entrada de menú (ancla) inmediatamente anterior en la página. Los textos comunes de encabezado y pie se listan una sola vez. Solo se copió la vista de escritorio.

Se regenera completo después de cada cambio en Wix; el historial de git muestra qué cambió.

## Vista «hoja → títulos que la abren»
- `enlaces.html` (y `enlaces.json`): cada hoja publicada con la lista de páginas y títulos del sitio que la enlazan. Se ve en https://oscar2676.github.io/oscaracademy-ejercicios/sitio/enlaces.html
- `enlaces.py` la genera recorriendo las páginas públicas de oscaracademy.org; no necesita el editor de Wix. GitHub la ejecuta solo todos los días (`.github/workflows/enlaces.yml`) y cada vez que cambia algo en `sitio/`.
- `python3 sitio/enlaces.py --desde-datos` la arma sin red, a partir de `datos-wix.json`.
