package com.nabelly.nabelly_backend.controller;
import com.nabelly.nabelly_backend.entity.Usuario;
import com.nabelly.nabelly_backend.security.JwtUtils;
import com.nabelly.nabelly_backend.service.AuthService;
import com.nabelly.nabelly_backend.service.UsuarioService;
import dto.RecetaDTO;
import dto.UserResponseDTO;
import dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    AuthService authService;
    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getMe(@RequestHeader("Authorization") String authHeader) {

        //uso de header por seguridad
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authHeader.substring(7); // quitar "Bearer "
        String username = jwtUtils.getUsernameFromToken(token); //  extraer username del JWT

        Usuario usuario = authService.usuarioExiste(username);
        if (usuario == null) {
            return ResponseEntity.status(404).build();
        }


        UserResponseDTO response = new UserResponseDTO();
        response.setUsername(usuario.getNombreusuario());
        response.setEmail(usuario.getEmail());
        if (usuario.getFoto() == null || usuario.getFoto().isEmpty()) {
            response.setFoto("http://localhost:8080/uploads/user.png");
        } else {
            response.setFoto(usuario.getFoto());
        }
        response.setRole(usuario.isTipo() ? "ADMIN" : "USER");

        return ResponseEntity.ok(response);
    }
    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/username/{nombre}")
    public ResponseEntity<UsuarioDTO> UsuarioXNombre (@PathVariable String nombre){
        UsuarioDTO usuario = usuarioService.usuarioDTOXnombre(nombre);
        return ResponseEntity.ok(usuario);
    }

}
