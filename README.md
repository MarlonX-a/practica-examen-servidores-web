# Instalación — dependencias extra (no incluidas por defecto en NestJS)

Este README lista únicamente las dependencias adicionales que se añadieron sobre las dependencias base que instala NestJS por defecto. Para cada proyecto se muestra el comando para instalarlas.

Nota: las dependencias base que típicamente incluye Nest son `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `reflect-metadata` y `rxjs`. Aquí solo se listan las que se agregaron aparte.

**Graph**
- Desde la carpeta del proyecto:
  - `cd graph`
  - Comando para instalar las dependencias extra:
    - `npm install @apollo/server @as-integrations/express5 @nestjs/apollo @nestjs/axios @nestjs/graphql axios express graphql graphql-playground-html`

**REST**
- Desde la carpeta del proyecto:
  - `cd rest`
  - Comando para instalar las dependencias extra:
    - `npm install @nestjs/axios @nestjs/mapped-types @nestjs/typeorm class-transformer class-validator sqlite3 typeorm`

**WS (WebSockets)**
- Desde la carpeta del proyecto:
  - `cd ws`
  - Comando para instalar las dependencias extra:
    - `npm install @nestjs/mapped-types @nestjs/platform-socket.io @nestjs/websockets`

Uso rápido:
- Ejecuta `npm install` en cada carpeta si prefieres instalar todo (incluyendo dependencias base). Si solo quieres añadir lo extra, usa los comandos arriba desde la carpeta correspondiente.

Si quieres, puedo también añadir los comandos `npm install --save-dev` para devDependencies específicas o fijar versiones exactas. 
