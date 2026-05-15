package com.clinica.odontologica.service;

import com.clinica.odontologica.model.Dentista;
import com.clinica.odontologica.repository.DentistaRepository;
import com.clinica.odontologica.repository.CitaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DentistaService {

    private final DentistaRepository dentistaRepository;
    private final CitaRepository citaRepository;

    public List<Dentista> listarTodos() {
        return dentistaRepository.findAll();
    }

    public Optional<Dentista> buscarPorId(Long id) {
        return dentistaRepository.findById(id);
    }

    public Optional<Dentista> buscarPorRut(String rut) {
        return dentistaRepository.findByRut(rut);
    }

    public Dentista guardar(Dentista dentista) {
        // Verificar RUT duplicado antes de guardar
        dentistaRepository.findByRut(dentista.getRut()).ifPresent(existente -> {
            throw new RuntimeException("Ya existe un dentista con el RUT: " + dentista.getRut());
        });
        return dentistaRepository.save(dentista);
    }

    public Dentista actualizar(Long id, Dentista dentistaActualizado) {
        return dentistaRepository.findById(id)
                .map(dentista -> {
                    // Verificar RUT duplicado solo si cambió
                    if (!dentista.getRut().equals(dentistaActualizado.getRut())) {
                        dentistaRepository.findByRut(dentistaActualizado.getRut()).ifPresent(existente -> {
                            throw new RuntimeException("Ya existe otro dentista con el RUT: " + dentistaActualizado.getRut());
                        });
                    }
                    dentista.setRut(dentistaActualizado.getRut());
                    dentista.setNombre(dentistaActualizado.getNombre());
                    dentista.setApellido(dentistaActualizado.getApellido());
                    dentista.setEspecialidad(dentistaActualizado.getEspecialidad());
                    dentista.setEmail(dentistaActualizado.getEmail());
                    dentista.setTelefono(dentistaActualizado.getTelefono());
                    return dentistaRepository.save(dentista);
                })
                .orElseThrow(() -> new RuntimeException("Dentista no encontrado con id: " + id));
    }

    public void eliminar(Long id) {
        if (!dentistaRepository.existsById(id)) {
            throw new RuntimeException("Dentista no encontrado con id: " + id);
        }
        
        // Validar que no haya citas asociadas
        if (!citaRepository.findByDentistaId(id).isEmpty()) {
            throw new RuntimeException("No se puede eliminar el dentista porque tiene citas asociadas. Por favor, cancele o elimine las citas primero.");
        }
        
        dentistaRepository.deleteById(id);
    }
}
