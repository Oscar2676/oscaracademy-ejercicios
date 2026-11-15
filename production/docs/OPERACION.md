# Operación local de la cola de producción

Esta implementación ejecuta reservas, entregas y comprobaciones de evidencia. No llama modelos, no envía conversaciones y no publica. La acción de GitHub incluida solo ejecuta validaciones al abrir un PR o iniciarla manualmente; no despliega.

Desde la raíz del repositorio:

```bash
python production/tools/workflow.py validate
python production/tools/workflow.py status
python production/tools/workflow.py claim DEMO-001 --actor producer
```

La reserva devuelve un token y vence por defecto a los 30 minutos. El productor asignado debe usar ese token al entregar:

```bash
python production/tools/workflow.py submit DEMO-001 production/candidates/DEMO-001_v001.html --actor producer --token TOKEN_DEVUELTO --version v001
python production/tools/workflow.py unclaim DEMO-001 --actor producer --token TOKEN_DEVUELTO
```

La entrega calcula SHA-256, conserva la candidata anterior en el historial y retira la vigencia de toda evidencia anterior. Una APR histórica nunca se transfiere automáticamente.

## Revisiones

Los informes son JSON bajo `production/reviews/`. Todos deben contener `task_id`, `sha256` y `actor`. Una revisión matemática lleva `decision: pass` o `changes_requested` y `findings: []`; cada hallazgo puede indicar `blocking: true`. El actor debe ser el revisor asignado, diferente del productor. Una QA técnica lleva `passed` booleano y una lista no vacía `checks`, con un booleano `passed` en cada comprobación. El informe debe proceder de pruebas ejecutadas, no de una declaración del productor.

```bash
python production/tools/workflow.py evidence DEMO-001 math_review production/reviews/DEMO-001_math.json --actor reviewer
python production/tools/workflow.py evidence DEMO-001 technical_qa production/reviews/DEMO-001_qa.json --actor pruebas-locales
```

El registro conserva ruta y hash del informe. Si cambian sus bytes o los de la candidata, el control vuelve a bloquearse. `review_ready` requiere ambas evidencias aprobatorias sobre la huella actual. Una revisión matemática no queda sustituida por pruebas numéricas o inspecciones de texto.

## APR y publicación

Las declaraciones humanas se registran solo después de recibirlas. Un archivo de APR exige `actor: Óscar Morales León`, `decision: APR`, `quote` literal, `source` que identifique el mensaje y la huella exacta. Para autorización de publicación se exige además `scope: publish_exact_candidate`. Una APR no equivale por sí sola a autorización de publicar.

```bash
python production/tools/workflow.py evidence DEMO-001 approval production/reviews/DEMO-001_apr.json --actor 'Óscar Morales León'
python production/tools/workflow.py evidence DEMO-001 publication_authorization production/reviews/DEMO-001_publicacion.json --actor 'Óscar Morales León'
python production/tools/workflow.py release-manifest DEMO-001
```

`release-manifest` únicamente escribe un manifiesto local si todos los controles pasan. No hace push, merge, despliegue ni cambios en Wix.

**Límite de confianza:** esta cola local no autentica identidades ni contiene firmas digitales. El campo actor y la cita registran una declaración humana cuya procedencia debe comprobar el coordinador. No impide que quien tenga permisos de escritura falsifique el registro o un informe. Para operación compartida hacen falta permisos de repositorio, revisión de cambios y protección de ramas; esas conexiones no se consideran instaladas por incluir este programa. Los tokens de reserva coordinan el trabajo, no son credenciales de usuario.

## Concurrencia y recuperación

Un bloqueo de archivo del sistema operativo serializa las escrituras. Las reservas por tarea usan archivo y vencimiento; un segundo productor no puede reclamarla hasta su liberación o caducidad. Los eventos se añaden a `production/data/events.jsonl`; las mutaciones del registro tienen eventos `intent` y `committed`. Un corte entre ambos deja un intento pendiente de conciliación, no un éxito confirmado. No editar ni borrar el diario para ocultar intentos.

Pruebas del mecanismo:

```bash
python -m unittest discover -s production/qa -p 'test_workflow.py' -v
```

Estas pruebas verifican el programa de coordinación. No certifican la matemática, el renderizado ni la interacción de las hojas.

creado por Óscar Morales León con asistencia IA.
