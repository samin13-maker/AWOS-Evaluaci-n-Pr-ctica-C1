## Evaluación Práctica C1

Es una aplicación web para la visualización de reportes de una biblioteca. El sistema permite consultar información analítica mediante el uso de VIEWS en la base de datos.

---


## Requisitos

Para ejecutar el proyecto es necesario contar con:

- Docker
- Docker Compose
- Navegador web

---

## Instalación y ejecución

### 1. Clonar el repositorio

En tu terminal ejeucta los comandos:

git clone https://github.com/samin13-maker/AWOS-Evaluaci-n-Pr-ctica-C1.git

cd TU_REPOSITORIO


---

### 2. Ejecutar el proyecto

Utiliza el siguiente comando para levantar el proyecto: 

docker-compose up --build


---

### 3. Acceder a la aplicación

Abrir en el navegador:

http://localhost:3000

---

## Seguridad

Se implementa un usuario de base de datos con permisos restringidos:

* Usuario: `app_user`
* Permisos: solo lectura (SELECT)
* Acceso limitado únicamente a las VIEWS
