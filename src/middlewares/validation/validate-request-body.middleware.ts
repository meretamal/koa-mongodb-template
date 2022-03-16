import { Next } from 'koa';
import { RouterContext } from '@koa/router';
import { SchemaOf, ValidationError } from 'yup';

export function vaidateRequestBodyMiddleware<Type>(
  validationSchema: SchemaOf<Type>,
) {
  return async function validate(ctx: RouterContext, next: Next) {
    try {
      await validationSchema.validate(ctx.request.body, { abortEarly: false });
      await next();
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        message: 'Bad request',
        errors: error instanceof ValidationError && error.errors,
      };
    }
  };
}
