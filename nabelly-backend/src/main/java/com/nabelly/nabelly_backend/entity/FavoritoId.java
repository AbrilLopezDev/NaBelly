package com.nabelly.nabelly_backend.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FavoritoId implements Serializable {

    @Column(name = "idreceta")
    private Integer idReceta;

    @Column(name = "nombreusuario")
    private String nombreUsuario;

    public FavoritoId() {}

    public FavoritoId(Integer idReceta, String nombreUsuario) {
        this.idReceta = idReceta;
        this.nombreUsuario = nombreUsuario;
    }

    public Integer getIdReceta() {
        return idReceta;
    }

    public void setIdReceta(Integer idReceta) {
        this.idReceta = idReceta;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FavoritoId)) return false;
        FavoritoId that = (FavoritoId) o;
        return Objects.equals(idReceta, that.idReceta) &&
                Objects.equals(nombreUsuario, that.nombreUsuario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idReceta, nombreUsuario);
    }
}