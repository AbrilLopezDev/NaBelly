package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Usuario;
import dto.UsuarioDTO;

public interface UsuarioService {
    UsuarioDTO usuarioDTOXnombre(String nombreusuario);
    Usuario usuarioXnombre(String nombreusuario);
}
