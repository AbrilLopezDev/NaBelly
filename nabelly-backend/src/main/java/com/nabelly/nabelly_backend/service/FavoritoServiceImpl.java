package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Favorito;
import com.nabelly.nabelly_backend.entity.FavoritoId;
import com.nabelly.nabelly_backend.repository.FavoritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FavoritoServiceImpl implements FavoritoService {

    @Autowired
    FavoritoRepository favoritoRepository;
    @Autowired
    UsuarioService usuarioService;
    @Autowired
    RecetaService recetaService;

    @Override
    public int FavoritosXReceta(Integer id) {
        return favoritoRepository.countByIdIdReceta(id);
    }

    @Override
    public boolean existeFavorito(int idReceta, String usuario) {
        Optional<Favorito> existente = favoritoRepository.findByIdNombreUsuarioAndIdIdReceta(usuario, idReceta);

        if (existente.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean toggleFavorito(int idReceta, String usuario) {
        try {
            Optional<Favorito> existente = favoritoRepository.findByIdNombreUsuarioAndIdIdReceta(usuario, idReceta);
            System.out.println("toggleFavorito -> existente present? " + existente.isPresent());
            if (existente.isPresent()) {
                favoritoRepository.delete(existente.get());   // borrar la entidad
                return true;
            } else {
                Favorito f = new Favorito();
                f.setUsuario(usuarioService.usuarioXnombre(usuario));
                f.setReceta(recetaService.RecetaXId(idReceta));
                f.setId(new FavoritoId(idReceta, usuario));
                favoritoRepository.save(f);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
