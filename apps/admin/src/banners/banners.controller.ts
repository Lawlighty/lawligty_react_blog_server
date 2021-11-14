import { Banner } from '@libs/db/models/banner.model';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';


@Crud({
  model: Banner,
  routes: {
    // get
    find: {
      decorators: [ApiOperation({ summary: '查询轮播图列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看轮播图详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建轮播图' })],
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新轮播图' })],
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除轮播图' })],
    },
  },
})
@Controller('banners')
@ApiTags('轮播图')
export class BannersController {
  constructor(
    @InjectModel(Banner)
    private readonly model: ReturnModelType<typeof Banner>,
  ) {}
}
