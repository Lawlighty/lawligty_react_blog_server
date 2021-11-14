// 轮播图
import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
  },
})
export class Banner {
  @ApiProperty({ description: '轮播图名称', example: '' })
  @IsNotEmpty({ message: '请填写轮播图名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '轮播图地址', example: '' })
  @IsNotEmpty({ message: '请填写轮播图地址' })
  @prop()
  img: string;

  @ApiProperty({ description: '轮播图类型', example: 'HOME_PAGE' })
  @prop({ enum: ['HOME_PAGE', 'AD'] }) // 首页
  type: string;

  @ApiProperty({ description: '跳转地址', example: '' })
  @prop()
  targeturl: string;
}
