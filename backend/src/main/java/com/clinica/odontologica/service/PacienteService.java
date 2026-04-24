package com.clinica.odontologica.service;

import com.clinica.odontologica.model.Paciente;
import com.clinica.odontologica.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;

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
        return pacienteRepository.save(paciente);
    }

    public Paciente actualizar(Long id, Paciente pacienteActualizado) {
        return pacienteRepository.findById(id)
                .map(paciente -> {
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
        pacienteRepository.deleteById(id);
    }
}
