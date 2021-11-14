import { Course } from '@libs/db/models/course.model';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Course,
  routes: {
    // get
    find: {
      populate: ['category'],
      sort: '-stick  -recommend -createdAt',
      decorators: [ApiOperation({ summary: '查询课程列表' })],
    },
    // get:id
    findOne: {
      populate: ['category', 'episodes'],
      decorators: [ApiOperation({ summary: '查看课程详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建课程' })],
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新课程' })],
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除课程' })],
    },
  },
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
  ) {}
}
