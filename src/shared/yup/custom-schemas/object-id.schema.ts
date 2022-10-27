/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any  */

import { ObjectId } from 'bson';
import { MixedSchema, ValidationError } from 'yup';

export class ObjectIdSchema extends MixedSchema {
  constructor() {
    super({ type: 'objectId' });
    this.withMutation((schema) => {
      schema.transform((value) => {
        if (this.isType(value)) return value;
        throw new ValidationError(`${value} must be a valid ObjectId`);
      });
    });
  }

  _typeCheck(value: any): value is ObjectId {
    return ObjectId.isValid(value);
  }
}

export function objectId(): ObjectIdSchema {
  return new ObjectIdSchema();
}
