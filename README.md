# Kubo-prueba-tecnica

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/zesertebe/kubo-prueba-tecnica.git
```

2. Instalar las dependencias:

```bash
npm install
```

3. Ejecutar el archivo "schema.sql" con un usuario con suficientes permisos:

```bash
sudo -u postgres psql -d kudo -f db/schema.sql
```

4. Crear el archivo de variables de entorno (.env) en la raiz del proyecto con la siguiente estructura:

```env
  BASE: la versión base de la api ej: v1,
  APP_PORT: el puerto de la api ej: 3000,
  DB: Enum de la base de datos 0 = POSTGRESQL ej: 0,
```

> [!WARNING]\
> Este archivo de variables de entorno no debería incluirse en ningún momento en el repositorio de la API ni en ningún otro repositorio así como en ningún servicio de almacenamiento o archivo adjunto de correo.

3. Ejecutar el servicio:

```bash
npm run dev
```
