package com.nabelly.nabelly_backend.repository;

import com.nabelly.nabelly_backend.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, String> {
    List<Categoria> findByTipoRecetaCodTipoReceta(String codTipoReceta);
}