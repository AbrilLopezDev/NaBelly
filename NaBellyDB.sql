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
porciones int,
codcategoria char(3),
hora DATETIME,
foto varchar(500) null,
favoritos int null,
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

use nabelly;
-- BUDINES
INSERT INTO recetas (nombreusuario, nombre, descripcion, pasos, ingredientes, porciones, codcategoria, hora, foto, favoritos) VALUES
('usuario', 'Budín de Arándano', 'Este budín de arándano es fácil y delicioso, con una textura esponjosa y un sabor fresco gracias a los arándanos. Mezcla manteca cremosa con azúcar, incorpora huevos y combina los ingredientes secos con leche. Ideal para desayunos o meriendas, se puede servir tibio o a temperatura ambiente, acompañando café o té.', 
'1. Precalentar el horno a 180°C y engrasar un molde para budín. 
2. Tamizar 250 g de harina, 10 g de polvo de hornear y 2 g de sal en un bol grande. 
3. Batir 100 g de manteca con 150 g de azúcar hasta obtener una mezcla cremosa. 
4. Agregar 3 huevos uno a uno, batiendo bien cada vez. 
5. Añadir 5 ml de esencia de vainilla y mezclar suavemente. 
6. Incorporar los ingredientes secos alternando con 120 ml de leche, mezclando con cuidado. 
7. Integrar 150 g de arándanos con movimientos envolventes. 
8. Verter la mezcla en el molde, alisar y hornear 45-55 minutos hasta que al insertar un palillo este salga limpio. 
9. Dejar enfriar 10 minutos antes de desmoldar y servir.', 
'250 g harina, 3 huevos, 150 g arándanos, 150 g azúcar, 100 g manteca, 120 ml leche, 10 g polvo de hornear, 2 g sal, 5 ml esencia de vainilla', 
8, 'BUD', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/budinArandano.png', 0),

('usuario', 'Budín de Banana', 'Rápido y fácil de preparar, este budín de banana tiene un sabor intenso y húmedo que encanta a todos. La mezcla de bananas maduras con manteca, azúcar y huevos da como resultado un postre esponjoso y aromático. Perfecto para meriendas, desayunos o acompañar café, se disfruta solo o con un toque de mermelada.', 
'1. Precalentar el horno a 175°C y engrasar un molde para budín. 
2. Aplastar 3 bananas maduras hasta obtener un puré. 
3. Batir 100 g de manteca con 150 g de azúcar hasta cremosa y añadir 3 huevos uno a uno. 
4. Incorporar el puré de banana y 5 ml de esencia de vainilla. 
5. Mezclar 250 g de harina con 5 g de bicarbonato y 2 g de sal, e integrar a la mezcla húmeda. 
6. Verter en el molde y alisar la superficie. 
7. Hornear 50-60 minutos hasta que un palillo salga limpio. 
8. Dejar enfriar 10 minutos antes de desmoldar. 
9. Servir solo o acompañado de manteca o mermelada.', 
'250 g harina, 3 huevos, 3 bananas maduras, 100 g manteca, 150 g azúcar, 5 g bicarbonato, 2 g sal, 5 ml esencia de vainilla', 
8, 'BUD', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/budinBanana.png', 0),

('usuario', 'Budín de Chocolate', 'Delicioso budín de chocolate, intenso, fácil y rápido de preparar. Ideal para amantes del chocolate, combina manteca y chocolate derretido con huevos batidos, azúcar y harina tamizada. Su textura es húmeda y esponjosa, perfecta para meriendas, desayunos o postres acompañando un café o un vaso de leche.', 
'1. Precalentar el horno a 180°C y engrasar el molde. 
2. Derretir 150 g de chocolate con 100 g de manteca a baño maría. 
3. Batir 3 huevos con 150 g de azúcar hasta cremosos. 
4. Incorporar el chocolate derretido y mezclar suavemente. 
5. Agregar 250 g de harina tamizada con 10 g de polvo de hornear, mezclar hasta integrar. 
6. Verter la mezcla en el molde y alisar la superficie. 
7. Hornear 40-50 minutos, verificar con palillo. 
8. Dejar enfriar antes de desmoldar y servir.', 
'250 g harina, 3 huevos, 150 g chocolate, 100 g manteca, 150 g azúcar, 10 g polvo de hornear, 2 g sal, 5 ml esencia de vainilla', 
8, 'BUD', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/budinChocolate.png', 0);

-- ENSALADAS
INSERT INTO recetas (nombreusuario, nombre, descripcion, pasos, ingredientes, porciones, codcategoria, hora, foto, favoritos) VALUES
('usuario', 'Ensalada de Atún', 'Ensalada rápida, fresca y nutritiva, ideal para una comida ligera o acompañar un plato principal. Mezcla atún, lechuga, tomate y cebolla con mayonesa para un sabor delicioso y equilibrado. Perfecta para servir en menos de 5 minutos y disfrutar de un plato saludable lleno de proteínas y vegetales frescos.', 
'1. Escurrir 150 g de atún en lata y desmenuzarlo en un bol grande. 
2. Lavar 50 g de lechuga y cortarla en tiras finas. 
3. Lavar y cortar 1 tomate y 30 g de cebolla en juliana. 
4. Mezclar todos los vegetales con el atún. 
5. Agregar 30 g de mayonesa al gusto y revolver suavemente. 
6. Ajustar sal y pimienta. 
7. Servir inmediatamente, fresca y bien presentada.', 
'150 g atún, 50 g lechuga, 1 tomate, 30 g cebolla, 30 g mayonesa, sal y pimienta al gusto', 
2, 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaAtun.png', 0),

('usuario', 'Ensalada Caprese', 'Clásica ensalada italiana, fresca y deliciosa, perfecta como entrada o acompañamiento. Alterna rodajas de tomate y mozzarella, agrega albahaca fresca y rocía con aceite de oliva y sal. Sencilla, elegante y llena de sabor mediterráneo, ideal para cualquier comida rápida y saludable.', 
'1. Lavar 2 tomates medianos y cortarlos en rodajas de 0.5 cm. 
2. Cortar 150 g de mozzarella en rodajas del mismo grosor. 
3. Alternar rodajas de tomate y mozzarella en un plato grande. 
4. Añadir 5 hojas de albahaca fresca. 
5. Rociar con 10 ml de aceite de oliva y una pizca de sal. 
6. Servir inmediatamente, fresca y decorativa.', 
'2 tomates medianos, 150 g mozzarella, 5 hojas albahaca, 10 ml aceite de oliva, sal al gusto', 
2, 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaCaprese.png', 0),

('usuario', 'Ensalada César', 'Ensalada César con pollo, ideal para almuerzos ligeros y nutritivos. Mezcla lechuga fresca con tiras de pollo cocido, croutons y aderezo César. Se puede añadir queso rallado al gusto, obteniendo una combinación deliciosa de texturas y sabores para disfrutar como plato principal o acompañamiento.', 
'1. Lavar 100 g de lechuga y cortarla en tiras. 
2. Cocinar 150 g de pechuga de pollo y cortarla en tiras finas. 
3. Preparar 30 g de aderezo César o usar comercial. 
4. Mezclar la lechuga, el pollo y 20 g de croutons en un bol grande. 
5. Agregar el aderezo y revolver suavemente. 
6. Espolvorear 10 g de queso rallado al gusto. 
7. Servir inmediatamente, fresca y sabrosa.', 
'100 g lechuga, 150 g pollo, 20 g croutons, 30 g aderezo César, 10 g queso rallado', 
2, 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaCesar.png', 0 ),

('usuario', 'Ensalada de Garbanzos', 'Ensalada rápida, nutritiva y llena de sabor, perfecta para comidas saludables. Combina garbanzos cocidos con vegetales frescos, agrega aceite de oliva, sal, pimienta y limón al gusto. Ideal como acompañamiento o plato principal ligero, mantiene la frescura y nutrientes de los ingredientes.', 
'1. Lavar y escurrir 150 g de garbanzos cocidos. 
2. Cortar 1 tomate, 50 g de pepino y 30 g de cebolla en cubos pequeños. 
3. Mezclar los vegetales con los garbanzos en un bol grande. 
4. Agregar 10 ml de aceite de oliva, sal, pimienta y 5 ml de jugo de limón al gusto. 
5. Revolver suavemente y servir fresca.', 
'150 g garbanzos cocidos, 1 tomate, 50 g pepino, 30 g cebolla, 10 ml aceite de oliva, 5 ml jugo de limón, sal y pimienta al gusto', 
2, 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaGarbanzos.png', 0),

('usuario', 'Ensalada Griega', 'Fresca y auténtica ensalada griega, rápida de preparar. Mezcla tomate, pepino, cebolla, queso feta y aceitunas negras, rocía con aceite de oliva y ajusta sal y pimienta. Ideal como entrada o acompañamiento, combina sabores mediterráneos y es perfecta para una comida saludable y ligera.', 
'1. Cortar 1 tomate, 50 g de pepino y 30 g de cebolla en cubos medianos. 
2. Desmenuzar 50 g de queso feta y mezclar con 20 g de aceitunas negras. 
3. Añadir los vegetales en un bol grande y mezclar suavemente. 
4. Rociar con 10 ml de aceite de oliva y ajustar sal y pimienta. 
5. Servir inmediatamente, fresca y deliciosa.', 
'1 tomate, 50 g pepino, 30 g cebolla, 50 g queso feta, 20 g aceitunas negras, 10 ml aceite de oliva, sal y pimienta al gusto', 
2, 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaGriega.png', 0),

('usuario', 'Ensalada de Pollo', 'Fácil ensalada con pollo, ideal para almuerzos rápidos y llenos de sabor. Combina pollo cocido desmenuzado con lechuga, tomate y zanahoria, aderezado con aceite de oliva, sal y pimienta. Un plato saludable, nutritivo y fresco, perfecto para cualquier ocasión.', 
'1. Cocinar y desmenuzar 150 g de pollo. 
2. Lavar y cortar 50 g de lechuga, 1 tomate y 50 g de zanahoria en tiras o cubos. 
3. Mezclar los vegetales con el pollo en un bol grande. 
4. Agregar 10 ml de aceite de oliva, sal y pimienta al gusto. 
5. Revolver suavemente y servir fresca.', 
'150 g pollo, 50 g lechuga, 1 tomate, 50 g zanahoria, 10 ml aceite de oliva, sal y pimienta al gusto', 
2, 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaPollo.png', 0),

('usuario', 'Ensalada de Quinoa', 'Ensalada saludable, rápida y nutritiva, perfecta para cualquier comida. La quinoa cocida se mezcla con vegetales frescos como tomate, pepino y zanahoria, agregando aceite de oliva, sal, pimienta y limón al gusto. Ideal como acompañamiento o plato principal ligero, mantiene todos los nutrientes y el sabor de los ingredientes.', 
'1. Cocinar 100 g de quinoa según instrucciones del paquete y dejar enfriar. 
2. Cortar 1 tomate, 50 g de pepino y 50 g de zanahoria en cubos pequeños. 
3. Mezclar la quinoa cocida con los vegetales en un bol grande. 
4. Agregar 10 ml de aceite de oliva, 5 ml de jugo de limón, sal y pimienta al gusto. 
5. Revolver bien y servir fresca.', 
'100 g quinoa, 1 tomate, 50 g pepino, 50 g zanahoria, 10 ml aceite de oliva, 5 ml jugo de limón, sal y pimienta al gusto', 
2, 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaQuinoa.png', 0),

('usuario', 'Ensalada Rusa', 'Clásica ensalada rusa, rápida y fácil de preparar. Mezcla papa, zanahoria y arvejas cocidas con mayonesa, ajustando sal y pimienta. Ideal como acompañamiento o plato principal ligero, mantiene una textura cremosa y un sabor equilibrado, perfecta para cualquier comida.', 
'1. Cocinar 100 g de papa y 50 g de zanahoria hasta que estén tiernas. 
2. Cocinar 50 g de arvejas y dejar enfriar todas las verduras. 
3. Cortar las verduras en cubos pequeños. 
4. Mezclar con 30 g de mayonesa al gusto, ajustando sal y pimienta. 
5. Servir fría, presentando un plato cremoso y colorido.', 
'100 g papa, 50 g zanahoria, 50 g arvejas, 30 g mayonesa, sal y pimienta al gusto', 
2, 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaRusa.png', 0),

('usuario', 'Ensalada Thai', 'Ensalada rápida, fresca y con sabor tailandés, ideal para un plato ligero y lleno de sabor. Mezcla repollo y zanahoria con maní tostado y agrega un aderezo de limón, salsa de soja y aceite de sésamo. Perfecta como acompañamiento o entrada, combina textura crujiente con sabores ácidos y salados.', 
'1. Lavar 50 g de repollo y 50 g de zanahoria, cortar en tiras finas. 
2. Mezclar con 20 g de maní tostado en un bol grande. 
3. Preparar aderezo Thai con 5 ml de limón, 10 ml de salsa de soja y 5 ml de aceite de sésamo. 
4. Agregar el aderezo a los vegetales y mezclar bien. 
5. Servir inmediatamente, fresca y crujiente.', 
'50 g repollo, 50 g zanahoria, 20 g maní tostado, 5 ml limón, 10 ml salsa de soja, 5 ml aceite de sésamo', 
2, 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaThai.png', 0),

('usuario', 'Ensalada Waldorf', 'Ensalada Waldorf fácil, fresca y con un equilibrio perfecto entre dulce y crujiente. Combina manzana y apio en cubos con nueces y pasas opcionales, aderezadas con mayonesa para un sabor delicado. Ideal como acompañamiento o plato principal ligero, mantiene frescura y textura agradable.', 
'1. Cortar 1 manzana y 50 g de apio en cubos pequeños. 
2. Mezclar con 30 g de nueces y 10 g de pasas opcionales. 
3. Agregar 30 g de mayonesa y mezclar suavemente hasta integrar todos los ingredientes. 
4. Servir inmediatamente, fresca y crujiente.', 
'1 manzana, 50 g apio, 30 g nueces, 30 g mayonesa, 10 g pasas (opcional)', 
2, 'ENS', NOW(), 'https://abrillopezdev.github.io/fotosRecetas/ensaladaWaldorf.png', 0);
