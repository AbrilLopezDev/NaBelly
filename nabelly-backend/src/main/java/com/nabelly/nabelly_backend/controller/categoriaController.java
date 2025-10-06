package com.nabelly.nabelly_backend.controller;

import com.nabelly.nabelly_backend.entity.Categoria;
import com.nabelly.nabelly_backend.entity.Receta;
import com.nabelly.nabelly_backend.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;

    @GetMapping("/tipo/{idtipo}")
    public ResponseEntity <List<Categoria>> CategoriasXTipo (@PathVariable String idtipo){
        List<Categoria> categorias = categoriaService.CategoriaXTipoReceta(idtipo);

        if (categorias.isEmpty()) {
            System.out.println("Vacia");
            return ResponseEntity.status(204).body(null);
        }
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/codigo/{codCategoria}")
    public ResponseEntity<Categoria> CategoriasXCodCategoria (@PathVariable String codCategoria){
        Categoria categoria = categoriaService.CategoriaXCodCategoria(codCategoria);

        if (categoria==null) {
            return ResponseEntity.status(204).body(null);
        }

        return ResponseEntity.ok(categoria);
    }

}
