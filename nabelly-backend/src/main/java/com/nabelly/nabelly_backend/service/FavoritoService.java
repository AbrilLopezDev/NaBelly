package com.nabelly.nabelly_backend.service;

public interface FavoritoService {
    int FavoritosXReceta (Integer id);
    boolean existeFavorito(int idReceta, String usuario);
    boolean toggleFavorito(int idReceta, String usuario);
}
