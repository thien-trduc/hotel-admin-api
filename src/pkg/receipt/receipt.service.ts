import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RECEIPT_COLLECTION } from 'src/schemas/constant';
import { Receipt, ReceiptDocument } from 'src/schemas/receipt.schema';
import { MongoCoreService, Pagination } from 'src/utils/core/abstract.mongo';
import { ResponseDto } from 'src/utils/core/dto/response.dto';
import * as _ from 'lodash';
import { StatisticalTurnOverByDateDto } from './dto/statistical-turn-over-by-date.dto';
import * as moment from 'moment';
import { dateFormat, dateWithOutTimeFormat } from 'src/utils/utils';

@Injectable()
export class ReceiptService extends MongoCoreService<Receipt> {
    constructor(
        @InjectModel(RECEIPT_COLLECTION) private readonly receiptModel: Model<ReceiptDocument>,
    ) {
        super(receiptModel)
    }

    async findReceipts(
        pagination: Pagination,
        query: any,
        sort: any,
    ): Promise<ResponseDto<Receipt>> {
        try {
            const { pageIndex, pageSize } = pagination;
            let filter: any = {};
            let order: any = {};
            filter = !_.isEmpty(query) ? { ...filter, ...query } : filter;
            order = !_.isEmpty(sort) ? { ...order, ...sort } : { createdAt: 'desc' };
            const [rows, totalRows] = await Promise.all([
                this.model
                    .find({ ...filter })
                    .populate('employee')
                    .populate('renting')
                    .skip(pageIndex * pageSize)
                    .limit(pageSize)
                    .sort({ ...order })
                    .exec(),
                this.model.countDocuments(),
            ]);
            return {
                pageIndex,
                pageSize,
                rows,
                totalRows
            }
        } catch (error) {
            throw error;
        }
    }

    async searchReceipts(
        pagination: Pagination,
        query: any,
        sort: any
    ): Promise<ResponseDto<Receipt>> {
        try {
            const handleQuery = Object.entries(query).map(([key, value]) => {
                return { [key]: { $regex: '.*' + value + '.*' } };
            })
            const { pageIndex, pageSize } = pagination;
            let order: any = {};
            order = sort ? { ...order, ...sort } : { createdAt: 'desc' };

            const [rows, totalRows] = await Promise.all([
                this.model
                    .find(_.first(handleQuery))
                    .populate('employee')
                    .populate('renting')
                    .skip(pageIndex * pageSize)
                    .limit(pageSize)
                    .sort({ ...order })
                    .exec(),
                this.model.countDocuments(),
            ])
            return {
                pageIndex,
                pageSize,
                rows,
                totalRows
            }
        } catch (error) {
            throw error;
        }
    }

    async findReceiptById(id: string): Promise<Receipt> {
        try {
            return this.model.findById(id)
                .populate('employee')
                .populate('renting')
                .exec()
        } catch (error) {
            throw error;
        }
    }

    async statisticalTurnOverByDate(formData: StatisticalTurnOverByDateDto): Promise<any> {
        try {
            let dataDates: any = [];
            const { startDate, endDate } = formData;
            const start = moment(startDate).toDate();
            const end = moment(endDate).toDate()

            for (const d = moment(startDate); d.isBefore(endDate); d.add(1, 'days')) {
                const dataDate = {
                    name: dateWithOutTimeFormat(d.toDate()),
                    value: 0,
                };
                dataDates = [...dataDates, dataDate];
            }
            const receipts = await this.model.find({
                date: {
                    $gte: start,
                    $lt: end,
                }
            }).exec();

            console.log(receipts);
            const groupTotalPriceByDate = _.groupBy(
                receipts.map(receipt => {
                    const { date, ...data } = receipt.toObject();
                    const dateWithOutTime = dateWithOutTimeFormat(date);
                    return {
                        ...data,
                        date: dateWithOutTime,
                    };
                }),
                'date',
            );

            console.log(groupTotalPriceByDate);

            const resTotalPriceByDate = Object.entries(groupTotalPriceByDate).map(([key, value]) => {
                const total = _.reduce(value, (sum, receipt) => {
                    return sum + receipt.totalPrice;
                }, 0);
                return {
                    name: key,
                    value: total,
                };

            });
            console.log(resTotalPriceByDate);
            const merged = _.merge(_.keyBy(dataDates, 'name'), _.keyBy(resTotalPriceByDate, 'name'));
            const values = _.values(merged);
            return values;
        } catch (error) {
            throw error;
        }
    }

}
