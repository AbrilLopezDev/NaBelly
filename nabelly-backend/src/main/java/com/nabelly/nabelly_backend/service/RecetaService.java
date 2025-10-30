package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Receta;
import dto.RecetaDTO;

import java.util.List;

public interface RecetaService {
    List<RecetaDTO> RecetasXCategoria(String codCategoria);
    List<RecetaDTO> RecetasXUsername(String username);
    boolean eliminarReceta(Integer idReceta);
    List<RecetaDTO> RecetasXNombre(String Nombre);
}
