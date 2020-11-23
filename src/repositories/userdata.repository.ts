import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Userdata, UserdataRelations} from '../models';

export class UserdataRepository extends DefaultCrudRepository<
  Userdata,
  typeof Userdata.prototype._id,
  UserdataRelations
  > {
  // collection: any
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Userdata, dataSource);
    // this.collection = this.dataSource.connector!.client.db(this.dataSource.settings.database).collection(this.modelClass.name)

  }
}
