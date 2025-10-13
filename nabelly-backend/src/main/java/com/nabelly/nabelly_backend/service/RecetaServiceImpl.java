package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Receta;
import com.nabelly.nabelly_backend.repository.RecetaRepository;
import dto.RecetaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecetaServiceImpl implements RecetaService{

    @Autowired
    RecetaRepository recetaRepository;

    @Override
    public List<RecetaDTO> RecetasXCategoria(String codCategoria) {
        List<Receta> recetas = recetaRepository.findByCategoriaCodCategoria(codCategoria);
        return recetas.stream().map(receta -> {
            RecetaDTO dto = new RecetaDTO();
            dto.setIdReceta(receta.getIdReceta());
            dto.setNombre(receta.getNombre());
            dto.setDescripcion(receta.getDescripcion());
            dto.setPasos(receta.getPasos());
            dto.setIngredientes(receta.getIngredientes());
            dto.setPorciones(receta.getPorciones());
            dto.setCategoria(receta.getCategoria().getNombre());
            dto.setHora(receta.getHora());
            dto.setFoto(receta.getFoto());
            dto.setFavoritos(receta.getFavoritos());
            dto.setAutor(receta.getUsuario().getNombreusuario());
            return dto;
        }).toList();
    }

    @Override
    public List<RecetaDTO> RecetasXUsername(String username) {
        List<Receta> recetas = recetaRepository.findByUsuario_Nombreusuario(username);
        return recetas.stream().map(receta -> {
            RecetaDTO dto = new RecetaDTO();
            dto.setIdReceta(receta.getIdReceta());
            dto.setNombre(receta.getNombre());
            dto.setDescripcion(receta.getDescripcion());
            dto.setPasos(receta.getPasos());
            dto.setIngredientes(receta.getIngredientes());
            dto.setPorciones(receta.getPorciones());
            dto.setCategoria(receta.getCategoria().getNombre());
            dto.setHora(receta.getHora());
            dto.setFoto(receta.getFoto());
            dto.setFavoritos(receta.getFavoritos());
            dto.setAutor(receta.getUsuario().getNombreusuario());
            return dto;
        }).toList();
    }

    @Override
    public boolean eliminarReceta( Integer idReceta) {
        if(recetaRepository.existsById(idReceta)) {
            try {
                recetaRepository.deleteById(idReceta);
                return true; // se borró
            } catch (Exception e) {
                e.printStackTrace();
                return false; // hubo un error
            }
        } else {
            return false; // no existe
        }
    }


}
