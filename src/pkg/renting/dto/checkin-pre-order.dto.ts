import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CheckInPreOrderDto {
  @ApiProperty({ type: String, required: true, description: 'Id Phòng' })
  @IsNotEmpty({ message: 'Id phiếu đặt không được để trống' })
  @IsMongoId({ message: 'Id phiếu đặt phải là mongoId' })
  readonly booking: string;

  @ApiProperty({ description: 'Tổng giảm giá', type: Number, required: false, default: 0 })
  totalDiscount?: number;

  @ApiProperty({ description: 'Trị giá giảm (giảm giá theo đoàn)', type: Number, required: false, default: 0 })
  valueDiscount?: number;
}
