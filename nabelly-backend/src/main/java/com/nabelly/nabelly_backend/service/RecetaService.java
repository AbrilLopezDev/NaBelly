package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Receta;

import java.util.List;

public interface RecetaService {
    List<Receta> RecetasXCategoria(String codCategoria);
}
