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
codhorareceta char(1),
nombre varchar(20),
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
nombre varchar(12),
codtiporeceta char(1),
constraint pk_categorias primary key (codcategoria),
constraint fk_categorias_tiporeceta foreign key (codtiporeceta) references tiporeceta (codtiporeceta)
);

create table recetas(
idreceta int auto_increment not null,
nombre varchar(30),
descripcion varchar(1000),
pasos varchar (4000),
ingredientes varchar (1000),
porciones varchar (30),
codcategoria char(3),
constraint pk_recetas primary key (idreceta),
constraint fk_recetas_categorias foreign key (codcategoria) references categorias (codcategoria)
);

-- create table categoriasxhorareceta(

-- ); 


