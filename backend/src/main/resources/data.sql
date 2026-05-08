-- ==========================================
-- Datos iniciales para la Clínica Odontológica
-- Se ejecuta automáticamente al iniciar Spring Boot
-- ==========================================

-- Servicios disponibles en la clínica
INSERT INTO "servicios" ("nombre", "descripcion", "duracion_minutos", "precio")
VALUES ('Consulta General', 'Revisión y diagnóstico dental general', 30, 15000);

INSERT INTO "servicios" ("nombre", "descripcion", "duracion_minutos", "precio")
VALUES ('Limpieza Dental', 'Limpieza profesional y pulido dental', 45, 25000);

INSERT INTO "servicios" ("nombre", "descripcion", "duracion_minutos", "precio")
VALUES ('Ortodoncia', 'Tratamiento de ortodoncia con brackets', 60, 50000);

INSERT INTO "servicios" ("nombre", "descripcion", "duracion_minutos", "precio")
VALUES ('Endodoncia', 'Tratamiento de conducto radicular', 90, 80000);

INSERT INTO "servicios" ("nombre", "descripcion", "duracion_minutos", "precio")
VALUES ('Blanqueamiento', 'Blanqueamiento dental profesional', 60, 45000);
