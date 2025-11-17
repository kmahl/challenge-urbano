## Fixes aplicados 
- Saque el dist del .dockerignore en BE
- Saque el build del .dockerignore en FE
- Tuve que sumar en eslint "endOfLine":"auto" en el archivo de config del .prettierrc para el ajuste en algunos archivos faltaba el ultimo salto de linea
- Pude marcar una version más baja de node para que sea compatible con las versiones de las dependencias, pero preferí dejar fija la 22 (LTS) y subir las versiones de las dependencias para dejar todo lo más actual posible. Esto implico cambiar breaking change que habían de algunas dependencias. Como por ejemplo cambiar el hook de useHistory a useNavigate
- Tuve que sumar el puerto en el BE
- Cambiar switch por route en el router de react (cambio de version)
- Tuve que importar explicitamente ormconfig para que funcionara la config
- Deje de usar CRACO ya que para las nuevas versiones de react script no es necesario, solo tuve que agregar la config de de postcss y cambiar la config de tailwind.
- Migre de ES2017 a ES2021 para poder usar tipado moderno
- Sume los decoradores IsOptional y IsString en las clases query de cada entidad para fixear los filtros de busqueda

## Seguridad: 
- Implemente en el BE, seguridades basicas: 
    - CORS (protección por dominio para aceptar request que vengan del FE)
    - helmet (seguridad a los headers)
    - Throtter (para rate limitear endpoints contra brute force)
- Reforce el guardado de la cookie de sesion y sume una validación en el metodo refresh
- Cambie el campo password en el dto de user para requerir valores estandar del formato de clave actual.
- Movi el admin password al .env y dentro del docker-compose para no dejar codigo "vulnerable" por más que sea a nivel practico. Y cambie la clave para que cumpla la regex nueva
- Defini los enviroments para condicionar acciones
- Cree un util para sanitizar variables que se incluidan directamente en una query (tambien pude usar una lib para sanitizar pero a efectos del challenge no lo crei necesario)
- Reduci a 7 dias la duración de la cookie de sesion
- Elimine en el FE un log del token


## Mejoras
- Sume el decorador unique al campo username de la entidad de usuarios
- Mejore los DTO's usando PartialType para simplificar la definición de los campos
- Centralice constantes
- Converti en util la validacion de user name (para hacer DRY)
- Defini los campos description de course y content en tipo TEXT para que pueda almacenar más texto, ya que string termina creando un varchar255 y sería un problema si es una desc muy larga
- Sume una estrategia para actualizaciones de datos llamada "Optimistic locking" para evitar el "Lost update" que basicamente sucede cuando 2 personas están editando el mismo registro y se pisan
- Elimine el refetchInterval ya que esto puede generar muchisimos costos, impide el uso de ratelimits para seguridad y no es una practica apropiada, para efectos del challenge implemente invalidateQueries para mantener actualizadas las tablas que el usuario va modificando PERO no va a ver lo que otros usuarios agreguen/actualicen para poder obtener esto sin tanto costo, lo ideal sería implementar un websocket.
- Implemente una lib llamada debounce para aplicarlo a los filtros y así no llamar al BE cada vez que se ingresa un valor en los inputs
- Fixee un test que fallaba en BE

## Mejoras que no implemente pero que haría en un proyecto real:
- Sacar el synchronize: true y usar typeorm migrations para crear las DB en prod 
- Implementar campos de auditoría en cada tabla (updateAt, createdAt)
- Crear indices
- Soft delete, crear un campo para marcar como "eliminado" un registro pero no borrarlo realmente
- Implementar indices para optimizar busquedas en caso que el proyecto crezca y tenga más registros.
- Se podrían mejorar los logs para auditorias
- Algunos endpoints se podrían paginar (ej course o content)
- Los request se podría implementar una lib que valida firma del json (joi)
- Implementar un websocket para mantener actualizadas las tablas en tiempo real en caso que el admin sea utilizado por muchas personas y tengan un gran trafico o sea critico ver los datos en tiempo real (lo nombre tambien en mejoras)
- Migrar a Vite como builder
- Sumaría test unitarios y e2e en FE y cubriría más casos y archivos en BE