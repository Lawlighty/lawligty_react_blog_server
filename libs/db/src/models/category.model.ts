import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose"
import { IsNotEmpty } from "class-validator";

// 默认添加  timestamps (createdAt, updatedAt)
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Category {
  @ApiProperty({ description: '类型名称' })
  @IsNotEmpty({ message: '请填写类型名称' })
  @prop({ required: true })
  name: string;

  @ApiProperty({ description: '类型描述', example: '' })
  @prop()
  describe: string;

  @ApiProperty({
    description: '排序',
    example: 1,
    default: 1,
  })
  @prop()
  orderNum: number;

  @ApiProperty({ description: '图标', example: 'home', default: 'home' })
  @prop()
  icon: string;

  // @ApiProperty({ description: '对象类型' })
  // @prop({ enum: ['Course', 'Episode'] }) // 只允许
  // type: string;

  @ApiProperty({ description: '类型父级' })
  @prop({ ref: 'Category' })
  parentid?: Ref<Category>;
}