-- ==========================================
-- Datos iniciales para la Clínica Odontológica
-- Se ejecuta automáticamente al iniciar Spring Boot
-- ==========================================

-- Limpiar datos existentes
DELETE FROM "citas";
DELETE FROM "horarios_disponibles";
DELETE FROM "servicios";
DELETE FROM "dentistas";
DELETE FROM "pacientes";

-- ==========================================
-- SERVICIOS
-- ==========================================
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

-- ==========================================
-- DENTISTAS (Odontologos)
-- ==========================================
INSERT INTO "dentistas" ("nombre", "apellido", "rut", "email", "telefono", "especialidad")
VALUES ('Dr. Carlos', 'Martinez', '12345678-1', 'carlos@clinica.com', '5696708751', 'Odontologia General');

INSERT INTO "dentistas" ("nombre", "apellido", "rut", "email", "telefono", "especialidad")
VALUES ('Dra. Ana', 'Lopez', '12345679-2', 'ana@clinica.com', '5696708752', 'Ortodoncia');

INSERT INTO "dentistas" ("nombre", "apellido", "rut", "email", "telefono", "especialidad")
VALUES ('Dr. Juan', 'Garcia', '12345680-3', 'juan@clinica.com', '5696708753', 'Endodoncia');

-- ==========================================
-- PACIENTES
-- ==========================================
INSERT INTO "pacientes" ("nombre", "apellido", "rut", "email", "telefono", "fecha_nacimiento", "direccion")
VALUES ('Juan', 'Perez', '15000000-1', 'juan.perez@email.com', '5691234567', '1985-03-15', 'Calle Principal 123');

INSERT INTO "pacientes" ("nombre", "apellido", "rut", "email", "telefono", "fecha_nacimiento", "direccion")
VALUES ('Maria', 'Gonzalez', '15000001-2', 'maria.gonzalez@email.com', '5691234568', '1990-07-22', 'Avenida Central 456');

INSERT INTO "pacientes" ("nombre", "apellido", "rut", "email", "telefono", "fecha_nacimiento", "direccion")
VALUES ('Pedro', 'Rodriguez', '15000002-3', 'pedro.rodriguez@email.com', '5691234569', '1988-11-10', 'Pasaje Lateral 789');

-- ==========================================
-- CITAS
-- ==========================================
-- Las citas iniciales están comentadas para permitir la eliminación de pacientes y dentistas
-- Si deseas agregar datos de prueba, descomenta las líneas siguientes:
-- INSERT INTO "citas" ("paciente_id", "dentista_id", "servicio_id", "fecha", "hora", "estado", "notas")
-- VALUES (1, 1, 1, CURDATE(), '09:00:00', 'RESERVADA', 'Primera cita - Consulta inicial');
-- 
-- INSERT INTO "citas" ("paciente_id", "dentista_id", "servicio_id", "fecha", "hora", "estado", "notas")
-- VALUES (2, 2, 3, CURDATE(), '10:30:00', 'RESERVADA', 'Seguimiento de ortodoncia');
-- 
-- INSERT INTO "citas" ("paciente_id", "dentista_id", "servicio_id", "fecha", "hora", "estado", "notas")
-- VALUES (3, 1, 2, CURDATE(), '14:00:00', 'RESERVADA', 'Limpieza dental');
