import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { FilterQuery, Model, Document } from 'mongoose';
import { ResponseDto } from './dto/response.dto';
import { isEmpty, first } from 'lodash';
import { plainToClass } from 'class-transformer';

export interface Pagination {
    pageIndex: number,
    pageSize: number,
}

@Injectable()
export class MongoCoreService<T> {
    private modelName: string;

    constructor(protected model: Model<T & Document>) {
        for (const modelName of Object.keys(model.collection.conn.models)) {
            if (model.collection.conn.models[modelName] === this.model) {
                this.modelName = modelName;
                break;
            }
        }
    }

    async find(
        pagination: Pagination,
        query: any,
        sort: any,
    ): Promise<ResponseDto<T>> {
        try {
            const { pageIndex, pageSize } = pagination;
            let filter: any = {};
            let order: any = {};
            filter = !isEmpty(query) ? { ...filter, ...query } : filter;
            console.log(filter)
            order = !isEmpty(sort) ? { ...order, ...sort } : { createdAt: 'desc' };
            const [rows, totalRows] = await Promise.all([
                this.model
                    .find({ ...filter })
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

    async findOne(
        conditions: any,
        projection?: Partial<Record<keyof T, boolean>>,
        options?: Record<string, unknown>,
    ): Promise<T & Document> {
        try {
            const result = await this.model.findOne(
                conditions,
                projection,
                options,
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    async create(formData: any): Promise<T & Document> {
        try {
            const newModel = new this.model({ ...formData });
            return newModel.save();
        } catch (error) {
            throw error;
        }
    }

    async updateOne(
        conditions: any,
        formData: any,
    ): Promise<T> {
        try {
            return this.model.findOneAndUpdate({ ...conditions }, {
                ...formData,
            });
        } catch (error) {
            throw error;
        }
    }

    async updateById(
        id: string,
        formData: any,
    ): Promise<T> {
        try {
            return this.model.findByIdAndUpdate(id, {
                ...formData,
            });
        } catch (error) {
            throw error;
        }
    }

    async removeOne(
        conditions: any,
    ): Promise<any> {
        try {
            return this.model.findOneAndDelete({ ...conditions });
        } catch (error) {
            throw error;
        }
    }

    async removeByConditions(
        conditions: any,
    ): Promise<any> {
        try {
            return this.model.deleteMany({ ...conditions });
        } catch (error) {
            throw error;
        }
    }

    async removeById(id: string): Promise<any> {
        try {
            return this.model.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string): Promise<T> {
        try {
            return this.model.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async search(pagination: Pagination,
        query: any,
        sort: any,): Promise<ResponseDto<T>> {
        try {
            const handleQuery = Object.entries(query).map(([key, value]) => {
                return { [key]: { $regex: '.*' + value + '.*' } };
            })
            const { pageIndex, pageSize } = pagination;
            let order: any = {};
            order = sort ? { ...order, ...sort } : { createdAt: 'desc' };

            const [rows, totalRows] = await Promise.all([
                this.model
                    .find(first(handleQuery))
                    .skip(pageIndex * pageSize)
                    .limit(pageSize)
                    .sort({ ...order })
                    .exec(),
                this.model.countDocuments(),
            ])
            console.log(rows)
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
}
