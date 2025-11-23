package com.nabelly.nabelly_backend.repository;
import com.nabelly.nabelly_backend.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    int countByIdIdReceta(Integer idReceta);
    Optional<Favorito> findByUsuarioIdAndRecetaId(Integer idReceta, String nombreusuario);
    void deleteByUsuarioIdAndRecetaId(Integer idReceta, String nombreusuario);
}