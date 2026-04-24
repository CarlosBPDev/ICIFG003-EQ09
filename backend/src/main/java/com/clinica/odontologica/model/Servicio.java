package com.clinica.odontologica.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "servicios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del servicio es obligatorio")
    @Column(unique = true)
    private String nombre;

    private String descripcion;

    @Min(value = 15, message = "La duración mínima es 15 minutos")
    private Integer duracionMinutos;

    @DecimalMin(value = "0.0", message = "El precio no puede ser negativo")
    private Double precio;
}
