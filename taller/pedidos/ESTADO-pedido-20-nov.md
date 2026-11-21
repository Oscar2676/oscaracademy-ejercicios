# Pedido de producción de Óscar · 20-nov-2026 (284 hojas)

Texto completo del pedido (última versión, 20:07, **284 hojas** + 2 solo por enlazar): `taller/pedidos/pedido-2026-11-20-284-hojas.txt` en el repositorio. Creció durante el día: 44 → 63 → 124 → 184 → 284. Los 101 títulos nuevos de la última versión son casi todos de la página «Cálculo superior» [x238t] (propiedades de la integral definida, sumas de Riemann, cambio de variable, integrales de funciones comunes, por partes, sustitución trigonométrica, impropias…) y algunos de «Cálculo integral» [qtf2i]. Cada pedido nuevo **reemplaza** al anterior (lo contiene); es la cola de producción. Si el archivo se pierde, se regenera con el selector.

Reglas de Óscar para este pedido: rigurosidad máxima, doble revisión, tolerancia cero, no inventar nada, preguntar lo que no se sepa; comparar resultados con sus fuentes de consulta; los títulos «Ejemplo N…» son hojas de ejercicio; borrar tarjetas repetidas dentro de una caja y reordenarla; títulos equivalentes a hojas ya aprobadas se enlazan a ellas; diagramación atractiva con recuadros en los cuatro colores institucionales (verdoso, azulino, caqui/naranjo, burdeo).

**Regla desde las 15:55 del 20-nov: tras cada APR, Claude enlaza la hoja en Wix y PUBLICA él mismo** («publica tú, no dependas de mí para eso»). Se publica con `button.top-bar-publish-btn` del editor en el navegador integrado; Wix responde «Tu sitio se ha publicado» (cerrar con «Hecho»).

## Avance al 21-nov 01:35: 21 hojas con APR, enlazadas y publicadas
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

## Por producir en el lote 20 (5)
«Derivadas para razones relacionadas» (ft30u comp-lcno0t8d · qudgj comp-lcit01bi) · «Aplicaciones de las derivadas aplicadas al movimiento» (ft30u comp-lcno0t8b1 · qudgj comp-lcit01be) · «Derivada de funciones parametrizadas» (ft30u comp-lcno0t8o · qudgj comp-lcit01bo · bb5wq comp-mvuxjfbh9) · «Derivada de funciones parametrizadas 2» (ft30u comp-lcno0t8q · qudgj comp-lcit01br · bb5wq comp-mvuxjfbh14) · «Derivada de funciones vectoriales» (ft30u comp-lcno0t8r1 · qudgj comp-lcit01by1 · bb5wq comp-mvuxjfbh19)

## Criterios de Óscar para animaciones y texto (20-nov)
- Una condición o un caso importante dentro de un recuadro merece su propia animación explicativa dentro del mismo recuadro.
- Una discontinuidad se dibuja con **curvas**, no con rectas, y la gráfica debe **seguir** después del salto por otra curva más arriba en el mismo x.
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
- Tras resolver notas, subir `taller/src/lNN/ronda.txt` para que la lista de la tarjeta parta en 0 (l20 va en 8).

## Taller
Fuentes en `taller/src/lNN/partes/` (`NN.art.html`, `NN.scene.js`; escenas comunes `_tvm.js` en l18; `_an.js` y `_tri.js` en l19; escenas propias en l20). Se arman con `cat` a `taller/src/lNN/NN-*.html`, luego `python3 taller/build.py NN "Nombre"` y se copian de `taller/out/hojas/loteNN/` a `calculo-diferencial/loteNN/`. Verificadores: `qa/rigor/verificar_lote_18.py`, `_19.py`, `_20.py` (0 errores), `derivadas_escenas.js`, `verificar_tex.py` (no sabe evaluar π ni e: marca como «FALSA» aproximaciones correctas; se comprueban en el verificador del lote), `rotulos_animaciones.js`.

Wix desde el navegador integrado: ayudantes `__go(pg)`, `__link(pg, id, url)`, `__save()`, `__chk(pg, ids)`, `__sleep` definidos en la pestaña del editor (`seed`; se pierden si se recarga; están en el historial del 20-nov). Navegar a la página, enlazar, guardar antes de salir, verificar y publicar. Una página por llamada (límite de 45 s).

## Orden para lo que falta (unas 260 hojas)
1. Lote 20, resto (5): ver lista arriba
2. Integración y acumulación de cambio (12)
3. Aplicaciones de la integral
4. Binomio de Newton (19)
5. Cálculo diferencial 1ª parte: límites y variantes del TVM (61; varias equivalen entre sí o a hojas existentes: L01 H01, H02, H04 y L18; proponer a Óscar cuáles se enlazan y cuáles son hoja nueva)
6. Series y sucesiones; ecuaciones paramétricas, polares y vectoriales
7. Cálculo superior [x238t]: los 101 títulos de integración agregados a las 20:07 (muchos equivalen a los del punto 2 o a hojas existentes: proponer enlaces)

## Preguntas abiertas a Óscar
- **Ojo de funcionamiento:** Claude solo avanza mientras hay un mensaje de Óscar en curso; no trabaja «en segundo plano» entre mensajes. No prometer «sigo mientras tanto».
- **Su lista de fuentes de consulta**: no está guardada en el proyecto, el repositorio ni la memoria. El 20-nov se usaron OpenStax, LibreTexts y GeoGebra; él mandó una búsqueda de Google como referencia. Pedírsela y anotarla aquí.
- ¿Enlazar 4 títulos a hojas del lote 03? Cota de Lagrange → L03 H06; Introducción a polinomios de Taylor y Maclaurin → L03 H05; Suma parcial… progresión geométrica → L03 H09; Área entre curvas como funciones de x → L03 H04.

## Pendiente de rigor
- Lotes 19 y 20: falta la comparación sistemática con sitios externos (lote 18 hecha; L20 H02 comparada con LibreTexts/OpenStax).
- Las integrales de L20 H02 (área en esféricas, volumen por capas, área del círculo) se revisaron a mano, no por código.
- Teorema de Weierstrass (L19 H02) va enunciado sin demostración; se le avisó a Óscar.
