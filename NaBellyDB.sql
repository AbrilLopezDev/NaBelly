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
nombre varchar(30),
descripcion varchar(1000),
pasos varchar (4000),
ingredientes varchar (1000),
porciones varchar (30),
codcategoria char(3),
hora DATETIME,
constraint pk_recetas primary key (idreceta),
constraint fk_recetas_categorias foreign key (codcategoria) references categorias (codcategoria)
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
('HEL', 'Helados', 'D', 'DM'),
('MUF', 'Muffins', 'D', 'DM');
