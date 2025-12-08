package com.nabelly.nabelly_backend.service;

import com.nabelly.nabelly_backend.entity.Categoria;
import com.nabelly.nabelly_backend.entity.Receta;
import com.nabelly.nabelly_backend.entity.Usuario;
import com.nabelly.nabelly_backend.repository.RecetaRepository;
import dto.RecetaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecetaServiceImpl implements RecetaService{

    @Autowired
    RecetaRepository recetaRepository;

    private RecetaDTO mapToDTO(Receta receta) {
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
        dto.setAutor(receta.getUsuario().getNombreusuario());
        return dto;
    }

    private Receta mapToEntity(RecetaDTO dto) {
        Receta receta = new Receta();
        receta.setIdReceta(dto.getIdReceta());
        receta.setNombre(dto.getNombre());
        receta.setDescripcion(dto.getDescripcion());
        receta.setPasos(dto.getPasos());
        receta.setIngredientes(dto.getIngredientes());
        receta.setPorciones(dto.getPorciones());
        receta.setHora(dto.getHora());
        receta.setFoto(dto.getFoto());

        // Categoria y Usuario cargados
        Categoria categoria = new Categoria();
        categoria.setNombre(dto.getCategoria());
        receta.setCategoria(categoria);

        Usuario usuario = new Usuario();
        usuario.setNombreusuario(dto.getAutor());
        receta.setUsuario(usuario);

        return receta;
    }

    @Override
    public List<RecetaDTO> RecetasXCategoria(String codCategoria) {
        List<Receta> recetas = recetaRepository.findByCategoriaCodCategoria(codCategoria);
        return recetas.stream().map(this::mapToDTO).toList();
    }

    @Override
    public List<RecetaDTO> RecetasXUsername(String username) {
        List<Receta> recetas = recetaRepository.findByUsuario_Nombreusuario(username);
        return recetas.stream().map(this::mapToDTO).toList();
    }

    @Override
    public boolean EliminarReceta( Integer idReceta) {
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

    @Override
    public List<RecetaDTO> RecetasXNombre(String Nombre) {
        List<Receta> recetas = recetaRepository.findByNombreContainingIgnoreCase(Nombre);
        return recetas.stream().map(this::mapToDTO).toList();
    }

    @Override
    public RecetaDTO RecetaDTOXId(Integer id) {
        return recetaRepository.findById(id)
                .map(this::mapToDTO)  // este map es de Optional<Receta>
                .orElse(null);

    }

    @Override
    public Receta RecetaXId(Integer id) {
        Optional<Receta> optionalReceta = recetaRepository.findById(id);
        if (optionalReceta.isEmpty()) {
            return null;
        }
        return optionalReceta.get();

    }

    @Override
    public RecetaDTO crearReceta(RecetaDTO dto) {
        Receta receta = mapToEntity(dto);
        Receta guardada = recetaRepository.save(receta);
        return mapToDTO(guardada);
    }

    @Override
    public RecetaDTO actualizarReceta(Integer id, RecetaDTO dto) {
        Optional<Receta> optional = recetaRepository.findById(id);
        if (optional.isEmpty()) return null;

        Receta existente = optional.get();

        existente.setNombre(dto.getNombre());
        existente.setDescripcion(dto.getDescripcion());
        existente.setPasos(dto.getPasos());
        existente.setIngredientes(dto.getIngredientes());
        existente.setPorciones(dto.getPorciones());
        existente.setHora(dto.getHora());
        existente.setFoto(dto.getFoto());

        existente.getCategoria().setNombre(dto.getCategoria());
        existente.getUsuario().setNombreusuario(dto.getAutor());

        Receta actualizada = recetaRepository.save(existente);
        return mapToDTO(actualizada);
    }



}
