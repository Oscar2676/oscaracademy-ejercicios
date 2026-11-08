# Base de producción supervisada

Código reutilizable para reservar tareas, entregar candidatas, registrar revisiones y comprobar que las evidencias corresponden a los mismos bytes. No publica ejercicios ni modifica sitios web.

El propietario autorizó explícitamente compartir el registro operativo de 63 tareas, incluidos estados, huellas y citas de APR. El registro está en `data/tasks.json`; la autorización queda documentada dentro del propio archivo. No se incluyen conversaciones completas, archivos HTML candidatos ni informes de revisión. Los estados que remiten a esos archivos se basan en evidencias locales y no certifican que los archivos estén disponibles en esta rama.

## Uso local

El registro compartido se conserva en `data/tasks.json`. Para una instalación nueva sin registro, copiar `data/tasks.example.json` como punto de partida. Las candidatas, los informes y el diario local permanecen ignorados por Git. Consultar `docs/OPERACION.md` para el esquema y los comandos.

`python -m unittest discover -s production/qa -p 'test_workflow.py'`

`npm ci --prefix production` y `node production/qa/template_checks.mjs` ejecutan las pruebas de la plantilla en Chromium. Instalar previamente el navegador de Playwright.

Productor y revisor deben ser actores diferentes. Los controles verifican roles declarados y hashes, pero no autentican personas ni sustituyen la aprobación humana. Los permisos y las aprobaciones del repositorio se administran separadamente.
