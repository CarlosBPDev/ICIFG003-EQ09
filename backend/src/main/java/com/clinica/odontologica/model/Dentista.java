package com.clinica.odontologica.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "dentistas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dentista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El RUT es obligatorio")
    @Column(unique = true)
    private String rut;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    private String apellido;

    @NotBlank(message = "La especialidad es obligatoria")
    private String especialidad;

    @Email(message = "El email debe ser válido")
    private String email;

    private String telefono;
}
