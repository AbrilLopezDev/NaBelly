package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Usuario;
import com.nabelly.nabelly_backend.repository.UsuarioRepository;
import dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public UsuarioDTO usuarioXnombre(String nombreusuario) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findBynombreusuario(nombreusuario);

        if (optionalUsuario.isEmpty()) {
            return null;
        }

        Usuario usuario = optionalUsuario.get();

        UsuarioDTO dto = new UsuarioDTO();
        dto.setNombreusuario(usuario.getNombreusuario());
        dto.setFoto(usuario.getFoto());

        return dto;
    }
}
