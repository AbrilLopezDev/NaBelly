package com.nabelly.nabelly_backend.service;


import com.nabelly.nabelly_backend.entity.Categoria;
import com.nabelly.nabelly_backend.entity.TipoReceta;
import com.nabelly.nabelly_backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    CategoriaRepository categoriaRepository;

    @Override
    public List<Categoria> CategoriaXTipoReceta(String idTipoReceta) {

        return categoriaRepository.findByTipoRecetaCodTipoReceta(idTipoReceta);
    }
}
