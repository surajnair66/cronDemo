import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {ObjectID} from 'mongodb';
import {UserdataRepository, UserRepository} from '../repositories';




// @cronJob()
// export class MyCronJob extends CronJob {
//   constructor(
//     @repository(UserRepository)
//     public userRepository: UserRepository,
//   ) {
//     super({
//       name: 'my-job',
//       onTick: () => {
//         // do the work
//         this.performMyJob();
//       },
//       cronTime: '*/10 * * * * *', // Every ten second
//       start: true,
//     });
//   }

//   async performMyJob() {
//     console.log("Working")
//   }
// }

// .bind('cron.jobs.job1').to(job).apply(asCronJob);

// const job = new CronJob({
//   cronTime: '*/1 * * * * *', // Every one second
//   onTick: () => {
//     console.log("working")
//   },
//   start: true, // Start the job immediately
// });

// // Bind the cron job as an extension for the scheduler
// app.bind('cron.jobs.job1').to(job).apply(asCronJob);



@cronJob()
export class MyCronJob extends CronJob {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(UserdataRepository) public userdataRepository: UserdataRepository,
  ) {
    super({
      name: 'my-job',
      onTick: () => {
        // do the work
        this.performMyJob();
      },
      cronTime: '*/10 * * * * *', // Every two second
      start: false,
    });
  }


  async performMyJob() {
    let pipeline = [];
    pipeline.push(
      {$match: {"_id": new ObjectID("5f02e6e2c94a6d0d38b6d618")}},
      {$project: {"firstName": 1, "lastName": 1, "email": 1, "username": 1}}
    )
    let [data] = await Promise.all([this.userRepository.collection.aggregate(pipeline).toArray()]);
    console.log(data);
  }
}
