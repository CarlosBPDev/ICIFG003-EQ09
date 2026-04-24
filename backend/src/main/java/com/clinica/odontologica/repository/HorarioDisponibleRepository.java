package com.clinica.odontologica.repository;

import com.clinica.odontologica.model.HorarioDisponible;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HorarioDisponibleRepository extends JpaRepository<HorarioDisponible, Long> {
    List<HorarioDisponible> findByDentistaIdAndFecha(Long dentistaId, LocalDate fecha);
    List<HorarioDisponible> findByDentistaIdAndFechaAndDisponibleTrue(Long dentistaId, LocalDate fecha);
    List<HorarioDisponible> findByDentistaId(Long dentistaId);
    List<HorarioDisponible> findByFecha(LocalDate fecha);
}
