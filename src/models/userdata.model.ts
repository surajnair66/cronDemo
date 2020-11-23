import {Entity, model, property} from '@loopback/repository';

@model()
export class Userdata extends Entity {
  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  username?: string;


  constructor(data?: Partial<Userdata>) {
    super(data);
  }
}

export interface UserdataRelations {
  // describe navigational properties here
}

export type UserdataWithRelations = Userdata & UserdataRelations;
