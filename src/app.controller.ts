import { Controller, Get, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {

  @Get()
  async getHello(): Promise<any> {
    return 'Welcome to Ecommerce';
  }

  // @Get('/api-doc-json')
  // async getApiDocJson(@Res() response): Promise<any> {
  //   // const json = fs.readFileSync((`${__dirname}`.replace('dist', '')+'api-docs.json'));
  //   fs.readFile('./api-docs.json', {encoding: 'utf-8'}, function(err,data){
  //     if (!err) {
  //         console.log('received data: ' + data);
  //         response.writeHead(200, {'Content-Type': 'application/json'});
  //         response.write(data);
  //         response.end();
  //     } else {
  //         console.log(err);
  //     }
  // });
  // }
}
