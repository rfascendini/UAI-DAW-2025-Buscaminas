# Proyecto Final - Desarrollo y Arquitecturas Web 2025

## Minesweeper

🔗 **Link de interés:** [https://minesweeper.online/es/](https://minesweeper.online/es/)

---

## 🎮 Reglas del Juego

El tablero está dividido en celdas, con minas distribuidas al azar.  
Para ganar, debés abrir todas las celdas que no contienen minas.  
Al hacer clic en una celda que no tiene una mina, se revela un número que indica cuántas minas hay en las celdas vecinas.

Podés:
- Marcar celdas sospechosas con **una bandera (clic derecho)**.
- Reiniciar el juego con **la cara feliz** o **la barra espaciadora**.
- Ver las **minas restantes** a la izquierda y el **cronómetro** a la derecha.

### 🧠 Chording

Cuando un número tiene la cantidad correcta de banderas alrededor, se puede hacer clic sobre él para abrir todas las celdas vecinas.  
Esto se llama *chording* y permite agilizar el juego.  

---

## ✅ Requerimientos Obligatorios

- ✅ Código prolijo y estricto (HTML5, CSS3 y ES5).
- ✅ Comentarios, commits y estilos de código consistentes.
- ✅ Diseño responsive y estético usando Flexbox.
- ✅ No se permite uso de `alert()`. Se deben usar **modales**.
- ✅ Juego completamente funcional para un jugador con ingreso de nombre (mínimo 3 letras).
- ✅ Tablero generado dinámicamente por JavaScript.
- ✅ Tamaño por defecto: **8x8** con **10 minas**, colocadas aleatoriamente.
- ✅ Acciones del jugador:
  - Clic izquierdo: revela celda.
  - Clic derecho: pone/quita bandera.
- ✅ Condiciones de fin:
  - Si revela una mina: **pierde**.
  - Si revela todas las demás celdas: **gana**.
- ✅ Expansión automática en celdas vacías sin minas vecinas (recursiva).
- ✅ Mostrar contador de minas restantes (puede ser negativo).
- ✅ Temporizador activo desde la primera jugada.
- ✅ Mostrar mensaje al **ganar** o **perder**.
- ✅ Reinicio sin recargar la página.
- ✅ Validación de inputs (ej: no permitir 100 minas en tablero de 64 celdas).
- ✅ Página de **Contacto** con formulario: nombre, email y mensaje.
- ✅ Validaciones del formulario por JavaScript:
  - Nombre alfanumérico.
  - Email válido.
  - Mensaje con más de 5 caracteres.
- ✅ Link a este repositorio en GitHub que se abre en nueva pestaña.

---

## ⭐ Requerimientos Deseados

- 🌙 Modo claro / oscuro.
- 🔊 Efectos de sonido al ganar o perder.
- 💾 Guardar partidas con LocalStorage (nombre, puntaje, fecha, hora y duración).
- 🏆 Modal con ranking ordenado por puntaje (opcional: ordenar por fecha).
- 🎚️ Selector de dificultad:
  - **Fácil**: 8x8 – 10 minas  
  - **Medio**: 12x12 – 25 minas  
  - **Difícil**: 16x16 – 40 minas

---

## 📌 Buenas Prácticas para la Entrega

### 🔤 Nomenclaturas
- PascalCase: `SomeName`
- camelCase: `someName`
- snake_case: `some_name`
- kebab-case: `some-name`

### 🧪 Git y GitHub
- Commits descriptivos, paso a paso del desarrollo.
- Evitar comentarios como "Fix", "Changes".
- README claro y completo.
- `.gitignore` con archivos ocultos del sistema (.vscode, .DS_Store, etc.)

### 📁 Estructura de Archivos
- Imágenes, CSS y JS en carpetas correspondientes.
- Consistencia en nombres de archivos y carpetas.

---

## 🧱 Estándares de Código

### HTML
- `<!DOCTYPE html>` + `<meta>` de charset y viewport.
- Usar `reset.css`.
- No usar `<br>` para maquetar.
- Evitar estilos y JS en línea.
- Consistencia en nomenclatura (camelCase o kebab-case).
- Indentación perfecta. Sin líneas vacías innecesarias.

### CSS
- Usar **Flexbox** siempre.
- Consistencia en colores (hex, rgb o palabras).
- Unidades coherentes (px, rem, %, etc.).
- Ordenar reglas y propiedades.
- Media queries al final del archivo.

### JavaScript
- `"use strict"` al inicio.
- Solo ES5 (`var`, `function`, sin arrow functions).
- Comparación estricta (`===`, `!==`).
- Eventos con `addEventListener`.
- Variables globales al inicio.
- Evitar inyección HTML (usar clases `display: none`).
- Separar código en múltiples archivos si es necesario.
- Indentación perfecta. Sin comentarios innecesarios.

---

## 📝 Idioma del Código

- **No mezclar inglés y español**: todo en uno u otro idioma.

---

> ✔️ Cumplir con todos los puntos obligatorios garantiza nota 4.  
> ⭐️ Cumplir también con los deseados permite alcanzar hasta nota 10.

---

**¡Gracias por visitar este proyecto!**
