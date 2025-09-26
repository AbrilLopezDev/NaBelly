package com.nabelly.nabelly_backend.controller;
import com.nabelly.nabelly_backend.entity.Receta;
import com.nabelly.nabelly_backend.service.RecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recetas")
@CrossOrigin(origins = "http://localhost:4200")
public class RecetaController {

    @Autowired
    RecetaService recetaService;

    @GetMapping("/categoria/{codCategoria}")
    public ResponseEntity<List<Receta>> CategoriasXTipo (@PathVariable String codCategoria){
        List<Receta> recetas = recetaService.RecetasXCategoria(codCategoria);
        return ResponseEntity.ok(recetas);
    }
}
