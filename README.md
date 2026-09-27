# 🏇 Vaqueros Reynosa — Frontend

## 📋 Descripción

Este repositorio contiene el **Frontend de la plataforma web de Vaqueros Reynosa**.

La plataforma tiene como objetivo ofrecer a los aficionados un espacio digital donde puedan consultar información del equipo, jugadores, próximos juegos, resultados, bonos y boletos.

El Frontend proporciona la interfaz visual con la que interactuarán los usuarios y administradores.

## 🔗 Repositorios del proyecto

### Frontend

https://github.com/KTreviD/Vaqueros-Frontend

### Backend

https://github.com/KTreviD/Vaqueros-Backend

---

## 🎯 Objetivo

Desarrollar una plataforma web que permita a los aficionados mantenerse informados sobre Vaqueros Reynosa y acceder a servicios como la compra de boletos y bonos.

También se desarrollará una interfaz administrativa para gestionar la información mostrada en la plataforma.

---

## 👥 Tipos de usuario

La plataforma contará principalmente con dos tipos de usuarios.

### 👤 Usuario / Fan

El usuario podrá:

* Consultar información del equipo.
* Ver jugadores.
* Consultar la posición de los jugadores.
* Consultar próximos juegos.
* Consultar resultados.
* Consultar bonos disponibles.
* Registrarse.
* Iniciar sesión.
* Comprar boletos.
* Consultar sus boletos.
* Consultar sus compras.

### 🔐 Administrador

El administrador podrá gestionar la información de la plataforma.

Entre sus funciones estarán:

* Agregar jugadores.
* Editar jugadores.
* Eliminar jugadores.
* Modificar posiciones.
* Modificar información de jugadores.
* Registrar juegos.
* Editar juegos.
* Registrar resultados.
* Crear bonos.
* Modificar bonos.
* Consultar boletos.
* Consultar compras.
* Validar boletos mediante código QR.

---

## 🖥️ Principales pantallas

El Frontend contempla las siguientes pantallas:

* Página principal.
* Inicio de sesión.
* Registro de usuario.
* Información del equipo.
* Lista de jugadores.
* Detalle del jugador.
* Próximos juegos.
* Resultados.
* Detalle de juego.
* Bonos.
* Compra de bonos.
* Compra de boletos.
* Boleto digital.
* Perfil del usuario.
* Panel administrativo.
* Administración de jugadores.
* Administración de juegos.
* Administración de bonos.
* Validación de boletos.

---

## 🏗️ Arquitectura

El Frontend representa la capa visual de la aplicación y se comunicará con el Backend mediante servicios de API.

```text
┌───────────────────────┐
│      USUARIO          │
│       / FAN           │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│       FRONTEND        │
│    Vaqueros Reynosa   │
└──────────┬────────────┘
           │
           │ API
           ▼
┌───────────────────────┐
│       BACKEND         │
│    Vaqueros Reynosa   │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│      BASE DE DATOS    │
└───────────────────────┘
```

---

## 📁 Estructura actual del proyecto

```text
Vaqueros-Frontend/
│
├── public/
│
├── src/
│
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tecnologías

El proyecto utiliza una aplicación web basada en:

* Next.js
* TypeScript
* React
* ESLint
* Prettier
* Node.js / npm

Las dependencias y versiones específicas se encuentran definidas en `package.json`.

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/KTreviD/Vaqueros-Frontend.git
```

### 2. Entrar al proyecto

```bash
cd Vaqueros-Frontend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible localmente en:

```text
http://localhost:3000
```

---

## 🔌 Comunicación con Backend

El Frontend se conectará con el Backend de Vaqueros Reynosa para obtener y modificar información.

El Backend se encuentra en:

https://github.com/KTreviD/Vaqueros-Backend

Entre las operaciones que posteriormente podrá consumir el Frontend se encuentran:

```text
Usuarios
Jugadores
Juegos
Boletos
Bonos
Compras
Autenticación
Validación de boletos
```

---

## 🌿 Control de versiones

El proyecto utiliza Git y GitHub para controlar las versiones.

La rama principal es:

```text
main
```

Para desarrollar nuevas funcionalidades se recomienda crear ramas independientes:

```text
feature/home
feature/jugadores
feature/juegos
feature/boletos
feature/bonos
feature/login
feature/admin
```

Ejemplo:

```bash
git checkout -b feature/jugadores
```

Después de realizar los cambios:

```bash
git add .
git commit -m "feat: agregar módulo de jugadores"
git push origin feature/jugadores
```

---

## 📌 Estado del proyecto

**Fase:** Fase 2 — Sprint 0

### Planeación

* [x] Creación del repositorio.
* [x] Configuración inicial del proyecto.
* [x] Configuración de TypeScript.
* [x] Configuración de ESLint.
* [x] Configuración de Prettier.
* [ ] Desarrollo de páginas.
* [ ] Integración con Backend.
* [ ] Integración de autenticación.
* [ ] Integración de boletos.
* [ ] Integración de bonos.
* [ ] Panel administrativo.
* [ ] Pruebas.

---

## 📄 Documentación

La documentación del proyecto podrá incluir:

* Requisitos.
* Historias de usuario.
* Product Backlog.
* Wireframes.
* Arquitectura.
* Modelo de datos.
* Documentación de API.
* Manual de instalación.

---

## 🏇 Proyecto

**Vaqueros Reynosa**

Plataforma web para aficionados, información del equipo, juegos, boletos y bonos.

