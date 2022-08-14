import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, Min } from 'class-validator';
import { RentingDto } from './renting.dto';

export class CheckInGuestDto extends RentingDto {
  @ApiProperty({ type: Number, required: false, description: 'Id Phòng' })
  @Min(1, { message: 'Phần trăm giảm tối thiểu là 1%' })
  readonly discount: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Id User (trường hợp khách vãng lai, phải tạo tài khoản cho khách)',
  })
  @IsNotEmpty({ message: 'Id user không được để trống' })
  @IsMongoId()
  readonly userId: string;
}
