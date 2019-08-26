import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  readonly password: string;

  @ApiModelProperty({ required: false })
  readonly firstname: string;

  @ApiModelProperty({ required: false })
  readonly lastname: string;

  @ApiModelProperty({ required: false })
  readonly sex: string;
}
