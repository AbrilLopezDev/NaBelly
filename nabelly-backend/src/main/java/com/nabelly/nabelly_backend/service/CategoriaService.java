package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Categoria;

import java.util.List;

public interface CategoriaService {
    List<Categoria> CategoriaXTipoReceta (String idTipoReceta);
    Categoria CategoriaXCodCategoria(String codCategoria);
}
