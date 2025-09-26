package com.nabelly.nabelly_backend.controller;

import com.nabelly.nabelly_backend.entity.Usuario;
import com.nabelly.nabelly_backend.security.JwtUtils;
import com.nabelly.nabelly_backend.service.AuthService;
import com.nabelly.nabelly_backend.service.FileStorageService;
import dto.LoginRequestDTO;
import dto.AuthResponseDTO;
import dto.SignUpRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO request) {
        String username = request.getUsername();
        String password = request.getPassword();
        Usuario usuario = authService.usuarioExiste(username);
        if(usuario==null){
            return ResponseEntity.status(404).body(null);
            //verificar si el usuario no existe 404
        }
        if(!passwordEncoder.matches(password, usuario.getContasena())) {
            return ResponseEntity.status(401).body(null);
            //verificar si la contraseña no copincide 401
        }
        String token = jwtUtils.generarToken(usuario);
        AuthResponseDTO response = new AuthResponseDTO();
        response.setToken(token);
        response.setRole(usuario.isTipo() ? "ADMIN" : "USER");
        return ResponseEntity.ok(response);

    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponseDTO> signup(@ModelAttribute SignUpRequestDTO request) {
        String username = request.getUsername();
        String password = passwordEncoder.encode(request.getPassword());
        String email = request.getEmail();
        String fotoUrl;


        String baseUrl = "http://localhost:8080/uploads/";

        // Verificar si se subió un archivo
        if (request.getFoto() != null && !request.getFoto().isEmpty()) {
            try {
                String nombreArchivo = fileStorageService.guardarFoto(request.getFoto());
                fotoUrl = "http://localhost:8080" + nombreArchivo;
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body(null);
            }
        } else {
            // Usuario sin foto → usar imagen por defecto
            fotoUrl = baseUrl + "user.png";
        }

        Usuario usuario = authService.usuarioExiste(username);
        if(usuario!=null){
            return ResponseEntity.status(409).body(null);
            //verificar si el usuario existe 409
        }

        Usuario newUsuario = new Usuario(username, password, email, fotoUrl, true, false);
        if(!authService.crearUsuario(newUsuario)){
            return ResponseEntity.status(422).body(null);
            //no se pudo guardar el usuario
        }

        String token = jwtUtils.generarToken(newUsuario);
        AuthResponseDTO response = new AuthResponseDTO();
        response.setToken(token);
        response.setRole(newUsuario.isTipo() ? "ADMIN" : "USER");
        return ResponseEntity.ok(response);

    }

}
