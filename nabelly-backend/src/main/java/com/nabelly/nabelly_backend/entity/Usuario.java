package com.nabelly.nabelly_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @Column(name = "nombreusuario", length = 16)
    private String nombreusuario;

    @Column(name = "contasena", length = 100, nullable = false)
    private String contasena;

    @Column(name = "email", length = 40, nullable = false)
    private String email;

    @Column(name = "foto", length = 500)
    private String foto;

    @Column(name = "tipo", nullable = false)
    private boolean tipo; // true = admin

    @Column(name = "estado", nullable = false)
    private boolean estado;

    public String getNombreusuario() {
        return nombreusuario;
    }

    public void setNombreusuario(String nombreusuario) {
        this.nombreusuario = nombreusuario;
    }

    public String getContasena() {
        return contasena;
    }

    public void setContasena(String contasena) {
        this.contasena = contasena;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public boolean isTipo() {
        return tipo;
    }

    public void setTipo(boolean tipo) {
        this.tipo = tipo;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
}
