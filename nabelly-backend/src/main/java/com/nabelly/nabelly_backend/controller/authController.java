package com.nabelly.nabelly_backend.controller;

import com.nabelly.nabelly_backend.entity.Usuario;
import com.nabelly.nabelly_backend.security.JwtUtils;
import com.nabelly.nabelly_backend.service.AuthService;
import dto.LoginRequestDTO;
import dto.LoginResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class authController {

    @Autowired
    private AuthService authService;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
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
        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setRole(usuario.isTipo() ? "ADMIN" : "USER");
        return ResponseEntity.ok(response);

    }

}
