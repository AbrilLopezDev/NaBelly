package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Usuario;

public interface AuthService {
    Usuario usuarioExiste (String username);
    Boolean crearUsuario(Usuario usuario);
}
