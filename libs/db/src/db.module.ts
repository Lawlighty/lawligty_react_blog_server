import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule} from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';
import { Category } from './models/category.model';
import { Banner } from './models/banner.model';

const models = TypegooseModule.forFeature([
  User,
  Course,
  Episode,
  Category,
  Banner,
])

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
          // useFindAndModify: false,
          // useCreateIndex: true,
        };
      },
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
