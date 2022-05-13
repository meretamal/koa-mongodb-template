/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any  */

import { isValidObjectId, ObjectId } from 'mongoose';
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

  _typeCheck(_value: any): _value is ObjectId {
    return isValidObjectId(_value);
  }
}

export function objectId(): ObjectIdSchema {
  return new ObjectIdSchema();
}
