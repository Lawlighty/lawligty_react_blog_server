import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose"
import { Category } from "./category.model";
import { Episode } from "./episode.model";

// 默认添加  timestamps (createdAt, updatedAt)
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  @ApiProperty({ description: '课程名称', example: 'course1' })
  @prop()
  name: string;

  @ApiProperty({ description: '课程封面', example: 'cover1' })
  @prop()
  cover: string;

  @ApiProperty({ description: '课程介绍', example: '' })
  @prop()
  introduce: string;

  @ApiProperty({ description: '是否推荐', example: false })
  @prop()
  recommend: boolean;

  @ApiProperty({ description: '是否置顶', example: false })
  @prop()
  stick: boolean;

  @ApiProperty({ description: '文档分类', example: '' })
  @prop({ ref: 'Category' })
  category: Ref<Category>;

  @ApiProperty({ description: '浏览量', example: 0 }) // 学习
  @prop()
  browse: number;

  @ApiProperty({ description: '子课时', example: [] })
  @prop({ ref: 'Episode' })
  episodes: Ref<Episode>[];

  @ApiProperty({ description: '自定义标签', example: '' })
  @prop()
  tags: string;
}