package com.nabelly.nabelly_backend.repository;
import com.nabelly.nabelly_backend.entity.Receta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecetaRepository extends JpaRepository<Receta, Integer> {
    List<Receta> findByCategoria_CodCategoria(String codCategoria);
}