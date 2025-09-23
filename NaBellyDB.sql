create schema nabelly;
use nabelly;

create table usuarios(
nombreusuario varchar(16) not null,
contasena varchar(100) not null, -- encriptada
email varchar(40) not null,
foto varchar(500) null,
tipo bool not null, -- true admin
estado bool not null,
constraint pk_usuarios primary key (nombreusuario)
) ;

 -- merienda, cena...
create table horareceta(
codhorareceta char(2),
nombre varchar(50),
constraint pk_horareceta primary key (codhorareceta)
);

 -- dulce o salado
create table tiporeceta( 
codtiporeceta char(1),
nombre varchar(12),
constraint pk_tiporeceta primary key (codtiporeceta)
);

create table categorias(
codcategoria char(3),
nombre varchar(30),
codtiporeceta char(1),
codhorareceta char(2),
constraint pk_categorias primary key (codcategoria),
constraint fk_categorias_tiporeceta foreign key (codtiporeceta) references tiporeceta (codtiporeceta),
constraint fk_categorias_horareceta foreign key (codhorareceta) references horareceta (codhorareceta)
);

create table recetas(
idreceta int auto_increment not null,
nombreusuario varchar(16),
nombre varchar(30),
descripcion varchar(1000),
pasos varchar (4000),
ingredientes varchar (1000),
porciones varchar (30),
codcategoria char(3),
hora DATETIME,
foto varchar(500) null,
constraint pk_recetas primary key (idreceta),
constraint fk_recetas_categorias foreign key (codcategoria) references categorias (codcategoria),
constraint fk_recetas_usuarios foreign key (nombreusuario) references usuarios (nombreusuario)
);

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

INSERT INTO horareceta (codhorareceta, nombre) VALUES
('DM', 'DesayunoMerienda'),
('AC', 'AlmuerzoCena');

INSERT INTO tiporeceta (codtiporeceta, nombre) VALUES
('D', 'Dulce'),
('S', 'Salado');

-- CATEGORÍAS SALADAS
INSERT INTO categorias (codcategoria, nombre, codtiporeceta, codhorareceta) VALUES
('ENS', 'Ensaladas', 'S', 'AC'),        
('SOP', 'Sopas', 'S', 'AC'),       
('TAR', 'Tartas Saladas', 'S', 'AC'),
('PAF', 'Pastas', 'S', 'AC'),    
('CAR', 'Carnes', 'S', 'AC'),     
('ARR', 'Arroces', 'S', 'AC');

-- CATEGORÍAS DULCES
INSERT INTO categorias (codcategoria, nombre, codtiporeceta, codhorareceta) VALUES
('TAD', 'Tartas Dulces', 'D', 'DM'),
('POS', 'Postres', 'D', 'DM'),
('BIS', 'Bizcochuelos', 'D', 'DM'),
('GAL', 'Galletas', 'D', 'DM'),
('BUD', 'Budines', 'D', 'DM'),
('MUF', 'Muffins', 'D', 'DM');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- DESPUES DE CORRER EL BACK POR PRIMERA VEZ

-- BUDINES
INSERT INTO recetas (nombreusuario, nombre, descripcion, pasos, ingredientes, porciones, codcategoria, hora, foto) VALUES
('usuario', 'Budín de Arándano', 'Fácil budín con pocos ingredientes y un delicioso toque de arándanos frescos', 
'1. Precalentar el horno a 180°C. Engrasar un molde para budín y reservar. 
2. Tamizar la harina junto con el polvo de hornear y la sal en un bol grande. Reservar. 
3. Batir la manteca con el azúcar hasta obtener una mezcla cremosa. 
4. Incorporar los huevos uno a uno, batiendo bien después de cada adición. 
5. Añadir la esencia de vainilla y mezclar suavemente. 
6. Agregar los ingredientes secos tamizados alternando con la leche, mezclando con cuidado. 
7. Integrar los arándanos con movimientos envolventes para no romperlos. 
8. Verter la mezcla en el molde y alisar la superficie. 
9. Hornear 45-55 minutos o hasta que al insertar un palillo este salga limpio. 
10. Dejar enfriar 10 minutos en el molde antes de desmoldar. 
11. Servir tibio o a temperatura ambiente.', 
'Harina, huevos, arándanos, azúcar, manteca, leche, polvo de hornear, sal, esencia de vainilla', 
'8 porciones', 'BUD', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/budinArandano.png'),

('usuario', 'Budín de Banana', 'Rápido y fácil budín con sabor intenso a banana, húmedo y delicioso', 
'1. Precalentar el horno a 175°C. Engrasar un molde para budín. 
2. Aplastar las bananas maduras hasta obtener un puré. 
3. Batir manteca con azúcar hasta cremosa. Agregar huevos uno a uno. 
4. Incorporar el puré de banana y la esencia de vainilla. 
5. Mezclar la harina, el bicarbonato y la sal, y agregar a la preparación húmeda. 
6. Verter en el molde y alisar. 
7. Hornear 50-60 minutos o hasta que el palillo salga limpio. 
8. Dejar enfriar 10 minutos antes de desmoldar. 
9. Servir y disfrutar con manteca o mermelada.', 
'Harina, huevos, bananas maduras, manteca, azúcar, bicarbonato, sal, esencia de vainilla', 
'8 porciones', 'BUD', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/budinBanana.png'),

('usuario', 'Budín de Chocolate', 'Delicioso budín de chocolate, intenso, fácil y rápido de preparar', 
'1. Precalentar el horno a 180°C. Engrasar el molde. 
2. Derretir chocolate con manteca a baño maría. 
3. Batir huevos con azúcar hasta cremosos. 
4. Incorporar el chocolate derretido y mezclar suavemente. 
5. Agregar harina tamizada con polvo de hornear y mezclar hasta integrar. 
6. Verter en el molde y alisar. 
7. Hornear 40-50 minutos, verificar con palillo. 
8. Dejar enfriar antes de desmoldar y servir.', 
'Harina, huevos, chocolate, manteca, azúcar, polvo de hornear, sal, esencia de vainilla', 
'8 porciones', 'BUD', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/budinChocolate.png');

-- ENSALADAS
INSERT INTO recetas (nombreusuario, nombre, descripcion, pasos, ingredientes, porciones, codcategoria, hora, foto) VALUES
('usuario', 'Ensalada de Atún', 'Ensalada para impresionar, llena de sabor y nutritiva, lista en menos de 5 minutos', 
'1. Escurrir el atún y desmenuzarlo en un bol. 
2. Lavar y cortar la lechuga, tomates y cebolla en juliana. 
3. Mezclar todos los vegetales con el atún. 
4. Agregar mayonesa al gusto y revolver suavemente. 
5. Ajustar sal y pimienta. 
6. Servir fresca.', 
'Atún, lechuga, tomate, cebolla, mayonesa', 
'2 porciones', 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaAtun.png'),

('usuario', 'Ensalada Caprese', 'Clásica ensalada italiana, fresca, fácil y deliciosa', 
'1. Lavar y cortar tomates en rodajas. 
2. Cortar la mozzarella en rodajas del mismo grosor. 
3. Alternar rodajas de tomate y mozzarella en un plato. 
4. Añadir hojas de albahaca fresca. 
5. Rociar con aceite de oliva y un poco de sal. 
6. Servir inmediatamente.', 
'Tomate, mozzarella, albahaca, aceite de oliva, sal', 
'2 porciones', 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaCaprese.png'),

('usuario', 'Ensalada César', 'Ensalada César con pollo, fácil y rápida, ideal para un almuerzo ligero', 
'1. Lavar y cortar la lechuga. 
2. Cocinar pechuga de pollo y cortarla en tiras. 
3. Preparar aderezo César o usar comercial. 
4. Mezclar lechuga, pollo y croutons. 
5. Agregar aderezo y revolver suavemente. 
6. Servir con queso rallado al gusto.', 
'Lechuga, pollo, croutons, aderezo César, queso rallado', 
'2 porciones', 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaCesar.png'),

('usuario', 'Ensalada de Garbanzos', 'Rápida, nutritiva y llena de sabor, ideal para comer sano', 
'1. Lavar y escurrir los garbanzos cocidos. 
2. Cortar tomate, pepino y cebolla en cubos pequeños. 
3. Mezclar los vegetales con los garbanzos en un bol. 
4. Agregar aceite, sal, pimienta y limón al gusto. 
5. Revolver suavemente y servir.', 
'Garbanzos, tomate, pepino, cebolla, aceite de oliva, sal, pimienta, limón', 
'2 porciones', 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaGarbanzos.png'),

('usuario', 'Ensalada Griega', 'Fresca, rápida y con auténtico sabor griego', 
'1. Cortar tomate, pepino y cebolla en cubos medianos. 
2. Desmenuzar queso feta y mezclar con aceitunas negras. 
3. Añadir los vegetales en un bol y mezclar suavemente. 
4. Rociar con aceite de oliva y ajustar sal y pimienta. 
5. Servir inmediatamente.', 
'Tomate, pepino, cebolla, aceitunas, queso feta, aceite de oliva, sal, pimienta', 
'2 porciones', 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaGriega.png'),

('usuario', 'Ensalada de Pollo', 'Fácil ensalada con pollo, ideal para almuerzos rápidos y llenos de sabor', 
'1. Cocinar y desmenuzar pollo. 
2. Lavar y cortar lechuga, tomate y zanahoria. 
3. Mezclar los vegetales con el pollo en un bol. 
4. Agregar aceite de oliva, sal y pimienta. 
5. Revolver suavemente y servir.', 
'Pollo, lechuga, tomate, zanahoria, aceite de oliva, sal, pimienta', 
'2 porciones', 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaPollo.png'),

('usuario', 'Ensalada de Quinoa', 'Ensalada saludable, rápida y nutritiva, perfecta para cualquier comida', 
'1. Cocinar la quinoa según instrucciones del paquete. 
2. Cortar tomate, pepino y zanahoria en cubos pequeños. 
3. Mezclar la quinoa cocida con los vegetales. 
4. Agregar aceite de oliva, sal, pimienta y limón al gusto. 
5. Revolver y servir fresca.', 
'Quinoa, tomate, pepino, zanahoria, aceite de oliva, sal, pimienta, limón', 
'2 porciones', 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaQuinoa.png'),

('usuario', 'Ensalada Rusa', 'Clásica y rápida ensalada rusa, perfecta para acompañar cualquier plato', 
'1. Cocinar papa, zanahoria y arvejas hasta que estén tiernas. 
2. Cortar las verduras en cubos y dejar enfriar. 
3. Mezclar con mayonesa al gusto. 
4. Ajustar sal y pimienta. 
5. Servir fría.', 
'Papa, zanahoria, arvejas, mayonesa, sal, pimienta', 
'2 porciones', 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaRusa.png'),

('usuario', 'Ensalada Thai', 'Ensalada rápida con sabor tailandés, fresca y llena de sabor', 
'1. Lavar y cortar repollo y zanahoria en tiras finas. 
2. Mezclar con maní tostado. 
3. Preparar aderezo Thai (limón, salsa de soja, aceite de sésamo) y agregar a los vegetales. 
4. Revolver bien y servir fresca.', 
'Repollo, zanahoria, maní, limón, salsa de soja, aceite de sésamo', 
'2 porciones', 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaThai.png'),

('usuario', 'Ensalada Waldorf', 'Fácil ensalada Waldorf, fresca, dulce y crujiente', 
'1. Cortar manzana y apio en cubos pequeños. 
2. Mezclar con nueces y pasas si se desea. 
3. Agregar mayonesa y mezclar suavemente. 
4. Servir inmediatamente.', 
'Manzana, apio, nueces, mayonesa, pasas (opcional)', 
'2 porciones', 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaWaldorf.png');
