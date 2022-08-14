
export class ResponseDto<T> {
    rows: T[];
    totalRows: number;
    pageIndex: number;
    pageSize: number;
}