import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, MaxLength, ValidateIf } from 'class-validator';
import { RoomStatusEnum } from '../enums/room-status.enum';

export class FindByDynamicQueryDto {
  @ApiProperty({ description: 'Hạng Phòng', type: String, required: false, readOnly: true })
  readonly roomRank?: string;

  @ApiProperty({ description: 'Trạng Thái Phòng', type: String, required: false, readOnly: true })
  // @IsEnum(RoomStatusEnum, {
  //   message: 'Trạng thái phòng [RENTING, BOOKING, EMPTY, DIRTY, REPAIRING, CLEANING, PAYMENT_OF_DATE, EXPIRED]',
  // })
  // @ValidateIf((o) => o?.roomStatus)
  readonly roomStatus?: string;

  // @ApiProperty({ description: 'Số Phòng', type: String, required: false, readOnly: true })
  // @MaxLength(6, { message: 'Số Phòng không được vượt quá 6 ký tự!' })
  // @ValidateIf((o) => o?.roomCode)
  // readonly roomCode?: string;
}
