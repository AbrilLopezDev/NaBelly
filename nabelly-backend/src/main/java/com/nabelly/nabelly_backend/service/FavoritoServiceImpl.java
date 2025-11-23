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
        Optional<Favorito> existente = favoritoRepository.findByUsuarioIdAndRecetaId(idReceta, usuario);

        if (existente.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean toggleFavorito(int idReceta, String usuario) {
        Optional<Favorito> existente = favoritoRepository.findByUsuarioIdAndRecetaId(idReceta, usuario);
        try {
            if (existente.isPresent()) {
                favoritoRepository.deleteByUsuarioIdAndRecetaId(idReceta, usuario);
                return true;
            } else {
                Favorito f = new Favorito();
                f.setUsuario(usuarioService.usuarioXnombre(usuario));
                f.setReceta(recetaService.RecetaXId(idReceta));
                FavoritoId fi = new FavoritoId(idReceta, usuario);
                f.setId(fi);
                favoritoRepository.save(f);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
    }
}
