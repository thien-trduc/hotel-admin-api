import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, ValidateIf } from 'class-validator';
import { RentingDetailDto } from './renting-detail.dto';

export class RentingDto {
  @ApiProperty({ description: 'Id phiếu đặt', type: String, required: false })
  @IsMongoId({ message: 'Id phiếu đặt phải là mongoId' })
  @ValidateIf((o) => o.booking)
  booking?: string;

  @ApiProperty({ description: 'Tổng tiền', type: Number, required: true })
  @IsNotEmpty({ message: 'Tổng tiền không được để trống' })
  totalPrice: number;

  @ApiProperty({ description: 'Tổng giảm giá', type: Number, required: false, default: 0 })
  totalDiscount: number;

  @ApiProperty({ description: 'Trị giá giảm (giảm giá theo đoàn)', type: Number, required: false, default: 0 })
  valueDiscount: number;

  @ApiProperty({ description: 'Chi tiết phiếu thuê', type: RentingDetailDto, required: true })
  rentingDetail: RentingDetailDto;
}
