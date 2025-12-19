package com.nabelly.nabelly_backend.repository;

import com.nabelly.nabelly_backend.entity.HoraReceta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HoraRecetaRepository extends JpaRepository<HoraReceta, String> {

    @Query("""
        SELECT h
        FROM Receta r
        JOIN r.categoria c
        JOIN c.horaReceta h
        WHERE r.idreceta = :idReceta
    """)
    HoraReceta findByIdReceta(@Param("idReceta") Integer idReceta);

}