package com.clinica.odontologica.controller;

import com.clinica.odontologica.model.HorarioDisponible;
import com.clinica.odontologica.service.HorarioDisponibleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/horarios")
@RequiredArgsConstructor
public class HorarioDisponibleController {

    private final HorarioDisponibleService horarioService;

    @GetMapping
    public ResponseEntity<List<HorarioDisponible>> listarTodos() {
        return ResponseEntity.ok(horarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HorarioDisponible> buscarPorId(@PathVariable Long id) {
        return horarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/dentista/{dentistaId}")
    public ResponseEntity<List<HorarioDisponible>> buscarPorDentista(@PathVariable Long dentistaId) {
        return ResponseEntity.ok(horarioService.buscarPorDentista(dentistaId));
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<HorarioDisponible>> buscarDisponibles(
            @RequestParam Long dentistaId,
            @RequestParam String fecha) {
        LocalDate localDate = LocalDate.parse(fecha);
        return ResponseEntity.ok(horarioService.buscarDisponiblesPorDentistaYFecha(dentistaId, localDate));
    }

    @PostMapping
    public ResponseEntity<HorarioDisponible> crear(@Valid @RequestBody HorarioDisponible horario) {
        HorarioDisponible nuevoHorario = horarioService.guardar(horario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoHorario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HorarioDisponible> actualizar(@PathVariable Long id, @Valid @RequestBody HorarioDisponible horario) {
        try {
            HorarioDisponible horarioActualizado = horarioService.actualizar(id, horario);
            return ResponseEntity.ok(horarioActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            horarioService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
