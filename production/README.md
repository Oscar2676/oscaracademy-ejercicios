# Base de producción supervisada

Código reutilizable para reservar tareas, entregar candidatas, registrar revisiones y comprobar que las evidencias corresponden a los mismos bytes. No publica ejercicios ni modifica sitios web.

Este paquete público contiene un registro de ejemplo vacío. Los registros operativos, las conversaciones, las aprobaciones reales, los informes privados y las candidatas quedan fuera de esta rama.

## Uso local

Copiar `data/tasks.example.json` a `data/tasks.json` y registrar las tareas en la copia local, ignorada por Git. Consultar `docs/OPERACION.md` para el esquema y los comandos.

`python -m unittest discover -s production/qa -p 'test_workflow.py'`

`npm ci --prefix production` y `node production/qa/template_checks.mjs` ejecutan las pruebas de la plantilla en Chromium. Instalar previamente el navegador de Playwright.

Productor y revisor deben ser actores diferentes. Los controles verifican roles declarados y hashes, pero no autentican personas ni sustituyen la aprobación humana. Los permisos y las aprobaciones del repositorio se administran separadamente.
