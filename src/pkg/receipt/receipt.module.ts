import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RECEIPT_COLLECTION } from 'src/schemas/constant';
import { ReceiptSchema } from 'src/schemas/receipt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RECEIPT_COLLECTION, schema: ReceiptSchema },
    ]),
  ],
  providers: [ReceiptService],
  exports: [ReceiptService],
  controllers: [ReceiptController]
})
export class ReceiptModule { }
