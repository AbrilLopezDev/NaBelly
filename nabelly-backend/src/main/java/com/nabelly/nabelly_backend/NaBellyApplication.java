package com.nabelly.nabelly_backend;

import com.nabelly.nabelly_backend.entity.Usuario;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.nabelly.nabelly_backend.repository.UsuarioRepository;

@SpringBootApplication
public class NaBellyApplication {

	public static void main(String[] args) {
		SpringApplication.run(NaBellyApplication.class, args);
	}


	// Bean que se ejecuta al arrancar la app
	@Bean
	CommandLineRunner initUsuarios(UsuarioRepository repo, PasswordEncoder encoder) {
		return args -> {

			// Crear admin solo si no existe
			if (!repo.existsById("admin")) {
				Usuario admin = new Usuario();
				admin.setNombreusuario("admin");
				admin.setEmail("admin@example.com");
				admin.setContasena(encoder.encode("admin123")); // encripta contraseña
				admin.setTipo(true);
				admin.setEstado(true);
				repo.save(admin);
				System.out.println("Admin creado!");
			}

			// Crear usuario común solo si no existe
			if (!repo.existsById("usuario")) {
				Usuario user = new Usuario();
				user.setNombreusuario("usuario");
				user.setEmail("usuario@example.com");
				user.setContasena(encoder.encode("usuario123")); // encripta contraseña
				user.setTipo(false);
				user.setEstado(true);
				repo.save(user);
				System.out.println("Usuario común creado!");
			}
		};
	}

}
