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

## Tablero «de dónde vengo, dónde estoy, adónde voy»
- `tablero.html`: se ve en https://oscar2676.github.io/oscaracademy-ejercicios/sitio/tablero.html
- `tablero.py` lo arma a partir de las hojas del repositorio, de `enlaces.json`, de `arbol-sitio.json` y de `plan.json`. GitHub lo ejecuta junto con `enlaces.py` (todos los días y cuando cambia `sitio/` o una carpeta de lote).
- `plan.json`: lo que no se puede leer de los archivos («en curso», «lo que sigue» y las APR que no están escritas en la hoja). Se edita a mano.

## Selector de producción
- `selector.html`: https://oscar2676.github.io/oscaracademy-ejercicios/sitio/selector.html — página por página, caja por caja, se marca con un clic qué títulos producir; «Copiar pedido» deja el texto listo para pegar en el chat (con los identificadores de página y de título).
- Estados: pendiente · ya tiene hoja · índice (lleva a otra página) · ya existe la hoja y falta enlazar. Un mismo título repetido en varias páginas se marca una vez y vale para todos sus lugares.
- `selector.py` lo arma con `arbol-sitio.json`, `datos-wix.json` y `enlaces.json`; GitHub lo ejecuta junto con `enlaces.py` y `tablero.py`.

<!-- relectura de enlaces pedida el 21-11-2026 01:45 (tras publicar L20 H07 y H08) -->

<!-- relectura de enlaces pedida el 21-11-2026 02:30 (tras publicar L20 H11-H13) -->

<!-- relectura de enlaces pedida el 21-11-2026 03:10 (tras publicar L21 H01-H02) -->
<!-- relectura tras publicar L21 H03–H12, 21-nov -->
<!-- relectura tras publicar L22, 21-nov -->
<!-- relectura tras publicar L22 H12, 21-nov -->
<!-- relectura tras publicar L23 H05, 21-nov -->
<!-- relectura tras publicar L23 H02, 21-nov -->
<!-- relectura 2 tras publicar L23 H02 -->
<!-- tablero: L23 H06-H08 enlazadas 21-nov 11:05 -->
<!-- tablero: segundo refresco 21-nov 11:12 -->
<!-- tablero: L23 H09-H14 enlazadas 21-nov 14:35 -->
