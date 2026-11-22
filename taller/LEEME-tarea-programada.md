# Producción automática de hojas · guía para la tarea programada (22-nov-2026)

Eres Claude trabajando para Óscar Morales León (oscaracademy.org). Responde y escribe SIEMPRE en español. Esta corrida es desatendida: **no preguntes nada**; decide, anota la decisión en el estado y sigue.

## Qué hacer en cada corrida
1. `git pull`. Lee `taller/pedidos/ESTADO-pedido-20-nov.md` (sección del lote en curso y la línea «Faltan»). El lote en curso es el **28 · Determinantes**; cuando se acabe, sigue con el resto del lote 25 (series y sucesiones, H06 en adelante) y luego con el pedido `taller/pedidos/pedido-2026-11-21-751-hojas.txt` en el orden de la cola del estado.
2. Produce **3 hojas nuevas** (las 3 primeras de «Faltan»), una por título. Número de hoja = siguiente libre.
3. Para cada hoja: `taller/src/lNN/partes/NN.art.html` + `NN.scene.js`; armar `{ cat NN.art.html; echo '<!--SCENE-->'; cat _txt.js _det.js NN.scene.js; } > ../NN-det.html` (en otros lotes, sus propios ayudantes); `python3 taller/build.py NN "Nombre del lote"`; copiar `taller/out/hojas/loteNN/*.html` a la carpeta publicada del lote (p. ej. `determinantes/lote28/`).
4. Agrega las cuentas de las hojas nuevas a `qa/rigor/verificar_lote_NN.py` (aritmética exacta con `fractions`; identidades en rejilla de enteros) y córrelo: **0 errores** antes de publicar. Lo que no se pueda comprobar por código, dilo en el estado.
5. Capturas para ti (no para Óscar): `cd taller && python3 shot2.py loteNN.html <t entre 0 y 1> <id de la hoja>` → `out/s-<id>-<k>.png`; míralas (rótulos sin encimarse ni cortarse, nada fuera del lienzo) y bórralas. La vista previa **no dibuja TeX**: muestra el texto de respaldo.
6. `git add -A`, commit (mensaje en español, terminado con las dos líneas `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>` y `Claude-Session: <enlace de la sesión si lo tienes>`), `git pull -q --rebase && git -c push.negotiate=true push -q origin HEAD`.
7. Actualiza `taller/pedidos/ESTADO-pedido-20-nov.md`: agrega las hojas hechas (archivo, escenas, avisos de rigor, fuente contrastada) y quítalas de «Faltan». Commit y push.
8. Si tienes la herramienta de artefactos, republica la tarjeta del lote con `taller/out/loteNN.html` (lote 28: slug `0181fb80-2d0b-455a-b327-53223855a6c6`; primero `get_artifact` para la versión base) y anota la versión nueva en el estado. Si no la tienes, anótalo y sigue.
9. Mensaje final: **tres líneas como máximo**: hojas hechas (código y título), qué quedó sin comprobar, y nada más. No relates el proceso. No pidas «sigue».

## Lo que NO se hace en esta tarea
- **No tocar Wix** ni publicar el sitio: se enlaza solo después del APR de Óscar, en una conversación con él. Las hojas quedan «Pendiente de APR», sin enlazar.
- No cambiar hojas que ya tienen APR. No borrar animaciones. No instalar paquetes. No enviar mensajes ni correos. No compras.
- No copiar imágenes, textos ni marcas de terceros: todo dibujo es propio, con los colores institucionales.

## Molde y reglas de una hoja (mira `taller/src/l28/partes/01.*` y `02.*` como modelo exacto)
- Encabezado de comentarios `<!--file:HNN_titulo_en_minusculas.html--><!--title:…--><!--id:…--><!--tab:HNN …-->`; `<article class="sheet" id="…" data-hoja="LNN HNN">`; ruta `<ol class="route">` (Cursos › curso › sección › **título**); `<h1>` = título exacto del pedido; `<p class="lede">` con la idea y su fórmula.
- **«La idea, en una animación»** justo bajo la entradilla: `<div class="stage" data-scene="…"></div>` + `<ul class="keys">` que explica cada color.
- Recuadros `card k1`, `k2`, `k3` (definición, demostración paso a paso, caso especial o segunda animación número ↔ figura). Ejemplos `prop p1`…`p4` con `<ol class="steps">`. Un recuadro `why` con errores frecuentes.
- **«Ahora tú»**: ejercicios A, B, C (`<div class="ex">`), cada uno con Pista y «Solución paso a paso»; el **C es «De la vida cotidiana»**.
- Pie: `<span class="status">AL-L28-HNN · v001 · Pendiente de APR</span>`. El crédito «Creado por Oscar Morales León asistido por IA.» lo pone `build.py` solo.
- **Rigor (tolerancia cero):** no inventar nada; cada paso con una sola operación o propiedad, nombrada; restricciones exactas (a ≠ 0, etc.); toda afirmación usada sin demostrar se avisa en la hoja y en el estado. Contrasta el contenido del lote con una fuente (Khan Academy, U. de Chile, UC, USACH, UTFSM, sociedades matemáticas de Chile y España, OpenStax, LibreTexts, GeoGebra) y anota cuál.
- Decimales con coma; español de Chile; «sen» para el seno.

## Reglas de las animaciones (motor `OA.scene(nombre, def)`)
- `world:{x0,x1,y0,y1}`, **`aspect` = alto/ancho del mundo**; `aria`; `labels:[[id, tex, respaldo, clase]]` (clases: `diff` naranja, `c-sec` azul, `c-alt` verde, `c-tan` burdeo, `pt`, ''); `sliders` (id distinto de 'q'); `legend`; `anim:{run,hold,still:1,apply(p,v)}`; `onInput`; `draw(S,v)` con `S.X,S.Y,S.ctx,S.C{ink,rise,sec,tan,alt,grid,muted}`, `S.line`, `S.poly(pts,{fill,alpha})`, `S.lab(id,px,py,ax%,ay%,mostrar)`; `caption`; `readout` (filas `['', tex]` o `['d', tex]`).
- **Ninguna expresión algebraica como texto plano en el lienzo**: van como etiquetas TeX (`labels` + `S.lab`; ayudante `dtEtq`). El texto del lienzo es solo para frases, de **50 caracteres o menos** por línea (lienzo ≈ 340 px de ancho).
- **Por pasos, con deslizador «paso»**: pregunta arriba y respuesta al final en el mismo lugar; `apply` con `v.u = dtSuave(...)`: **nada aparece de golpe**, cada paso tiene transición; parámetros animados sin redondear.
- **Registro acumulado obligatorio** en toda animación por pasos: `oaReg(S, k, N, x, y, FILA)` con etiquetas `R1…RN`; la expresión de cada paso queda escrita, numerada, y se acumula hacia abajo; nunca se reemplaza una por otra. Deja alto en el `world` para el registro.
- Trazos finos y puntos chicos; el diferencial o espesor, marcado y rotulado; una pieza que se saca es parte visible del cuerpo, deja su hueco y vuelve; las cotas no se pierden al moverse; cuerpos 3D con degradado; nada de números sueltos: lo que se muestra es una cadena que parte de algo y llega a algo.
- Con dos radios (R y r): salen del mismo centro, forman un ángulo, trazo fino, largos distintos. En gráficas de sucesiones: cada término con punteada hasta su valor en el eje aₙ.
- Segunda animación «número ↔ figura» cuando calce: al mover un valor cambia la figura y la cuenta; mostrar el caso límite (cero).
- Toda suma se da también en notación Σ. Fórmulas usadas: mostrar de dónde salen.
