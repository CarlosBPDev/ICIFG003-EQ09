package com.clinica.odontologica.controller;

import com.clinica.odontologica.model.Servicio;
import com.clinica.odontologica.service.ServicioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@RequiredArgsConstructor
public class ServicioController {

    private final ServicioService servicioService;

    @GetMapping
    public ResponseEntity<List<Servicio>> listarTodos() {
        return ResponseEntity.ok(servicioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> buscarPorId(@PathVariable Long id) {
        return servicioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Servicio> crear(@Valid @RequestBody Servicio servicio) {
        Servicio nuevoServicio = servicioService.guardar(servicio);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoServicio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servicio> actualizar(@PathVariable Long id, @Valid @RequestBody Servicio servicio) {
        Servicio servicioActualizado = servicioService.actualizar(id, servicio);
        return ResponseEntity.ok(servicioActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        servicioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
