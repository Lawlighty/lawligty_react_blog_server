import { Category } from "@libs/db/models/category.model";
import { ApiProperty } from "@nestjs/swagger";
import { Ref } from "@typegoose/typegoose";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ description: '类型名称', example: '类型名称' })
  @IsNotEmpty({ message: '请填写类型名称' })
  @MaxLength(100, {
    always: true,
    message: '图片名称长度最大为$constraint1',
  })
  name!: string;

  @ApiProperty({ description: '类型排序', default: 1 })
  orderNum?: number;

  @ApiProperty({ description: '类型图标', default: 'home' })
  icon?: number;

  @ApiProperty({ description: '类型描述', default: '' })
  describe?: string;

  @ApiProperty({ description: '类型父级' })
  parentid?: Ref<Category>;
}
