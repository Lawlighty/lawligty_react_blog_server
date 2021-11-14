import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { CategorysModule } from './categorys/categorys.module';
import { EpisodesModule } from './episodes/episodes.module';
import { BannersModule } from './banners/banners.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';
import { AuthModule } from './auth/auth.module';
const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: MAO({
          config: {
            region: process.env.OSS_REGION,
            accessKeyId: process.env.OSS_KEY,
            accessKeySecret: process.env.OSS_SECRET,
            bucket: process.env.OSS_BUCKET,
          },
        }),
      }),
    }),
    // DbModule, -> 在 CommonModule 中

    UsersModule,
    CoursesModule,
    CategorysModule,
    EpisodesModule,
    BannersModule,
    AuthModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
