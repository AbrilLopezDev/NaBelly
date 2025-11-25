package com.nabelly.nabelly_backend.repository;
import com.nabelly.nabelly_backend.entity.Favorito;
import com.nabelly.nabelly_backend.entity.FavoritoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, FavoritoId> {
    int countByIdIdReceta(Integer idReceta);

    Optional<Favorito> findByIdNombreUsuarioAndIdIdReceta(String nombreUsuario, Integer idReceta);

    void deleteByIdIdRecetaAndIdNombreUsuario(Integer idReceta, String nombreUsuario);
}