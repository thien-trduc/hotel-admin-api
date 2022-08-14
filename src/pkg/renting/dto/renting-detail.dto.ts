import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsMongoId, IsNotEmpty } from 'class-validator';

export class RentingDetailDto {
  @ApiProperty({ type: String, required: true, description: 'Ngày Nhận Phòng' })
  @IsNotEmpty({ message: 'Ngày nhận phòng không được để trống' })
  @IsDateString()
  readonly checkInDate: string;

  @ApiProperty({ type: String, required: true, description: 'Ngày Trả Phòng' })
  @IsNotEmpty({ message: 'Ngày trả phòng không được để trống' })
  @IsDateString()
  readonly checkOutDate: string;

  @ApiProperty({ type: String, required: true, description: 'Id Phòng' })
  @IsNotEmpty({ message: 'Id phòng không được để trống' })
  @IsMongoId()
  readonly roomId: string;

  @ApiProperty({ type: String, required: true, description: 'Trạng thái thanh toán' })
  @IsNotEmpty({ message: 'Trạng thái thanh toán' })
  @IsIn([0, 1, 2, 3], { message: 'Trạng thái thanh toán phải trong [0, 1, 2, 3]' })
  // 0: Xác nhận
  // 1: Chưa xác nhận
  // 2: Quá hạn
  // 3: Đã check-in
  readonly paymentStatus: number;
}
