import { ApiModelProperty } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiModelProperty({ required: false })
  readonly id?: number;

  @ApiModelProperty({ required: false })
  readonly email?: string;

  // @ApiModelProperty({ required: false })
  readonly password?: string;

  @ApiModelProperty({ required: false })
  readonly firstname?: string;

  @ApiModelProperty({ required: false })
  readonly lastname?: string;

  @ApiModelProperty({ required: false })
  readonly sex?: string;

  @ApiModelProperty({ required: false })
  readonly status?: string;
}
