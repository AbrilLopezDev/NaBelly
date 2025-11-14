package dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

public class UsuarioDTO {

    private String nombreusuario;

    private String foto;


    public String getNombreusuario() {
        return nombreusuario;
    }

    public void setNombreusuario(String nombreusuario) {
        this.nombreusuario = nombreusuario;
    }


    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

}
