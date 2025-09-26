package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Receta;
import com.nabelly.nabelly_backend.repository.RecetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecetaServiceImpl implements RecetaService{

    @Autowired
    RecetaRepository recetaRepository;

    @Override
    public List<Receta> RecetasXCategoria(String codCategoria) {
        return recetaRepository.findByCategoriaCodCategoria(codCategoria);
    }
}
