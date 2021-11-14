import { User } from '@libs/db/models/user.model';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: User,
  routes: {
    // get
    find: {
      decorators: [ApiOperation({ summary: '查询用户列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看用户详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建用户' })],
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新用户' })],
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除用户' })],
    },
  },
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(
    @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
  ) {}
}
