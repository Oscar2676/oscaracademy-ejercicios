# Pedido de producción de Óscar · cola al 21-nov-2026 (378 títulos; 348 por producir)

Texto completo del pedido (última versión, 21-nov 02:18, **378 títulos** + 2 solo por enlazar): `taller/pedidos/pedido-2026-11-21-378-hojas.txt` en el repositorio. Creció así: 44 → 63 → 124 → 184 → 284 → 378 (los 94 últimos son de **1º Básico**). Cada pedido nuevo **reemplaza** al anterior (lo contiene); es la cola de producción. Ojo: el selector sigue listando los títulos ya producidos (sus marcas persisten): de los 378, **30 ya tienen hoja** (lote 18: 5, lote 19: 8, lote 20: 13, y 4 por enlace: L01, L03 ×2, L09) y **348 están por producir**.

## Cola al 21-nov 02:30 (348 por producir)
| # | Grupo | Hojas |
|---|---|---|
| 1 | Integración y acumulación de cambio (Cálculo I) — **producido: lote 21** | 12 |
| 2 | Aplicaciones de la integral (Cálculo I: 5 · Cálculo II: 7) | 12 |
| 3 | Paramétricas, polares y vectoriales (Cálculo II: 9 + 4 · Cálculo dif. 5ª parte: 1) | 14 |
| 4 | Binomio de Newton (18) + Números combinatorios (1) | 19 |
| 5 | Series y sucesiones (20) · Sucesiones geométricas (16) · Criterios de comparación (1), Cálculo II | 37 |
| 6 | Límites y teorema del valor medio (Cálculo diferencial 1ª parte) | 60 |
| 7 | Integración (Cálculo superior: 87 · Cálculo integral: 13) | 100 |
| 8 | 1º Básico | 94 |

En los grupos 6 y 7 muchos títulos equivalen entre sí o a hojas existentes: proponer a Óscar cuáles se enlazan y cuáles son hoja nueva. Falta enlazar en más lugares 3 hojas existentes: «Aproximar áreas con sumas de Riemann» → L09 H01 (ft30u comp-lcno0t9y · qudgj comp-l2qt71ce); «El teorema fundamental del cálculo e integrales definidas» → L03 H02 (ft30u comp-lcno0ta7 · qudgj comp-l2qt71cg1 · x238t comp-kagpp18d); «Utilizar integración por partes» → L03 H03 (ft30u comp-lcno0tab1 · qudgj comp-l63ssqjv). Preguntar antes: son títulos parecidos, no idénticos.

Reglas de Óscar para este pedido: rigurosidad máxima, doble revisión, tolerancia cero, no inventar nada, preguntar lo que no se sepa; comparar resultados con sus fuentes de consulta; los títulos «Ejemplo N…» son hojas de ejercicio; borrar tarjetas repetidas dentro de una caja y reordenarla; títulos equivalentes a hojas ya aprobadas se enlazan a ellas; diagramación atractiva con recuadros en los cuatro colores institucionales (verdoso, azulino, caqui/naranjo, burdeo).

**Regla desde las 15:55 del 20-nov: tras cada APR, Claude enlaza la hoja en Wix y PUBLICA él mismo** («publica tú, no dependas de mí para eso»). Se publica con `button.top-bar-publish-btn` del editor en el navegador integrado; Wix responde «Tu sitio se ha publicado» (cerrar con «Hecho»).

## Avance al 21-nov 09:10: 50 hojas con APR (lote 22 completo: 12). En revisión: lote 23 H01 v002 y H02–H05

## Antes, al 21-nov 04:30: 38 hojas con APR, enlazadas y publicadas. **Lote 20 completo (13/13)** y **lote 21 completo (12/12)**
| Lote | Hojas | Estado |
|---|---|---|
| 18 · Teorema del valor medio (`calculo-diferencial/lote18/`) | H01 Condiciones (v005) · H02 Aplicación · H03 Ejemplo 1 (v002) · H04 Ejemplo 2 · H05 Ejemplo 3 | **5/5 con APR, publicadas** (Cálculo I [ft30u] y II [qudgj]). Tarjeta https://claude.ai/artifact/D7qobYPF5gJhfRbJnWdSX7 (slug 622233e3-3be9-4bd2-868f-b062c517a026) |
| 19 · Análisis de funciones (`calculo-diferencial/lote19/`) | H01 Crecimiento (v002) · H02 Máx. y mín. (v002) · H03 Criterio 1ª derivada (v003) · H04 Concavidad (v004) · H05 Puntos de inflexión (v002) · H06 f, f′, f″ (v002) · H07 Gráficas de f y f′ (v003) · H08 Implícitas | **8/8 con APR, publicadas.** Tarjeta https://claude.ai/artifact/FbYm7qhgi2Ji5kpiXRKJD5 (slug 7632cd78-63bf-4f1d-8fda-f79e9d39b7f0) |
| 20 · Aplicaciones de las derivadas (`calculo-diferencial/lote20/`), 1ª tanda | H01 Introducción a las razones relacionadas (v001) · H02 Globo que se infla (**v007**) · H03 Distancia entre dos autos (v001) · H04 Escalera que resbala (v001) | **4/4 con APR, publicadas** (commit 339d010). H01: ft30u comp-lcno0t8e2 · qudgj comp-lcit01bv. H02: ft30u comp-lcno0t8g1. H03: ft30u comp-lcno0t8h2. H04: ft30u comp-lcno0t8j1 · qudgj comp-lcitai3u. Tarjeta https://claude.ai/artifact/V3Xzhey1C3gr9QXP5VAYR2 (slug e31a78a5-3548-4ea7-acf8-c900a62e33f5). `qa/rigor/verificar_lote_20.py`: 0 errores |

Además: 3 títulos resueltos por enlace (Riemann L09 H01, TFC L03 H02, por partes L03 H03), «Teorema del Valor Medio» → L01 H03 en 6 lugares y 4 tarjetas repetidas de «área entre curvas» borradas. Todo publicado.

### L20 H02, cómo quedó (siete versiones el 20-nov)
Tres animaciones en `taller/src/l20/partes/02.scene.js`: `rr-globo` (globo en 3D con degradado, r, capa dr, centro (0, 0); bajo ella solo la cadena ecuación → reemplazo de r → despeje), `rr-cuatro-formulas` (circunferencia, círculo, superficie y volumen de la esfera, con flechas integrar/derivar) y `rr-area-volumen` (seis pasos: dA → A = ∫dA → bloque dA·dr → capa dV = 4πr² dr → V = ∫₀ʳ 4πρ² dρ → V = (4/3)πr³, con deslizador de paso). Sección «Del área al volumen, paso a paso» con un recuadro por tramo de la cadena. El área 4πr² va deducida con integral doble en coordenadas esféricas (se avisa que es de cursos posteriores).

**Con APR del 20-nov, enlazadas en Cálculo II y publicadas:** L20 H05 «Razones relacionadas: llenado de un tanque cónico» (`H05_razones_relacionadas_llenado_de_un_tanque_conico.html`; qudgj comp-lcit6l3f) y L20 H06 «Razones relacionadas: sombra de una persona que camina» (`H06_razones_relacionadas_sombra_de_una_persona_que_camina.html`; qudgj comp-lcit6zcg). Fuentes `05.*` y `06.*`. «Solo enlazar» del pedido de 284: TFC → L03 H02 enlazado también en x238t comp-kajpp62e y bb5wq comp-mvuxjfce9 (publicado).

**Con APR del 21-nov, enlazadas y publicadas:** L20 H07 «La regla de L'Hôpital» (`H07_la_regla_de_l_hopital.html`; ft30u comp-lcno0t8l · qudgj comp-lcit01ai) y L20 H08 «Aplicación de la regla de L'Hôpital para determinar límites indeterminados» (`H08_aplicacion_de_la_regla_de_l_hopital_limites_indeterminados.html`; li9mn comp-lck53ins · ft30u comp-lcno0t8m2 · qudgj comp-lcit01bl1). Fuentes `07.*` y `08.*` (se arman a `07-lh.html` y `08-lh.html`). H07 demuestra solo el caso simple; el general (TVM de Cauchy) queda sin demostrar y se le avisó.

L20 H09 «Derivadas para razones relacionadas» (`H09_derivadas_para_razones_relacionadas.html`; ft30u comp-lcno0t8d · qudgj comp-lcit01bi) y L20 H10 «Aplicaciones de las derivadas aplicadas al movimiento» (`H10_aplicaciones_de_las_derivadas_al_movimiento.html`; ft30u comp-lcno0t8b1 · qudgj comp-lcit01be): APR del 21-nov, enlazadas y publicadas.

**Con APR del 21-nov (02:17), enlazadas en Cálculo I, Cálculo II y Matemáticas · Parte 2, y publicadas:**
- L20 H11 «Derivada de funciones parametrizadas» (`H11_derivada_de_funciones_parametrizadas.html`): ft30u comp-lcno0t8o · qudgj comp-lcit01bo · bb5wq comp-mvuxjfbh9
- L20 H12 «Derivada de funciones parametrizadas 2» (segunda derivada; `H12_derivada_de_funciones_parametrizadas_2_segunda_derivada.html`): ft30u comp-lcno0t8q · qudgj comp-lcit01br · bb5wq comp-mvuxjfbh14
- L20 H13 «Derivada de funciones vectoriales» (`H13_derivada_de_funciones_vectoriales.html`): ft30u comp-lcno0t8r1 · qudgj comp-lcit01by1 · bb5wq comp-mvuxjfbh19

## Lote 21 · Integración y acumulación de cambio (`calculo-integral/lote21/`, fuentes `taller/src/l21/partes/`, `qa/rigor/verificar_lote_21.py`)
Tarjeta https://claude.ai/artifact/PrRgE31ocsW1SQj37LuqdY (slug b90fb3da-81d8-4d6b-b293-cedf32eb1797). Código de pie `CI-L21-HNN`. Se arma con `python3 taller/build.py 21 "Integración y acumulación de cambio"`.
- **Con APR del 21-nov (02:44), enlazadas y publicadas:** H01 «Exploración de acumulaciones de cambio» (`H01_exploracion_de_acumulaciones_de_cambio.html`; ft30u comp-lcno0t9w · qudgj comp-l2qt71ca · qclgl comp-l4skmywg · x238t comp-kagozn2k) y H02 «Aplicar propiedades de las integrales definidas» (`H02_propiedades_de_las_integrales_definidas.html`; ft30u comp-lcno0ta0 · qudgj comp-l2qtbctn · qclgl comp-l4skmywp1).
- **APR 21-nov 04:21, enlazadas y publicadas:**
  - H03 «Sumas de Riemann, notación de suma y notación de integral definida» (`H03_sumas_de_riemann_notacion_de_suma_e_integral_definida.html`): ft30u comp-lcno0ta11 · qudgj comp-l63sxn9u · qclgl comp-l63qfa0g
  - H04 «El teorema fundamental del cálculo y funciones de acumulación» (`H04_teorema_fundamental_del_calculo_y_funciones_de_acumulacion.html`): ft30u comp-lcno0ta31 · qudgj comp-l2qt9dak · qclgl comp-l4skmywm · qtf2i comp-la922ag4 · x238t comp-kagpi99q
  - H05 «Interpretar el comportamiento de funciones de acumulación que involucran área» (`H05_interpretar_funciones_de_acumulacion_que_involucran_area.html`): ft30u comp-lcno0ta5 · qudgj comp-l63syhke · qclgl comp-l63qho3e · qtf2i comp-la922ag52
- Escena común de dos paneles (f arriba con su área, g = ∫f abajo con tangente): `taller/src/l21/partes/_acu.js` (`oaAcu`); H04 y H05 se arman con `cat _acu.js NN.scene.js`.
- **APR 21-nov 04:21, enlazadas y publicadas, segunda tanda:**
  - H06 «Antiderivadas e integrales indefinidas: reglas básicas y notación; integrales definidas» (`H06_antiderivadas_reglas_basicas_e_integrales_definidas.html`): ft30u comp-lcno0taa · qudgj comp-l2qt9dc4 · qclgl comp-l4skmyx51
  - H07 «…regla de la potencia inversa» (`H07_antiderivadas_regla_de_la_potencia_inversa.html`): ft30u comp-lcno0ta81 · qudgj comp-l2qt71cl · qclgl comp-l4skmywt
  - H08 «Integrales por sustitución» (`H08_integrales_por_sustitucion.html`): ft30u comp-lcno0taj · qudgj comp-l59tqjj9
  - H09 «Integración mediante división larga y al completar el cuadrado» (`H09_integracion_por_division_larga_y_completando_el_cuadrado.html`): ft30u comp-lcno0tag · qudgj comp-l2qtbcu7 · qclgl comp-l4skmyww1
  - H10 «Integración con fracciones parciales» (`H10_integracion_con_fracciones_parciales.html`): ft30u comp-lcno0tah2 · qudgj comp-l63stqzk · qclgl comp-l63qj2oy · qtf2i comp-la945dne2 · x238t comp-kajoitym · bb5wq comp-mvuxjfcg5
- **APR 21-nov 04:21, enlazadas y publicadas, cierre del lote:**
  - H11 «Evaluar integrales impropias» (`H11_evaluar_integrales_impropias.html`): ft30u comp-lcno0tae1 · qudgj comp-l2qtac3k · qclgl comp-l4skmyx31 · qtf2i comp-la94guzo
  - H12 «Integración y acumulación de cambio», **hoja propia de presentación del tema** pedida por Óscar (03:26): `H12_integracion_y_acumulacion_de_cambio_presentacion_del_tema.html`; ft30u comp-lcno0tad · qudgj comp-l2qtbcup · qclgl comp-l4skmywy · bb5wq comp-mvuxjfbi4. Trae un «mapa del tema» con enlaces a las otras hojas del lote y a L09 H01, L03 H02 y L03 H03: **si cambia el nombre de archivo de alguna, actualizar esos enlaces.**
- **Lote 21 completo: 12/12 con APR (21-nov), enlazadas en Wix y publicadas.**
- **Ritmo acordado (21-nov 02:42):** Óscar pide que se le presenten las hojas para APR **de 5 en 5, y después de 10 en 10**.

## Lote 22 · Aplicaciones de la integral (`calculo-integral/lote22/`, fuentes `taller/src/l22/partes/`, `qa/rigor/verificar_lote_22.py`)
Tarjeta https://claude.ai/artifact/QAGc73ZARxHyBJJB67mP15 (slug bb8d800c-0943-4255-80f2-4fbb3c72907c). Código de pie `CI-L22-HNN`. Se arma con `python3 taller/build.py 22 "Aplicaciones de la integral"` (partes → `01-ay`, `02-cru`, `03-prom`, `04-mov`, `05-acu`).
- **Lote 22: H01–H11 con APR de Óscar (21-nov 07:47), enlazadas en Wix (29 enlaces) y publicadas.** Los ids se buscan por título exacto con `__scan()` (los anotados a mano para H02 estaban malos). Ids reales:
  - ft30u: H01 comp-lcno0taz1 · H02 comp-lcno0tb1 · H03 comp-lcno0tas1 · H04 comp-lcno0tau1 · H06 comp-lcno0tb62 · H07 comp-lcno0tb92 · H08 comp-lcno0tbd · H11 comp-lcno0tbe2
  - qudgj: H01 comp-l63t26et · H02 comp-l63t25ql · H03 comp-l2quvfb71 · H04 comp-l63t26up · H05 comp-l63t268k · H06 comp-l63t6v00 · H07 comp-l63t8bn8 · H08 comp-l63t8a5j · H09 comp-l63t26cx · H10 comp-l63t6qhh · H11 comp-l2quvfc0
  - qclgl: H01 comp-l63qrtxr · H03 comp-l63qrtyw · H04 comp-l63r3orp · H05 comp-l63qrs2l · H06 comp-l63qrt3u · H07 comp-l63qrt0f · H08 comp-l63ralz7 · H09 comp-l63qrs86 · H10 comp-l63qrs1e · H11 comp-l63raera
  - Archivos: H01_area_entre_curvas_expresadas_como_funciones_de_y · H02_area_entre_curvas_que_se_intersectan_en_mas_de_dos_puntos · H03_valor_promedio_de_una_funcion_en_un_intervalo · H04_conectar_con_integrales_posicion_velocidad_y_aceleracion · H05_funciones_de_acumulacion_e_integrales_definidas_en_contextos_aplicados · H06_volumen_con_metodo_de_discos_revolucion_alrededor_del_eje_x_o_y · H07_volumen_con_metodo_de_discos_revolucion_alrededor_de_otros_ejes · H08_volumen_con_metodo_de_anillos_revolucion_alrededor_de_otros_ejes · H09_volumen_con_secciones_transversales_cuadrados_y_rectangulos · H10_volumen_con_secciones_transversales_triangulos_y_semicirculos · H11_longitud_de_arco_de_una_curva_suave_y_distancia_recorrida (.html)
  - Fábricas 3D: `_sol.js` (`oaSol`, revolución; opciones `dx` [rebanada con grosor y mini rectángulo generador] y `side:-1` [radio hacia la curva]) y `_sec.js` (`oaSec`, secciones). Se arman con `cat _sol.js NN.scene.js` / `cat _sec.js NN.scene.js` → `06-dis`, `07-dis2`, `08-ani`, `09-sec`, `10-sec2`, `11-arco`, `12-ax`.
- **LOTE 22 COMPLETO: 12/12 con APR (21-nov 09:05), enlazadas y publicadas.** H12 enlazada en ft30u comp-lcno0tay · qudgj comp-l63t25gs · qclgl comp-l63qrszb. Lo de abajo es el historial de correcciones de ese día:
  - **H07 v002** (ya enlazada y en línea): corrección de Óscar tras el APR: en las dos animaciones, marcar el dx (dy) con un mini rectángulo de ese espesor y largo R. Hecho con `dx` y `side:-1`. Óscar dijo sí (08:27) a lo mismo en **H06 y H08: v002 hechas, pendientes de APR** (en anillos el rectángulo va de r a R; los dos radios se dibujan hacia las curvas).
  - **H01 v002: APR de Óscar (21-nov 08:51)**, ya enlazada y en línea. Corrección de Óscar (08:43): marcar el dy en la tira como en H06/H07 y explicar de dónde sale la t de la integral acumulada. Hecho: tira rectangular con «dy», lectura reescrita («tira a la altura t», «suma desde t = −1 hasta t = y») y recuadro «¿De dónde sale la t?» (variable muda, paso a paso). Lo mismo aplicado a H12 (dx y recuadro). Segunda corrección (08:48): la entradilla dice «tiras horizontales de espesor (alto) dy» y lo muestra con una figura SVG propia (región cortada en tiras, una destacada con su dy).
  - **Orden de Óscar (08:52): «aplica las correcciones de H1, H6, H7, H8 a todo el lote 22».** Hecho: diferencial marcado como mini rectángulo rotulado (dx en H02, H09, H10; dt en H04, H05) y recuadro «¿De dónde sale la t (o τ)?» en H02, H04–H10; entradilla con «de espesor dx» donde corresponde; H12 con figura SVG de tiras. **v002 pendientes de APR: H02, H04, H05, H06, H07, H08, H09, H10.** Sin cambios (no aplica): H03 (no tiene tira ni variable muda) y H11 (Δx y Δy ya marcados; integral con límites fijos). `_sec.js` dibuja ahora la rebanada como prisma con «dx» en el piso.
  - **H12 v001** «Determinar el área entre curvas expresadas como funciones de x» (Óscar: «hazla nueva»; `H12_area_entre_curvas_expresadas_como_funciones_de_x.html`): ft30u comp-lcno0tay · qudgj comp-l63t25gs · qclgl comp-l63qrszb. Enlaza a H01 y H02 del lote.
- Avisos dados a Óscar: H11 afirma sin demostrar que ∫√(1+cos²x)dx no tiene antiderivada elemental; H03 usa sin demostrar valores extremos y valor intermedio. La vista previa del taller no dibuja las fórmulas (TeX): se le pidió mirarlas en la tarjeta.
- `qa/rigor/derivadas_escenas.js` espera `_chk` con `d0, d1`; las escenas de l21 y l22 usan `_chk:[{f, df, at}]` y se comprueban con el bucle de node anotado en el historial del 21-nov (0 derivadas malas).

## Respuestas de Óscar del 21-nov 09:24 y lo hecho
- «4. Sí, corrígelas» (lotes 21 y 23 con el criterio del diferencial marcado y la letra muda explicada). **Hecho, pendientes de APR:**
  - Corrección de Óscar (09:31, L21 H01): «marca un espesor sin nombre y aparece un dt en el aire» → la tira lleva ahora su rótulo pegado con una línea guía: «ancho de la tira = dt» (así en todas las tiras del lote 21; H01 pasa a v003). **No usar llave + letra suelta bajo el eje.**
  - **Lote 21 v002:** H01, H08, H09, H12 (tira negra con «dt»/«dx»/«du» y recuadro «¿De dónde sale la τ / t?»); H04 y H05 (tira «dx» en la escena común `_acu.js` y su clave; H04 ya explicaba la letra en su recuadro). Sin cambios: H02, H03, H06, H07, H10, H11 (sin tira que avance ni letra muda). Todas ya publicadas: se ven en línea con pie «Pendiente de APR».
  - **Lote 23:** H02 v002 (tramo «ds» y recuadro de la τ), H05 v002 (arco «dθ», recuadro de la u, entradilla «cuñas de ángulo dθ»).
- **L23 H01 v003** (corrección 09:26): etiquetas por fuera de la elipse con las coordenadas en expresión: naranja «(3 cos t, 2 sen t)» para el punto de la elipse y burdeo «(3 cos t, 3 sen t)» para el punto del círculo grande. Óscar escribió «(3cost, 3sent)» para el punto de la elipse; se le avisó que ese es el del círculo y que el de la elipse lleva 2 sen t.
- **Orden de Óscar (09:33): aplicar los criterios del lote 22 a todos los lotes que lo requieran, e informar corto** (no quiere el detalle de lo hecho; sí las aclaraciones necesarias). Revisión hecha sobre todos los lotes: solo requieren cambio los que tienen integral acumulada o tira que avanza. Hecho: L22 H02, H04, H05 **v003** (rótulo con línea guía «ancho de la tira = dx/dt» en vez de llave chica); L03 H07 **v003** (recuadro que explica la t de ∫₀ˣ…dt; mismo nombre de archivo `…_v002.html` para no romper enlaces). Revisados y sin cambio: L03 H02 (ya explica las dos letras y la franja de ancho h), L03 H03 (franjas du y dv explicadas), L03 H04 y L09 H01 (Δx rotulado), lotes 01, 02, 04–08, 10–20 (sin integrales acumuladas). **L22 H02, H04, H05 v003: APR de Óscar (21-nov 09:53); lote 22 otra vez 12/12 con APR. Pendiente de APR por esto: L03 H07 (v003).** Además (09:51) Óscar respondió «A»: «Área entre curvas como funciones de x» se queda en la hoja nueva L22 H12; no se enlaza a L03 H04.
- «3. Sí a hoja nueva»: los 3 títulos parecidos al lote 20 se hacen como hojas nuevas en el lote 23 → **faltan 9 hojas en el lote 23** (las 6 de abajo + «Definir y diferenciar ecuaciones paramétricas», «Segundas derivadas de ecuaciones paramétricas», «Derivada de funciones con valores vectoriales»).
- «2. Aplícalas» / «5. Continúa»: las hojas nuevas van con los criterios nuevos; después sigue la cola (binomio de Newton, series, límites, integración, 1º Básico).

## 21-nov 10:30 · ALTO EN WIX + L23 H06–H08
- **ALTO EN WIX (10:12):** Óscar edita las cajas de la página «Álgebra 1ª Parte» (cambia mucho el tamaño). **No enlazar ni publicar nada en Wix hasta que diga «terminé en Wix»** («entendido», 10:15). Los APR mientras tanto: solo pie + repo, y el enlace queda en cola. **Antes de volver a enlazar: recargar el editor y redefinir los ayudantes**, para no pisar sus cambios.
- **Cola de enlaces Wix:** (vacía).
- **10:39 Óscar: «terminé en Wix» → ALTO LEVANTADO.** Editor recargado (copia fresca). Los ayudantes (`__go`, `__link`, `__one`, `__save`, `__pub`…) hay que redefinirlos antes de enlazar.
- **Pedido de Óscar (10:39): revisar que la última caja de cada página de cursos quede separada del pie igual que caja con caja.** Auditoría (solo lectura, `ds.components.layout.get` sin navegar; separación = alto de la sección − borde inferior de la caja más baja; coincide con lo publicado): 14 páginas con 0 px (qclgl, l2r26, yxl81, ra111, vp2km, sxqsb, j2qp2, ik0j0, d4yrb, nrtck, jvh30, u88nn, rxk3b, t2ams), 9 con menos que su separación entre cajas (iacyn, x238t, rujyu, ep9f2, x6vzw, a2ed2, i7o2q, ehzts, oy9bm) y unas 55 con más (30–73 px; entre cajas hay 19–25). **Nada modificado: se le preguntó si se corrigen las 23 o se igualan todas.**
- **L23 H06–H08 v001 hechas, pendientes de APR** (verificador 0 errores, 9 escenas con derivadas comprobadas):
  - H06 «Área de la región acotada por dos curvas polares» (`pol-area-dos`).
  - H07 «Introducción a funciones con valores vectoriales» (`vec-intro`) → Wix: qudgj · qtf2i.
  - H08 «Derivada de funciones con valores vectoriales» (`vec-derivada`) → Wix: fr2b0 · qudgj · qtf2i.
- **Faltan 6 hojas del lote 23:** r(t) con componentes trigonométricas · segunda derivada vectorial · vector aceleración · ejercicios de movimiento · definir y diferenciar paramétricas · segundas derivadas paramétricas.
- **Esperan APR:** L03 H07 v003 · L21 H01 v003, H04, H05, H08, H09, H12 v002 · L23 H01 v003, H03, H04, H06, H07, H08.

## Lote 23 · Paramétricas, polares y vectoriales (`calculo-integral/lote23/`, fuentes `taller/src/l23/partes/`, `qa/rigor/verificar_lote_23.py`)
Tarjeta https://claude.ai/artifact/H9Jd3daoV1wVSG7FiX1zDA (slug 82bb0741-2206-4832-bb06-a09fe3f81dc5). Código de pie `CI-L23-HNN`. Se arma con `python3 taller/build.py 23 "Paramétricas, polares y vectoriales"`; partes → `NN-p.html` con `cat _txt.js NN.scene.js` (01, 02) o `cat _txt.js _pol.js NN.scene.js` (03–05; `_pol.js` trae la cardioide `oaCar` y la rejilla polar). Ruta de las hojas: Cursos › Cálculo II › Derivada de funciones paramétricas.
- **Pendientes de APR (21-nov 09:30), v001** (ids del pedido; al enlazar, buscar por título exacto con `__scan`):
  - H01 **v002** (2 correcciones de Óscar, 08:40: en `par-intro` destacar las expresiones x = 3 cos t, y = 2 sen t y marcar t → construcción con círculos de radio 3 y 2 y rayo de ángulo t; el ejemplo de la tabla merece dibujo → escena `par-tabla` dentro del recuadro) «Introducción a ecuaciones paramétricas» (`H01_introduccion_a_ecuaciones_parametricas.html`): qudgj comp-lcklq9xb1 · qclgl comp-l4skmyvn
  - H02 **v003: APR de Óscar (21-nov 10:05), enlazada y publicada** (corrección de Óscar 09:58: «la animación no representa el tema»; rehecha: sin rueda; el pedacito ds sobre la curva, recuadro «visto con lupa» con el triángulo dx = x′(t)dt, dy = y′(t)dt, ds = √(dx²+dy²), y regla «la curva estirada» que suma los ds hasta 8) «Determinar la longitud de arco de curvas dadas por ecuaciones parametrizadas» (`H02_longitud_de_arco_de_curvas_dadas_por_ecuaciones_parametrizadas.html`): qudgj comp-lcklq9xi1 · qclgl comp-l4skmyvt1 · qtf2i comp-la92e1083
  - H03 «Definir coordenadas polares y diferenciar en forma polar» (`H03_definir_coordenadas_polares_y_diferenciar_en_forma_polar.html`): qudgj comp-lcklq9za1 · qclgl comp-la7rpzbm1
  - H04 «Derivadas de funciones polares» (`H04_derivadas_de_funciones_polares.html`): qudgj comp-lcklq9zc1 · qclgl comp-la7rpzbo
  - H05 **v002: APR de Óscar (21-nov 09:47), enlazada y publicada** «Calcular el área de una región polar o el área acotada por una sola curva polar» (`H05_area_de_una_region_polar_o_acotada_por_una_sola_curva_polar.html`): qudgj comp-lcklq9zf1 · qclgl comp-la7rpzbq
- **Faltan (6 por producir):** «Calcular el área de la región acotada por dos curvas polares» (qudgj comp-lcklq9zi1 · qclgl comp-la7rpzbr2) · «Introducción a funciones con valores vectoriales» (qudgj comp-loxdt831 · qtf2i comp-loxe01jj) · «Derivada de r(t) con componentes trigonométricas» (qudgj comp-loxduwdf) · «Segunda derivada de funciones con valores vectoriales» (qudgj comp-loxdvfip · qtf2i comp-loxe01jl8) · «Vector aceleración como segunda derivada de r(t)» (qudgj comp-loxdw2m3) · «Resolver ejercicios de movimiento mediante funciones parametrizadas y con valores vectoriales» (qudgj comp-lcklq9xn · qclgl comp-l63rs19r · qclgl comp-la7rt1gn1).
- **Pregunta abierta a Óscar (3 títulos parecidos a hojas ya aprobadas del lote 20):** «Definir y diferenciar ecuaciones paramétricas» (qudgj comp-lcklq9xg · qclgl comp-l4skmyvr2 · qtf2i comp-la92e107) → ¿L20 H11? · «Segundas derivadas de ecuaciones paramétricas» (qudgj comp-lcklq9xl · qclgl comp-l4skmyvv) → ¿L20 H12? · «Derivada de funciones con valores vectoriales» (fr2b0 comp-m32dfqb312 · qudgj comp-loxdty8z · qtf2i comp-loxe01jk2) → ¿L20 H13? ¿Enlazar o hoja nueva?
- Aviso dado: H02 usa sin demostrar que la suma con t* y t** distintos converge a la integral.

## Criterios de Óscar para animaciones y texto (20-nov)
- Una condición o un caso importante dentro de un recuadro merece su propia animación explicativa dentro del mismo recuadro.
- Una discontinuidad se dibuja con **curvas**, no con rectas, y la gráfica debe **seguir** después del salto por otra curva más arriba en el mismo x.
- **Nuevos (L22 H01, 21-nov):** en toda animación con tira, disco o cuña se **marca el diferencial** (dx, dy, dθ) como un mini rectángulo con su espesor rotulado. Si bajo la animación aparece una integral con otra letra (t, τ, u), hay que **explicar paso a paso de dónde sale** (variable muda: el límite ya ocupa la letra). Pendiente de revisar con este criterio las hojas ya aprobadas que usan t sin explicarla (L21 y L22 H02–H11, L23).
- **Nuevo (L23 H02, 21-nov):** la animación debe **representar el tema de la hoja**, no solo ilustrar la curva del ejemplo: si el tema es una fórmula, la animación muestra las piezas de esa fórmula (p. ej. longitud de arco → triángulo dx, dy, ds y la suma de los ds).
- **Nuevos (L23 H01, 21-nov):** en una animación no basta mostrar valores numéricos de x e y: hay que destacar las **expresiones** que los producen (x = 3 cos t) y **marcar el parámetro** en el dibujo. Un ejemplo con tabla o con varias expresiones algebraicas lleva **su propio dibujo aclaratorio** que muestre cada valor.
- La curva de una animación debe «nacer» donde corresponde (p. ej. desde el II cuadrante).
- En máximos y mínimos el punto se **detiene** y muestra «f′(x) = 0»: sobre la tangente en el máximo, bajo ella en el mínimo (0,5 s en L19 H01–H02; 1,3 s en H03).
- Rótulos de signo sobre la barra: 13 px.
- Punto de inflexión rotulado con **I** (I₁, I₂). Curvatura: **dos flechas delgadas, normales a la curva, que salen de ella** («como dos dedos índices»), bien separadas; texto «curvatura hacia…» pegado a la curva.
- En paneles con varias curvas, cada una se rotula con su **función real** (fórmula), no con un número; en los cortes con las rectas punteadas va la **tangente** y se explica qué es cada punto y qué significa cada curva. **No borrar nada** de lo que ya había.
- Frases en clave como «de + a −», «f′ crece» **requieren explicación**: definición algebraica, qué se ve en cada gráfica y un ejemplo numérico (L19 H07).
- **Nuevos (L20 H02):**
  - Cuerpos en **3D con color degradado**, y los elementos del cálculo marcados y destacados (r, dr, centro).
  - **Nada de números sueltos** bajo una animación («chacra de números y cocientes»): lo que se muestre debe ser una **concatenación**, paso a paso, que parte de algo y llega a algo usando cálculo diferencial o integral (diferenciales dA, dr; integral escrita si se integra; derivada si se deriva). Si no se puede hacer así, no se pone.
  - La animación debe **apoyar lo que se quiere demostrar**, no ser «un simple dibujo bonito».
  - Una fórmula usada en la hoja (p. ej. el volumen de la esfera) se muestra **de dónde sale**.
  - Si Óscar manda una imagen de referencia, **no se usa esa imagen**: se redibuja con los colores institucionales y se hace útil (animada y con su desarrollo).
- Tras resolver notas, subir `taller/src/lNN/ronda.txt` para que la lista de la tarjeta parta en 0 (l20 va en 11).

## Taller
Fuentes en `taller/src/lNN/partes/` (`NN.art.html`, `NN.scene.js`; escenas comunes `_tvm.js` en l18; `_an.js` y `_tri.js` en l19; escenas propias en l20). Se arman con `cat` a `taller/src/lNN/NN-*.html`, luego `python3 taller/build.py NN "Nombre"` y se copian de `taller/out/hojas/loteNN/` a `calculo-diferencial/loteNN/`. Verificadores: `qa/rigor/verificar_lote_18.py`, `_19.py`, `_20.py` (0 errores), `derivadas_escenas.js`, `verificar_tex.py` (no sabe evaluar π ni e: marca como «FALSA» aproximaciones correctas; se comprueban en el verificador del lote), `rotulos_animaciones.js`.

Wix desde el navegador integrado: ayudantes `__go(pg)`, `__link(pg, id, url)`, `__save()`, `__chk(pg, ids)`, `__sleep` definidos en la pestaña del editor (`seed`; se pierden si se recarga; están en el historial del 20-nov). Navegar a la página, enlazar, guardar antes de salir, verificar y publicar. Una página por llamada (límite de 45 s).

## Preguntas abiertas a Óscar
- Tablero: enlace para favoritos https://oscar2676.github.io/oscaracademy-ejercicios/sitio/tablero.html. La copia de su Mac (`Documentos/03_Educacion/Oscar_Academy/Dashboard_Contenido/Tablero_OA.html`) es un archivo fijo: **actualizarla tras cada publicación** (`python3 sitio/tablero.py` genera `sitio/Tablero_OA_copia_local.html`; copiar a `/mnt/user-data/outputs/` y `device_commit_files`). El tablero en línea puede quedar 1–2 hojas atrás si el push ocurre antes de que Wix termine de publicar: empujar algo de `sitio/` después de publicar.
- **Ojo de funcionamiento:** Claude solo avanza mientras hay un mensaje de Óscar en curso; no trabaja «en segundo plano» entre mensajes. No prometer «sigo mientras tanto».
- **Su lista de fuentes de consulta**: no está guardada en el proyecto, el repositorio ni la memoria. El 20-nov se usaron OpenStax, LibreTexts y GeoGebra; él mandó una búsqueda de Google como referencia. Pedírsela y anotarla aquí.
- ¿Enlazar 4 títulos a hojas del lote 03? Cota de Lagrange → L03 H06; Introducción a polinomios de Taylor y Maclaurin → L03 H05; Suma parcial… progresión geométrica → L03 H09; Área entre curvas como funciones de x → L03 H04.

## Pendiente de rigor
- Lotes 19 y 20: falta la comparación sistemática con sitios externos (lote 18 hecha; L20 H02 comparada con LibreTexts/OpenStax).
- Las integrales de L20 H02 (área en esféricas, volumen por capas, área del círculo) se revisaron a mano, no por código.
- Teorema de Weierstrass (L19 H02) va enunciado sin demostración; se le avisó a Óscar.
