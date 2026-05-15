package com.clinica.odontologica.service;

import com.clinica.odontologica.model.Paciente;
import com.clinica.odontologica.repository.PacienteRepository;
import com.clinica.odontologica.repository.CitaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final CitaRepository citaRepository;

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public Optional<Paciente> buscarPorRut(String rut) {
        return pacienteRepository.findByRut(rut);
    }

    public Paciente guardar(Paciente paciente) {
        // Verificar RUT duplicado antes de guardar
        pacienteRepository.findByRut(paciente.getRut()).ifPresent(existente -> {
            throw new RuntimeException("Ya existe un paciente con el RUT: " + paciente.getRut());
        });
        return pacienteRepository.save(paciente);
    }

    public Paciente actualizar(Long id, Paciente pacienteActualizado) {
        return pacienteRepository.findById(id)
                .map(paciente -> {
                    // Verificar RUT duplicado solo si cambió
                    if (!paciente.getRut().equals(pacienteActualizado.getRut())) {
                        pacienteRepository.findByRut(pacienteActualizado.getRut()).ifPresent(existente -> {
                            throw new RuntimeException("Ya existe otro paciente con el RUT: " + pacienteActualizado.getRut());
                        });
                    }
                    paciente.setRut(pacienteActualizado.getRut());
                    paciente.setNombre(pacienteActualizado.getNombre());
                    paciente.setApellido(pacienteActualizado.getApellido());
                    paciente.setEmail(pacienteActualizado.getEmail());
                    paciente.setTelefono(pacienteActualizado.getTelefono());
                    paciente.setFechaNacimiento(pacienteActualizado.getFechaNacimiento());
                    paciente.setDireccion(pacienteActualizado.getDireccion());
                    return pacienteRepository.save(paciente);
                })
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado con id: " + id));
    }

    public void eliminar(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new RuntimeException("Paciente no encontrado con id: " + id);
        }
        
        // Validar que no haya citas asociadas
        if (!citaRepository.findByPacienteId(id).isEmpty()) {
            throw new RuntimeException("No se puede eliminar el paciente porque tiene citas asociadas. Por favor, cancele o elimine las citas primero.");
        }
        
        pacienteRepository.deleteById(id);
    }
}
