import { Episode } from '@libs/db/models/episode.model';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Episode,
  routes: {
    // get
    find: {
      populate: ['course'],
      sort: 'createdAt',
      decorators: [ApiOperation({ summary: '查询课时列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看课时详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建课时' })],
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新课时' })],
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除课时' })],
    },
  },
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
  ) {}

  @Put('updatepisodes')
  @ApiOperation({ summary: '修改课时的课程字段' })
  async updatecourse(@Body() dto) {
    const episodeslist = await this.model.updateMany(
      { _id: { $in: dto.idList } },
      { $set: { course: dto.course_id } },
    );
    return { status: 200, data: episodeslist };
  }
}
