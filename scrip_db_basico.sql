create database if not exists api_rest_imgupload;

use api_rest_imgupload;

create table files(
	id int not null auto_increment primary key,
    nombre varchar(255),
    imagen varchar(255),
    fecha_creacion TIMESTAMP
);




insert into files (nombre, imagen, password )values ('prueba', 'prueba@gmail.com','1234567');
insert into freebooks (name, author, image_url )values ('libro1', 'autor1','libro.png');