import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose"
import { Course } from "./course.model";

// 默认添加  timestamps (createdAt, updatedAt)
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @ApiProperty({ description: '课时名称', example: 'episode1' })
  @prop()
  name: string;

  // @ApiProperty({ description: '课时介绍', example: '课时介绍' })
  // @prop()
  // introduce: string;

  // @ApiProperty({ description: '课时正文', example: '课时正文' })
  // @prop()
  // content: string;

  @ApiProperty({ description: '自定义标签', example: '' })
  @prop()
  tags: string;

  @ApiProperty({ description: '课时文件', example: 'file1' })
  @prop()
  file: string;

  @ApiProperty({ description: '视频时长', example: '' })
  @prop()
  duration: string;

  @ApiProperty({ description: '课时文本文件', example: '' })
  @prop()
  textfile: string;

  @ApiProperty({ description: '所属课程', example: '' })
  // @IsNotEmpty({ message: '请填写所属课程' })
  @prop({ ref: 'Course' })
  course: Ref<Course>;
}