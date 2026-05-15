package com.clinica.odontologica.controller;

import com.clinica.odontologica.model.Cita;
import com.clinica.odontologica.model.HorarioDisponible;
import com.clinica.odontologica.service.CitaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/citas")
@RequiredArgsConstructor
public class CitaController {

    private final CitaService citaService;

    // ==========================================
    // ENDPOINTS CRUD BÁSICOS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Cita>> listarTodas() {
        return ResponseEntity.ok(citaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cita> buscarPorId(@PathVariable Long id) {
        return citaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Cita>> buscarPorPaciente(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(citaService.buscarPorPaciente(pacienteId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cita> actualizar(@PathVariable Long id, @Valid @RequestBody Cita cita) {
        Cita citaActualizada = citaService.actualizar(id, cita);
        return ResponseEntity.ok(citaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        citaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // ==========================================
    // FUNCIONALIDADES DE NEGOCIO
    // ==========================================

    /**
     * RESERVAR HORA
     * POST /api/citas/reservar
     */
    @PostMapping("/reservar")
    public ResponseEntity<?> reservarHora(@Valid @RequestBody Cita cita) {
        Cita citaReservada = citaService.reservarHora(cita);
        return ResponseEntity.status(HttpStatus.CREATED).body(citaReservada);
    }

    /**
     * CANCELAR HORA
     * PUT /api/citas/{id}/cancelar
     */
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<?> cancelarHora(@PathVariable Long id) {
        Cita citaCancelada = citaService.cancelarHora(id);
        return ResponseEntity.ok(citaCancelada);
    }

    /**
     * CHEQUEAR DISPONIBILIDAD
     * GET /api/citas/disponibilidad?dentistaId=X&fecha=YYYY-MM-DD
     */
    @GetMapping("/disponibilidad")
    public ResponseEntity<List<HorarioDisponible>> chequearDisponibilidad(
            @RequestParam Long dentistaId,
            @RequestParam String fecha) {
        LocalDate localDate = LocalDate.parse(fecha);
        List<HorarioDisponible> disponibles = citaService.chequearDisponibilidad(dentistaId, localDate);
        return ResponseEntity.ok(disponibles);
    }
}
