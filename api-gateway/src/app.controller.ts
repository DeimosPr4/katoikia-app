import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  //#API orderService - create order
  @Post('user/create')
  createUser(
    @Body('dni') dni: string,
    @Body('name') name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('password') password: string,
    @Body('user_type') user_type: string,
    @Body('status') status: string,
    @Body('date_entry') date_entry: Date,
  ) {
    return this.appService.createUser(dni, name, last_name, email, phone, password,
      user_type, status, date_entry);
  }


  @Get('user/all')
  allUsers() {
    return this.appService.allUsers();
  }


  @Get('user/find/:dni')
  findUser(
    @Param('dni') paramUserDNI: string
  ){
    return this.appService.findUser(paramUserDNI);
  }


// #==== API Communities
  //#API orderService - create order
  @Post('community/createCommunity')
  createCommunity(
    @Body('name') name: string,
    @Body('province') province: string,
    @Body('canton') canton: string,
    @Body('district') district: string,
    @Body('num_houses') num_houses: number,
    @Body('phone') phone: number,
    @Body('quote') quote: number,
    @Body('status') status: string,
    @Body('date_entry') date_entry: Date,
  ) {
    return this.appService.createCommunity(name, province, canton, 
      district, num_houses, phone,
      quote, status, date_entry);
  }


  @Get('community/allCommunities')
  allcommunities() {
    return this.appService.allCommunities();
  }


  @Get('community/findCommunity/:id')
  findCommunity(
    @Param('dni') paramCommunityId: string
  ){
    return this.appService.findCommunity(paramCommunityId);
  }
}