import { ApiModelProperty } from '@nestjs/swagger';
import { UserAuthDto } from './user-auth-dto';

export class CreateUserDto extends UserAuthDto {
  @ApiModelProperty({ required: false })
  readonly firstname: string;

  @ApiModelProperty({ required: false })
  readonly lastname: string;

  @ApiModelProperty({ required: false })
  readonly sex: string;
}
