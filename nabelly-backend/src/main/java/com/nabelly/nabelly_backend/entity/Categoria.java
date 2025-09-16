package com.nabelly.nabelly_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @Column(name = "codcategoria", length = 3)
    private String codCategoria;

    @Column(name = "nombre", length = 30, nullable = false)
    private String nombre;

    // Relación ManyToOne con TipoReceta
    @ManyToOne
    @JoinColumn(name = "codtiporeceta")
    @JsonBackReference
    private TipoReceta tipoReceta;

    // Relación ManyToOne con HoraReceta
    @ManyToOne
    @JoinColumn(name = "codhorareceta", nullable = false,
            foreignKey = @ForeignKey(name = "fk_categorias_horareceta"))
    @JsonBackReference
    private HoraReceta horaReceta;

    // Getters y Setters
    public String getCodCategoria() {
        return codCategoria;
    }

    public void setCodCategoria(String codCategoria) {
        this.codCategoria = codCategoria;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoReceta getTipoReceta() {
        return tipoReceta;
    }

    public void setTipoReceta(TipoReceta tipoReceta) {
        this.tipoReceta = tipoReceta;
    }

    public HoraReceta getHoraReceta() {
        return horaReceta;
    }

    public void setHoraReceta(HoraReceta horaReceta) {
        this.horaReceta = horaReceta;
    }
}