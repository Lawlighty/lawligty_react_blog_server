import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop } from "@typegoose/typegoose"
import { hashSync } from 'bcryptjs'

// 默认添加  timestamps (createdAt, updatedAt)
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @ApiProperty({ description: '用户名', example: 'user1' })
  @prop()
  username: string;

  @ApiProperty({ description: '密码', example: 'pass1' })
  @prop({
    select: false, // 常规数据库查询不返回该字段
    set(val) {
      return val ? hashSync(val) : val;
    },
    get(val) {
      return val;
    },
  })
  password: string;

  @ApiProperty({ description: '推荐码', example: '' })
  @prop()
  ref_code: string;

  @ApiProperty({ description: '权限', example: 'customer' }) // customer: 普通用户, server:客服 ,admin:管理员
  @prop()
  auth: string;

  @ApiProperty({ description: '昵称', example: '' })
  @prop()
  nickname: string;

  @ApiProperty({ description: '性别', example: 0 }) // 0:男 1:女 2:保密
  @prop()
  gender: number;

  @ApiProperty({ description: '头像', example: '' })
  @prop()
  avatar: string;

  @ApiProperty({ description: '介绍', example: '' })
  @prop()
  introduc: string;

  @ApiProperty({ description: '标签', example: '' })
  @prop()
  tags: string[];

  @ApiProperty({ description: '邮箱', example: '' })
  @prop()
  email: string;

  @ApiProperty({ description: '默认字段1', example: '' })
  @prop()
  other1: string;

  @ApiProperty({ description: '默认字段2', example: '' })
  @prop()
  other2: string;
}