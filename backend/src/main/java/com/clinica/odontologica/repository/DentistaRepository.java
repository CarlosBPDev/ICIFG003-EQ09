package com.clinica.odontologica.repository;

import com.clinica.odontologica.model.Dentista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DentistaRepository extends JpaRepository<Dentista, Long> {
    Optional<Dentista> findByRut(String rut);
    boolean existsByRut(String rut);
}
