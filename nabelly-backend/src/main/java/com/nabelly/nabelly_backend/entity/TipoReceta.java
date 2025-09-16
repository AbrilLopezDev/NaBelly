package com.nabelly.nabelly_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tiporeceta")
public class TipoReceta {

    @Id
    @Column(name = "codtiporeceta", length = 1)
    private String codTipoReceta;

    @Column(name = "nombre", length = 12, nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "tipoReceta")
    @JsonManagedReference
    private List<Categoria> categorias;

    // Getters y Setters
    public String getCodTipoReceta() {
        return codTipoReceta;
    }

    public void setCodTipoReceta(String codTipoReceta) {
        this.codTipoReceta = codTipoReceta;
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