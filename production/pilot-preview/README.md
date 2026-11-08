# Piloto T01–T04 · REV01

Referencias v004 con huellas aprobadas verificadas. No cambia main, Wix ni las hojas publicadas.

Ejecutar: `python production/tools/pilot.py --task T01`.

Pruebas: `python -m unittest discover -s production/qa -p "test_*.py" -v`.

15 pruebas superadas; la prueba de recuperación contiene 8 escenarios (4 hojas × 2 puntos de corte SIGKILL). Cada escenario reinicia dos veces y comprueba una sola entrega, informe sin cambios y ausencia de APR/publicación nuevas. También se rechaza una fuente modificada.

Prueba de navegador acotada en Chromium de escritorio: T01 abre desde índice, ángulo 180° sincroniza ambas vistas y muestra (-1;0), suma 1, demostración completa muestra 3 pasos, respuesta correcta muestra explicación, retorno al índice funciona. No equivale a QA móvil ni a auditoría funcional de T02–T04.

Las pruebas estructurales no sustituyen revisión matemática independiente. Sin llamadas API: costo de modelos aún no medido. Integración Wix pendiente. El aviso de prueba se añade al índice envolvente, conservando los bytes de las cuatro hojas.

creado por Óscar Morales León con asistencia IA.
