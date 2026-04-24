package com.clinica.odontologica.service;

import com.clinica.odontologica.model.Dentista;
import com.clinica.odontologica.repository.DentistaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DentistaService {

    private final DentistaRepository dentistaRepository;

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
        return dentistaRepository.save(dentista);
    }

    public Dentista actualizar(Long id, Dentista dentistaActualizado) {
        return dentistaRepository.findById(id)
                .map(dentista -> {
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
        dentistaRepository.deleteById(id);
    }
}
