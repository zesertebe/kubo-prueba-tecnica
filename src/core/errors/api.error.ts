import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class Errors extends Error {
  public statusCode: StatusCode;
  public errorCode: string;
  public description: string;

  constructor(
    statusCode: StatusCode,
    errorCode: string,
    message: string,
    description: string,
  ) {
    super(message); // Mensaje que verá el usuario final
    this.statusCode = statusCode;
    this.errorCode = errorCode; // Código de error personalizado
    this.description = description; // Descripción más detallada

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Errors);
    }
  }

  toResponse() {
    return {
      status: false,
      content: {
        statusCode: this.statusCode,
        error: {
          code: this.errorCode,
          message: this.message,
        },
      },
    };
  }
}

export class ApiError {
  static async handle(
    context: Context,
    error: typeof ApiError | Error | unknown,
    logger: boolean = true,
  ) {
    if (logger) {
      // aqui se puede agregar algun sistema para manejar estos errores
      // como un logger por ejemplo. Por el tiempo de la prueba no me dio tiempo
      // para hacerlo pero está listo para integrar
    }
    if (error instanceof Errors) {
      context.status(error.statusCode as StatusCode);
      return context.json(error.toResponse());
    }
    context.status(500);
    return context.json(ApiError.errorList.INTERNAL_SERVER_ERROR.toResponse());
  }

  // Le agregué algunos errores predeterminados para tener un estandar a la hora
  // de retornar errores. Se pueden agregar mas errores si se quieren pero para
  // esta prueba técnica creo que está bien
  static errorList = {
    INVALID_REQUEST: new Errors(
      400,
      "INVALID_REQUEST",
      "Request inválido",
      "Los parámetros enviados no son correctos.",
    ),
    UNAUTHORIZED: new Errors(
      401,
      "UNAUTHORIZED",
      "No autorizado",
      "No se ha proporcionado un token válido o ha expirado.",
    ),
    EMAIL_ALREADY_EXISTS: new Errors(
      403,
      "EMAIL_ALREADY_EXISTS",
      "The email already exists",
      "Este recurso ya ha sido creado previamente",
    ),
    PHONE_ALREADY_EXISTS: new Errors(
      403,
      "PHONE_ALREADY_EXISTS",
      "The phone number already exists",
      "Este recurso ya ha sido creado previamente",
    ),
    ALREADY_EXISTS: new Errors(
      403,
      "ALREADY_EXISTS",
      "El recurso ya existe",
      "Este recurso ya ha sido creado previamente",
    ),
    FORBIDDEN: new Errors(
      403,
      "FORBIDDEN",
      "Acceso denegado",
      "No tienes permiso para acceder a este recurso.",
    ),
    NOT_FOUND: new Errors(
      404,
      "NOT_FOUND",
      "Recurso no encontrado",
      "El recurso que intentas acceder no existe.",
    ),
    USER_ERROR: new Errors(
      404,
      "USER_ERROR",
      "El usuario no existe o credenciales incorrectas",
      "Los parametros no han arrojado una busqueda exitoas",
    ),
    ENDPOINT_DISABLED: new Errors(
      418,
      "DISABLED",
      "☕ Temporalmente fuera de servicio. Intente más tarde ",
      "Endpoint temporalmente fuera de servicio",
    ),
    INTERNAL_SERVER_ERROR: new Errors(
      500,
      "INTERNAL_SERVER_ERROR",
      "Error interno del servidor",
      "Ha ocurrido un error inesperado en el servidor.",
    ),
  };
  static getErrorByCode(errorCode: string): Errors | undefined {
    return Object.values(this.errorList).find(
      (error) => error.errorCode === errorCode,
    );
  }
}
