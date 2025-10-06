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
    public ResponseEntity<List<RecetaDTO>> RecetasXCategoria (@PathVariable String codCategoria){
        List<RecetaDTO> recetas = recetaService.RecetasXCategoria(codCategoria);
        return ResponseEntity.ok(recetas);
    }

    @GetMapping("/user/{nombreusuario}")
    public ResponseEntity<List<RecetaDTO>> RecetasXUsername (@PathVariable String nombreusuario){
        List<RecetaDTO> recetas = recetaService.RecetasXUsername(nombreusuario);
        return ResponseEntity.ok(recetas);
    }


}
