import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CheckOutDto {
  @ApiProperty({ type: String, required: true, description: 'Id Phiếu Thuê' })
  @IsNotEmpty({ message: 'Id phiếu thuê không được để trống' })
  @IsMongoId({ message: 'Id phiếu thuê phải là mongoId' })
  readonly rentingId: string;
}
