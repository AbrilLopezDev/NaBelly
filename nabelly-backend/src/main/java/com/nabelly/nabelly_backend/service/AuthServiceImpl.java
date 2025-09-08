package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Usuario;
import com.nabelly.nabelly_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public Usuario usuarioExiste(String username) {
        Optional <Usuario> usuario = usuarioRepository.findBynombreusuario(username);
        return usuario.orElse(null); // si esta presente devuelve el Usuario, si no null
    }

    @Override
    public Boolean crearUsuario(Usuario usuario) {
        try{
            usuarioRepository.save(usuario);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

}
