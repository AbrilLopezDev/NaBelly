package dto;

import org.springframework.web.multipart.MultipartFile;

public class SignUpRequestDTO {
    private MultipartFile foto;
    private String username;
    private String password;
    private String email;


    public MultipartFile getFoto() {
        return foto;
    }

    public void setFoto(MultipartFile foto) {
        this.foto = foto;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
