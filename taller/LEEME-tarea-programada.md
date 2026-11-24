# Producción automática de hojas · guía para la tarea programada (22-nov-2026)

> **REVISIÓN GENERAL ANTES QUE HOJAS NUEVAS (23-nov, 21:40 de Chile).** Óscar revisó L25 H01–H09 y rechazó todo por el mismo motivo (ver «Cuarta ley» y su lista de control). **No producir hojas nuevas** hasta que este aviso se quite. Cada corrida corrige **hasta 5 hojas** de la cola «Revisión general (cuarta ley)» del estado, en ese orden, las sube de versión («Pendiente de APR»), republica la tarjeta del lote y anota la corrida. Modelo ya corregido: L25 H01–H09 (v003/v002 del 23-nov).


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

## Cuando se acaba un lote (agregado el 22-nov, 15:00)
- Orden de la cola: (1) lo que falte del lote 28; (2) lote 25 · Series y sucesiones, H06 en adelante (`taller/src/l25/partes/`, ayudantes `_txt.js _ss.js`, armado `../NN-ss.html`, código `CI-L25-HNN`, carpeta `series-y-sucesiones/lote25/`, tarjeta slug `b97c3315-6e67-4826-a3e0-230b477b2ebc`; los títulos están en el pedido, grupos «Series y sucesiones», «Sucesiones geométricas» y «Criterios de comparación» de Cálculo II); (3) después, lotes nuevos con el pedido `taller/pedidos/pedido-2026-11-21-751-hojas.txt`, en este orden de grupos: límites (Cálculo diferencial 1ª parte), integración (Cálculo superior y Cálculo integral), 1º Básico, números complejos, álgebra lineal (matrices y vectores), álgebra básica.
- **Lote nuevo:** número = el siguiente libre (mira `taller/src/` y el estado); unas 10 a 15 hojas de un mismo tema por lote; carpeta `taller/src/lNN/partes/` (copia `_txt.js` y los ayudantes que sirvan, p. ej. `_det.js` por `oaReg`, `dtEtq`, `dtSuave`, `dtFlecha`), `ronda.txt` con `1`; carpeta publicada `<tema-en-minusculas>/loteNN/`; código de pie con prefijo del área (`AL` álgebra, `CD` cálculo diferencial, `CI` cálculo integral, `MA` otros) + `-LNN-HNN`; verificador `qa/rigor/verificar_lote_NN.py`; tarjeta nueva (publicar `taller/out/loteNN.html` con título «Lote NN · Nombre · tarjeta de revisión», icono «Sigma») y anotar su enlace y slug en el estado, en una sección «## Lote NN · Nombre» con su línea «Faltan».
- Si un título del pedido ya tiene hoja con APR (mismo contenido), no se hace hoja nueva: se anota en el estado «enlazar a LNN HNN» y se pasa al siguiente.
- Antes de empezar, mira en el estado si hay «Correcciones de Óscar pendientes»: si las hay, se aplican primero (suben de versión y quedan «Pendiente de APR») y cuentan dentro de las 3 hojas de la corrida.
- Cada corrida deja al final del estado una línea «Corrida <fecha y hora>: hojas hechas» para llevar la cuenta de los ciclos de 50 títulos.

## Dos leyes nuevas de Óscar (22-nov, 20:25) — valen para TODA hoja y TODA animación
1. **Nada de lo que aparece en una animación por pasos desaparece.** Lo de cada paso (en la figura: piezas, rótulos, cotas, aportes; y en la lectura bajo el dibujo) queda a la vista hasta el último paso. Al llegar al final se mantiene **3 segundos** (`hold:3000`) y recién ahí vuelve a empezar desde el paso 1. La pregunta de arriba no se reemplaza: la respuesta se escribe a su lado. La lectura (`readout`) es **acumulada**: usa `dtPasos(R.slice(0, k))` de `l28/partes/_det.js` (un solo bloque `aligned`, pasos numerados, uno bajo el otro; cada línea de 340 px o menos).
2. **Paso a paso completo, sin saltos: es la ley de todo desarrollo.** En la lectura de una animación con números y en cada ejemplo o ejercicio, ningún resultado aparece sin su cuenta: datos → fórmula → reemplazo → cada producto por separado → la resta o suma → resultado → interpretación. Si hay que «adivinar de dónde sale» un número, falta un paso. En las lecturas numéricas, redondea primero los datos a 2 decimales y calcula con esos, para que todas las líneas calcen. Modelo: `det2-vivo` y `det3-vol` (lote 28, H01 y H02).

## Tercera ley de Óscar (22-nov, 22:14): «no hay que adivinar qué quiere mostrar la animación»
Óscar revisó el lote 28 y rechazó TODAS las animaciones «vivas» (las de deslizadores, número ↔ figura) y varias «idea»: «hay que adivinar lo que quiere mostrar y el paso a paso no está», «es imposible apreciar qué es lo que la animación quiere mostrar», «estoy harto de escribir una y otra vez lo mismo». Desde ahora, **toda animación, sin excepción**:
1. **Dice arriba qué muestra**: franja `dtQue(S, línea1, línea2)` (en `l28/partes/_det.js`; deja 1 unidad más de alto arriba en el `world`). Frases cortas, de 45 caracteres o menos por línea, que nombren la idea («el determinante es el volumen del cuerpo, con signo…»).
2. **Trae antes, en la hoja, «cómo leerla»**: un `<ol class="steps">` justo antes del `<div class="stage">`, de 3 a 5 pasos: qué mirar primero, qué mirar después, qué mover, y qué leer en la cuenta de abajo y qué concluir.
3. **Su lectura (`readout`) es el desarrollo completo con `dtPasos`**: datos → fórmula → reemplazo → cada operación por separado → resultado → qué significa. Nada de una sola línea con el resultado.
4. Si es por pasos: **nada desaparece** (figura y lectura acumuladas), `hold:3000`, registro `oaReg`.
5. En el lienzo, cada elemento que importa lleva su rótulo junto a él; si algo cambia de color o de lado, una frase en el lienzo dice por qué.
Modelo: `det2-vivo` (L28 H01 v003) y `det3-vol` (L28 H02 v003), con sus `<ol class="steps">` en `01.art.html` y `02.art.html`.
**Antes de dar por terminada cualquier hoja, pregúntate por cada animación: «¿un alumno que la ve por primera vez entiende, sin adivinar, qué se le quiere mostrar y de dónde sale cada número?». Si la respuesta no es un sí claro, no está terminada.**
Cuando la corrida es de correcciones (no de hojas nuevas), puede corregir **hasta 5 hojas** en vez de 3.

## Cuarta ley de Óscar (23-nov, 20:46): «todo se explica paso a paso, y se dice de dónde sale»
Palabras de Óscar: «Somos una academia de matemáticas de enseñanza gratuita, llegamos a todo tipo de estrato socioeconómico. En consecuencia, todo debe ser explicado paso a paso. No sacas nada con decir "la animación muestra tal cosa", si no muestras el desarrollo de ella. No sacas nada con decir que la fórmula del término enésimo de una sucesión es tal, si no dices de dónde salió y cómo la encontraste.»
1. **Ninguna fórmula se enuncia sin su origen.** Antes de (o junto a) cada fórmula va cómo se llega a ella, desde lo que el alumno ya tiene: casos concretos → regularidad → fórmula → comprobación. Vale para el encabezado (`lede`), los recuadros y los ejemplos.
2. **Ninguna frase del tipo «la animación muestra…» sin el desarrollo.** Lo que la animación muestra se desarrolla escrito, paso por paso, en la hoja y en la lectura.
3. Se escribe para quien parte de cero: cada término nuevo se explica la primera vez que aparece; ningún paso «evidente» se omite.
4. Vale para **todas** las hojas ya hechas (Óscar nombró los lotes 20, 21, 22, 23, 24 y 25, y pidió revisar todo). Óscar no va a volver a revisar una por una: la revisión contra las cuatro leyes es responsabilidad de quien produce.

### Lista de control de la cuarta ley (sale de las 16 notas de Óscar a L25 H02–H09, 23-nov)
Antes de cerrar una hoja, recorrerla entera con estas preguntas. Cada «no» se corrige.
1. **¿Cada afirmación trae su porqué?** «Infinitos términos pero solo dos valores» → se calculan los términos uno por uno y se explica por qué se repiten (nota: «por qué, explícalo»).
2. **¿Cada fórmula del encabezado dice de dónde sale?** Casos \(n=1,2,3,4\) escritos uno bajo otro → regularidad → fórmula (nota a H09: «¿por qué? muéstralo paso a paso»).
3. **¿Cada objeto que se nombra se muestra?** Si se dice «suma parcial \(S_n\)», se escriben \(S_1, S_2, S_3, \ldots, S_{n-1}, S_n\) y un ejemplo con números, y se dice dónde se ve en la animación (notas: «¿dónde está? no la veo», «¿cuáles son S1, S2…?»).
4. **¿Cada «se despeja», «se resta», «se reemplaza» está hecho, no comentado?** Una línea por operación, con lo que se hizo a la derecha (`aligned` con `&&\text{…}`), y después un ejemplo numérico (notas: «despéjalo y muéstralo», «hazlo, muéstralo, enséñalo, no solo lo comentes», «hacer todo esto paso a paso»).
5. **¿Cada demostración dice qué se demuestra y cómo funciona el método** antes de empezar? (nota: «¿cuál demostración?»).
6. **¿Cada símbolo dice cómo se lee**, completo? (nota a la sigma: «se lee sumatoria de los a sub k, desde k igual a…»).
7. **En las animaciones de sucesiones:** una línea por término, «para \(n=1\): …», «para \(n=2\): …», que **no se borra**, y al final «para \(n=n\): fórmula» (`ssPlot` con `reg`, `regFin`, `que`; ver `l25/partes/01` a `03`). Las fracciones van escritas como fracciones (rótulos TeX), y **todos** los términos llevan su rótulo en la figura, también los chicos (con una línea guía; ver `ss-serie`, `04.scene.js`).
8. **En la lista «Paso a paso» del lienzo no hay saltos:** nada de «de donde \(a_n=\ldots\)»; se muestra la regularidad en las líneas anteriores (\(2+1\cdot 3\), \(2+2\cdot 3\), \(2+3\cdot 3\)) y recién entonces la general.
9. Se escribe para quien parte de cero: público de todo estrato, enseñanza gratuita. Frases cortas, un paso por línea.

## Quinta ley de Óscar (23-nov, 21:07): «la animación muestra cada cosa que nombra, y nada desaparece»
Palabras de Óscar: «Las animaciones muestran los pasos 1, 2, 3, 4, 5, 6: aparecen y luego desaparecen. Deben quedar cada uno de los pasos y nunca desaparecer. […] Varias animaciones no muestran o enseñan lo que dicen que hacen. El objetivo de la animación es un apoyo didáctico a la pedagogía de las matemáticas y en consecuencia debe apoyar cada concepto que menciona e incluso mostrarlo o ilustrarlo. Si digo un salame, una rodaja y una redondela, no es lo mismo que mostrar en una animación cada una de ellas.»
1. **La animación termina y se queda:** el motor ya no vuelve a empezar solo (parche en todas las hojas publicadas y en el molde, 23-nov): al llegar al final queda el estado final completo, con todos los pasos a la vista, hasta que el alumno pulse «Reproducir». No depender de `hold`.
2. **Cada paso deja algo visible hasta el final** en la figura y en el registro; ninguna frase, pieza, rótulo ni cuenta de un paso se reemplaza por la del siguiente. Si la frase del lienzo cambia en cada paso, su contenido tiene que quedar también en el registro o en la figura.
3. **Cada concepto que la hoja o la animación nombra se ve en la animación**, con su rótulo: si el texto dice «término», «suma parcial», «diferencia», «salto», «lo que falta», cada uno aparece dibujado y señalado. Lista de control: subraya los sustantivos matemáticos del texto «Cómo leer la animación» y de la franja «Qué muestra»; cada uno debe poder apuntarse con el dedo en la figura.
4. **La animación hace lo que su título promete.** Si no lo muestra, se rehace; no se arregla con texto.
5. El resto de los criterios sale de todas las revisiones anteriores de Óscar (secciones de criterios del estado y leyes 1 a 4): repasarlas antes de cerrar cada hoja.

## Lote en curso desde el 23-nov 12:30 UTC
El lote 28 y el lote 25 ya no tienen nada por producir. **El lote en curso es el 29 · Límites** (`taller/src/l29/partes/`, ayudantes `_txt.js _det.js _lim.js`, armado `../NN-lim.html`, `python3 taller/build.py 29 "Límites"`, código `CD-L29-HNN`, carpeta `limites/lote29/`, verificador `qa/rigor/verificar_lote_29.py`, tarjeta https://claude.ai/artifact/CAZhB9evwiS3RLpJuy88qo). Modelo: `l29/partes/01.*`. La línea «Faltan» está en la sección «Lote 29» del estado.

## Lote en curso desde el 23-nov 16:32 UTC
El lote 29 ya no tiene nada por producir (H01–H12). **El lote en curso es el 30 · Propiedades de límites** (`taller/src/l30/partes/`, ayudantes `_txt.js _det.js _lim.js _prop.js` (desde H02), armado `../NN-prop.html`, `python3 taller/build.py 30 "Propiedades de límites"`, código `CD-L30-HNN`, carpeta `limites/lote30/`, verificador `qa/rigor/verificar_lote_30.py`, tarjeta https://claude.ai/artifact/3NVzZhZq36ve1KnezsneKL). Modelo: `l30/partes/01.*` y `l29/partes/10.*` a `12.*`. La línea «Faltan» está en la sección «Lote 30» del estado.

**Tarjetas grandes (23-nov):** para republicar una tarjeta no hace falta leerla entera: `python3 taller/build.py NN "Nombre"` y publicar `taller/out/loteNN.html` con `publish_files` (`as: index.html`, `slug` y `base_version` de `get_artifact`). Así quedaron al día L29 (H01–H12, versión `1795472271-7ba4`) y L25 (H01–H34, versión `1795472273-6d3e`). Republicar la tarjeta en cada corrida.
