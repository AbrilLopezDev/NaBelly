package com.nabelly.nabelly_backend.repository;
import com.nabelly.nabelly_backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    Optional<Usuario> findBynombreusuario(String nombreusuario);
}