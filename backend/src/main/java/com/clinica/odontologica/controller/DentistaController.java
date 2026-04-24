package com.clinica.odontologica.controller;

import com.clinica.odontologica.model.Dentista;
import com.clinica.odontologica.service.DentistaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dentistas")
@RequiredArgsConstructor
public class DentistaController {

    private final DentistaService dentistaService;

    @GetMapping
    public ResponseEntity<List<Dentista>> listarTodos() {
        return ResponseEntity.ok(dentistaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dentista> buscarPorId(@PathVariable Long id) {
        return dentistaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Dentista> crear(@Valid @RequestBody Dentista dentista) {
        Dentista nuevoDentista = dentistaService.guardar(dentista);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoDentista);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dentista> actualizar(@PathVariable Long id, @Valid @RequestBody Dentista dentista) {
        try {
            Dentista dentistaActualizado = dentistaService.actualizar(id, dentista);
            return ResponseEntity.ok(dentistaActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            dentistaService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
