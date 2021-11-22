import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';
import { Body, Controller, Delete, Post, Put, Param } from '@nestjs/common';
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
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  @Post()
  @ApiOperation({ summary: '添加课时' })
  async addEpisodes(@Body() dto) {
    // 创建课时
    const res = await this.model.create(dto);
    // 修改课程
    const course = await this.courseModel.findById(dto.course);
    let episodeList = course?.episodes ?? [];
    episodeList.push(res._id);
    await this.courseModel.updateOne(
      { _id: dto.course },
      { $set: { episodes: episodeList } },
    );
    return res;
    // const episodeslist = await this.model.updateMany(
    //   { _id: { $in: dto.idList } },
    //   { $set: { course: dto.course_id } },
    // );
    // return { status: 200, data: episodeslist };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  async deleteEpisodes(@Param('id') id: string) {
    // 创建课时
    const res = await this.model.findByIdAndDelete(id);
    if (res._id) {
      // 修改课程
      const course = await this.courseModel.findById(res.course);
      let episodeList = course?.episodes ?? [];
      let index = episodeList.findIndex(
        (item) =>item&& item.toString() == res._id.toString(),
      );
      episodeList.splice(index, 1);
      await this.courseModel.updateOne(
        { _id: course._id },
        { $set: { episodes: episodeList } },
      );
    }
    
    return res;
  }

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
