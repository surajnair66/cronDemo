import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
//import {ObjectID} from 'mongodb';
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
    let data = await this.userRepository.findById("5f910d401c91591a433a2d14", {fields: {firstName: true, lastName: true, email: true, username: true}});
    console.log(data);
    await this.userdataRepository.create(data);
    return (data);
  }
}
