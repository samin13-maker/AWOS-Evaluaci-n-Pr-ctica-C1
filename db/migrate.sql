-- migrate.sql
-- Migraciones aplicadas después del schema inicial.
-- Ejecutar en orden después de 01_schema.sql.

-- Ejemplo de migración: agregar campo de notas a préstamos
-- ALTER TABLE loans ADD COLUMN IF NOT EXISTS notes TEXT;

-- Actualmente no hay migraciones pendientes.
-- Este archivo es requerido por la especificación del proyecto.
SELECT 'migrate.sql ejecutado correctamente' AS status;