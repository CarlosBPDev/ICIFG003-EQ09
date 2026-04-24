package com.clinica.odontologica.service;

import com.clinica.odontologica.model.HorarioDisponible;
import com.clinica.odontologica.repository.HorarioDisponibleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HorarioDisponibleService {

    private final HorarioDisponibleRepository horarioRepository;

    public List<HorarioDisponible> listarTodos() {
        return horarioRepository.findAll();
    }

    public Optional<HorarioDisponible> buscarPorId(Long id) {
        return horarioRepository.findById(id);
    }

    public List<HorarioDisponible> buscarPorDentistaYFecha(Long dentistaId, LocalDate fecha) {
        return horarioRepository.findByDentistaIdAndFecha(dentistaId, fecha);
    }

    public List<HorarioDisponible> buscarDisponiblesPorDentistaYFecha(Long dentistaId, LocalDate fecha) {
        return horarioRepository.findByDentistaIdAndFechaAndDisponibleTrue(dentistaId, fecha);
    }

    public List<HorarioDisponible> buscarPorDentista(Long dentistaId) {
        return horarioRepository.findByDentistaId(dentistaId);
    }

    public HorarioDisponible guardar(HorarioDisponible horario) {
        return horarioRepository.save(horario);
    }

    public HorarioDisponible actualizar(Long id, HorarioDisponible horarioActualizado) {
        return horarioRepository.findById(id)
                .map(horario -> {
                    horario.setDentista(horarioActualizado.getDentista());
                    horario.setFecha(horarioActualizado.getFecha());
                    horario.setHoraInicio(horarioActualizado.getHoraInicio());
                    horario.setHoraFin(horarioActualizado.getHoraFin());
                    horario.setDisponible(horarioActualizado.getDisponible());
                    return horarioRepository.save(horario);
                })
                .orElseThrow(() -> new RuntimeException("Horario no encontrado con id: " + id));
    }

    public void eliminar(Long id) {
        if (!horarioRepository.existsById(id)) {
            throw new RuntimeException("Horario no encontrado con id: " + id);
        }
        horarioRepository.deleteById(id);
    }
}
