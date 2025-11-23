package com.nabelly.nabelly_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "favoritos")
public class Favorito {

    @EmbeddedId
    private FavoritoId id;

    @ManyToOne
    @MapsId("idReceta")
    @JoinColumn(name = "idreceta", nullable = false)
    private Receta receta;

    @ManyToOne
    @MapsId("nombreUsuario")
    @JoinColumn(name = "nombreusuario", nullable = false)
    private Usuario usuario;

    public Favorito() {}

    public Favorito(Receta receta, Usuario usuario) {
        this.receta = receta;
        this.usuario = usuario;
        this.id = new FavoritoId(receta.getIdReceta(), usuario.getNombreusuario());
    }

    public FavoritoId getId() {
        return id;
    }

    public void setId(FavoritoId id) {
        this.id = id;
    }

    public Receta getReceta() {
        return receta;
    }

    public void setReceta(Receta receta) {
        this.receta = receta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
