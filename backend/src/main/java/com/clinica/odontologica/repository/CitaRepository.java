package com.clinica.odontologica.repository;

import com.clinica.odontologica.model.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {
    List<Cita> findByPacienteId(Long pacienteId);
    List<Cita> findByDentistaId(Long dentistaId);
    List<Cita> findByFecha(LocalDate fecha);
    List<Cita> findByDentistaIdAndFecha(Long dentistaId, LocalDate fecha);
    List<Cita> findByEstado(Cita.EstadoCita estado);
}
