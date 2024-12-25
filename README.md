# Met-Tech - Prueba Técnica

Este repositorio contiene la solución a la prueba técnica propuesta, incluyendo la implementación de ejercicios lógicos, consumo de APIs, y módulos adicionales como sistema de logueo y CRUDs para tiendas y artículos.

---

## Descripción del Proyecto

El objetivo de este proyecto es evaluar las habilidades técnicas en la resolución de problemas lógicos, el desarrollo de sistemas basados en APIs y la creación de un CRUD funcional. Este proyecto utiliza un enfoque modular y estructurado para garantizar una solución clara y mantenible.

---

## Ejercicios Lógicos

### 1. Métodos para Matrices (`MyMatrix`)

El objeto `MyMatrix` incluye los siguientes métodos:

- **dimension**: Retorna la profundidad de la matriz.
- **straight**: Verifica si la matriz es uniforme en todas sus dimensiones.
- **compute**: Calcula la suma de todos los números en la matriz.

#### Notas Importantes:

En el ejemplo proporcionado en la prueba técnica, se especifica que el resultado de `MyMatrix.new(f).compute` debería ser 66, pero al realizar el cálculo real, la suma correcta es **74**. Este error ha sido identificado y aclarado.

### 2. Métodos para Strings (`MyArray`)

El objeto `MyArray` incluye los siguientes métodos:

- **operation**: Verifica si el string es una operación aritmética válida.
- **compute**: Calcula el resultado de la operación aritmética, validando la correcta agrupación de paréntesis.

#### Ejemplo de Uso:

- para el caso especifico de ("(2 + 10) / 2 - 20") daría algo como esto donde S es la función a evaluar:

```javascript
new Function(`return (${s})`)()
s.operation # => true
s.compute   # => -14
```

---

## Consumo de API

Se implementaron los siguientes endpoints usando la URL base: `https://test-api-met.herokuapp.com`.

### Endpoints Principales

1. **Crear un usuario**:

   - `POST /register`

2. **Autenticarse**:

   - `POST /auth`

3. **CRUD de Tiendas**:

   - Crear: `POST /store/<string:name>`
   - Eliminar: `DELETE /store/<string:name>`
   - Listar todas: `GET /stores`

4. **CRUD de Artículos**:
   - Crear: `POST /item/<string:name>`
   - Actualizar: `PUT /item/<string:name>`
   - Eliminar: `DELETE /item/<string:name>`

---

## Módulos Adicionales

### 1. Sistema de Logueo

Se desarrolló un sistema de autenticación básico para gestionar accesos.

### 2. CRUD de Tiendas

Permite gestionar tiendas con operaciones básicas como creación, visualización, edición y eliminación.

#### 2.1. CRUD de Artículos

Asociado a tiendas, cada artículo pertenece a una tienda específica.

---

## Cómo Ejecutar el Proyecto

### Instalación de Dependencias

```bash
npm install
```

### Modo Desarrollo

```bash
npm run dev
```

---

## Estructura del Proyecto

- **/src/views/**: Contiene el código fuente del proyecto.
- **services**: Implementación de lógica para consumo de API.

---

## Consideraciones para Evaluación

- El código incluye comentarios para explicar la lógica aplicada.
- Los errores fueron documentados y solucionados.
- Todos los endpoints fueron probados y claramente el backend esta fuera de servicio, por lo tanto tuve que desarrollar esta aplicacion teniendo como guia la documentacion dada de antemano.
