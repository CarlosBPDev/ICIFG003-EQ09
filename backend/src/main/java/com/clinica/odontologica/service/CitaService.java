package com.clinica.odontologica.service;

import com.clinica.odontologica.model.Cita;
import com.clinica.odontologica.model.HorarioDisponible;
import com.clinica.odontologica.repository.CitaRepository;
import com.clinica.odontologica.repository.HorarioDisponibleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CitaService {

    private final CitaRepository citaRepository;
    private final HorarioDisponibleRepository horarioRepository;

    // ==========================================
    // OPERACIONES CRUD BÁSICAS
    // ==========================================

    public List<Cita> listarTodas() {
        return citaRepository.findAll();
    }

    public Optional<Cita> buscarPorId(Long id) {
        return citaRepository.findById(id);
    }

    public List<Cita> buscarPorPaciente(Long pacienteId) {
        return citaRepository.findByPacienteId(pacienteId);
    }

    public List<Cita> buscarPorDentista(Long dentistaId) {
        return citaRepository.findByDentistaId(dentistaId);
    }

    // ==========================================
    // FUNCIONALIDADES DE NEGOCIO
    // ==========================================

    /**
     * RESERVAR HORA
     * - Valida que el horario esté disponible
     * - Crea la cita con estado RESERVADA
     * - Marca el horario como no disponible
     */
    @Transactional
    public Cita reservarHora(Cita cita) {
        // Buscar horarios disponibles del dentista en la fecha y hora indicada
        List<HorarioDisponible> horariosDisponibles = horarioRepository
                .findByDentistaIdAndFechaAndDisponibleTrue(
                        cita.getDentista().getId(),
                        cita.getFecha()
                );

        // Verificar que exista un horario disponible que coincida con la hora solicitada
        HorarioDisponible horarioEncontrado = horariosDisponibles.stream()
                .filter(h -> !cita.getHora().isBefore(h.getHoraInicio()) && cita.getHora().isBefore(h.getHoraFin()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException(
                        "No hay disponibilidad para el dentista en la fecha y hora seleccionada"));

        // Marcar el horario como no disponible
        horarioEncontrado.setDisponible(false);
        horarioRepository.save(horarioEncontrado);

        // Crear la cita con estado RESERVADA
        cita.setEstado(Cita.EstadoCita.RESERVADA);
        return citaRepository.save(cita);
    }

    /**
     * CANCELAR HORA
     * - Cambia el estado de la cita a CANCELADA
     * - Libera el horario correspondiente (lo marca como disponible)
     */
    @Transactional
    public Cita cancelarHora(Long citaId) {
        Cita cita = citaRepository.findById(citaId)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada con id: " + citaId));

        if (cita.getEstado() == Cita.EstadoCita.CANCELADA) {
            throw new RuntimeException("La cita ya está cancelada");
        }

        // Cambiar estado a CANCELADA
        cita.setEstado(Cita.EstadoCita.CANCELADA);
        citaRepository.save(cita);

        // Liberar el horario correspondiente
        List<HorarioDisponible> horarios = horarioRepository
                .findByDentistaIdAndFecha(cita.getDentista().getId(), cita.getFecha());

        horarios.stream()
                .filter(h -> !cita.getHora().isBefore(h.getHoraInicio()) && cita.getHora().isBefore(h.getHoraFin()))
                .findFirst()
                .ifPresent(horario -> {
                    horario.setDisponible(true);
                    horarioRepository.save(horario);
                });

        return cita;
    }

    /**
     * CHEQUEAR DISPONIBILIDAD
     * - Retorna los horarios disponibles para un dentista en una fecha específica
     */
    public List<HorarioDisponible> chequearDisponibilidad(Long dentistaId, LocalDate fecha) {
        return horarioRepository.findByDentistaIdAndFechaAndDisponibleTrue(dentistaId, fecha);
    }
}
