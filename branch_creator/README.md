# branch_creator

Este script es para agregarlo a un spreadsheet de Google que contenga los datos de las ramas que tienen que crearse.

## Antes de usar

Para que este script funcione, hay que cambiar algunas constantes en la función `wrapper`:

- **OWNER** tiene que ser el nombre del propietario del repositorio.
- **REPO** tiene que ser el nombre del repositorio al que hay que crearle ramas.
- **SHEET_NAME** es el nombre de la hoja donde están los nombres de las ramas.
- **BRANCH_RANGE** es el rango de celdas (en una única columna) en la que se encuentran los nombres de las ramas, por ejemplo: _C1:C99_.
- **TOKEN** es el token de autorización de GitHub. Debe admitir permisos para `repo` y `workflow`. Más información sobre los tokens puede encontrarse [aquí](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

## Disparar el script

Para hacer que funcione, debe accederse desde el script en el spreadsheet y debe dispararse la función `wrapper`. Los errores van a aparecer en el Logger.