package com.nabelly.nabelly_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {
    private final String uploadDir = "uploads/";

    public String guardarFoto(MultipartFile foto) throws IOException {
        if (foto == null || foto.isEmpty()) {
            return null;
        }

        String fileName = UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();
        Path path = Paths.get(uploadDir + fileName);

        Files.createDirectories(path.getParent());
        Files.copy(foto.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        String baseUrl = "http://localhost:8080/uploads/"; // URL pública
        return "/uploads/" + fileName;
    }
}
