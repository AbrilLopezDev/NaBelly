package com.nabelly.nabelly_backend.controller;

import com.nabelly.nabelly_backend.service.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favoritos")
@CrossOrigin(origins = "http://localhost:4200")
public class FavoritoController {

    @Autowired
    FavoritoService favoritoService;

    @GetMapping("/favoritos/{id}")
    public ResponseEntity<Integer> favoritosXid (@PathVariable Integer id){
        int favoritos = favoritoService.FavoritosXReceta(id);
        return ResponseEntity.ok(favoritos);
    }

    @GetMapping("/check/{idReceta}/{usuario}")
    public ResponseEntity<Boolean> esFavorito(
            @PathVariable Integer idReceta,
            @PathVariable String usuario) {

        boolean existe = favoritoService.existeFavorito(idReceta, usuario);
        return ResponseEntity.ok(existe);
    }

    @GetMapping("/toggle/{idReceta}/{usuario}")
    public ResponseEntity<Boolean> toggleFavorito(
            @PathVariable Integer idReceta,
            @PathVariable String usuario) {

        boolean cambio = favoritoService.toggleFavorito(idReceta, usuario);
        return ResponseEntity.ok(cambio);
    }


}
