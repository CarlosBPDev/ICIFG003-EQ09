package com.clinica.odontologica.service;

import com.clinica.odontologica.model.Servicio;
import com.clinica.odontologica.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public List<Servicio> listarTodos() {
        return servicioRepository.findAll();
    }

    public Optional<Servicio> buscarPorId(Long id) {
        return servicioRepository.findById(id);
    }

    public Servicio guardar(Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    public Servicio actualizar(Long id, Servicio servicioActualizado) {
        return servicioRepository.findById(id)
                .map(servicio -> {
                    servicio.setNombre(servicioActualizado.getNombre());
                    servicio.setDescripcion(servicioActualizado.getDescripcion());
                    servicio.setDuracionMinutos(servicioActualizado.getDuracionMinutos());
                    servicio.setPrecio(servicioActualizado.getPrecio());
                    return servicioRepository.save(servicio);
                })
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado con id: " + id));
    }

    public void eliminar(Long id) {
        if (!servicioRepository.existsById(id)) {
            throw new RuntimeException("Servicio no encontrado con id: " + id);
        }
        servicioRepository.deleteById(id);
    }
}
