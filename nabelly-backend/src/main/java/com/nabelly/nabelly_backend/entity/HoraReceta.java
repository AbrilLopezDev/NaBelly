package com.nabelly.nabelly_backend.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "horareceta")
public class HoraReceta {

    @Id
    @Column(name = "codhorareceta", length = 2)
    private String codHoraReceta;

    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    // Relación con Categorias (opcional, para facilitar consultas)
    @OneToMany(mappedBy = "horaReceta")
    private List<Categoria> categorias;

    // Getters y Setters
    public String getCodHoraReceta() {
        return codHoraReceta;
    }

    public void setCodHoraReceta(String codHoraReceta) {
        this.codHoraReceta = codHoraReceta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Categoria> categorias) {
        this.categorias = categorias;
    }
}