package com.nabelly.nabelly_backend.controller;
import com.nabelly.nabelly_backend.entity.Receta;
import com.nabelly.nabelly_backend.service.RecetaService;
import dto.RecetaDTO;
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
    public ResponseEntity<List<RecetaDTO>> CategoriasXTipo (@PathVariable String codCategoria){
        List<RecetaDTO> recetas = recetaService.RecetasXCategoria(codCategoria);
        return ResponseEntity.ok(recetas);
    }


}
