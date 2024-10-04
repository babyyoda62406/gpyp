# Nombre de la Aplicación
GPYP API
## Descripción de la Aplicación
Aplicación de ejemplo para el desarrollo de APIs con NestJS.

# Guía de uso

## Clonación del repositorio

```bash
git clone https://github.com/babyyoda62406/gpyp.git
```

## Instalación de dependencias

```bash
npm install | yarn install | pnpm install
```
## Configuración de variables de entorno
```bash
cp .env.example .env
```
## Levantar servidor de base de datos

```bash
docker compose up -d
```
## Ejecución del servidor

```bash
npm run start:dev
```
## Documentación de la API
http://localhost:3000/api/v1/docs#/
contacto +53 58831892 for more information

# Info: 
Todos los endpoints excepto login y register son protegidos por JWT , con diferentes privilegios de autiración.

El primero usuario en registrarse se le asigna el privilegio de "ALL_PRIVILEGES" y el resto de usuarios se asignan los privilegio de "OBSERVER" 

Para modificar los privilegios de un usuario se debe tener el privilegio de "ALL_PRIVILEGES" y estos se pueden modificar a travez de los endpoints  "add-privileges" o "remove-privileges"

El resto de los endpoints y los diferentes niveles de control de acceso basado en privilegios se pueden inferir a travez de la documentación de la API.

Un saludo y gracias por su tiempo.

