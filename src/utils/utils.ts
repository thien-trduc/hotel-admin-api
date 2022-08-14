import * as moment from 'moment';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

export function bufferToStream(buffer): Readable {
    const readable = new Readable({
        read() {
            this.push(buffer);
            this.push(null);
        },
    });
    return readable;
};

export function myUuid(): string {
    return uuidv4().replace(/-/g, '')
}

export function currencyFormat(value: number): string {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function nowString(): string {
    return moment().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss');
}

export function nowStringFormat(): string {
    return moment().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss').replace(/-/, '');
}

export function dateFormat(date: string | Date): string {
    return moment(date).add(7, 'hours').format('YYYY-MM-DD HH:mm:ss');
}

export function dateWithOutTimeFormat(date: string | Date): string {
    return moment(date).add(7, 'hours').format('DD-MM-YYYY');
}

export function currentDate(): moment.Moment {
    return moment().add(7);
}

export function genCode(): string {
    const date = moment().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss').replace(/-/, '').replace(/:/, '').replace(' ', '');
    const randomNumber = Math.floor(Math.random()*(999-100+1)+100);
    return `${date}_${randomNumber}`
}