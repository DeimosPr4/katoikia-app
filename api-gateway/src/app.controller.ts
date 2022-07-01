import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  //#API userService - create user
  @Post('user/createAdminSystem')
  createAdminSystem(
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
    return this.appService.createAdminSystem(dni, name, last_name, email, phone, password,
      user_type, status, date_entry);
  }

  @Post('user/createUser')
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
    @Body('community_id') community_id: string,
  ) {
    return this.appService.createUser(dni, name, last_name, email, phone, password,
      user_type, status, date_entry, community_id);
  }

  @Get('user/allUsers')
  allUsers() {
    return this.appService.allUsers();
  }

  @Get('user/find/:dni')
  findUser(
    @Param('dni') paramUserDNI: string
  ) {
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
    @Body('houses') houses: [{}],

  ) {
    return this.appService.createCommunity(name, province, canton,
      district, num_houses, phone,
      quote, status, date_entry, houses);
  }

  @Get('community/allCommunities')
  allcommunities() {
    return this.appService.allCommunities();
  }

  @Get('community/findCommunity/:id')
  findCommunity(
    @Param('id') paramCommunityId: string
  ) {
    return this.appService.findCommunity(paramCommunityId);
  }


  // #==== API Common Areas
  //#API orderService - create order
  @Post('commonArea/createCommonArea')
  createCommonArea(
    @Body('name') name: string,
    @Body('hourMin') hourMin: string,
    @Body('hourMax') hourMax: string,
    @Body('bookable') bookable: number,
    @Body('community_id') community_id: string,
  ) {

    return this.appService.createCommonArea(name, hourMin, hourMax,
      bookable, community_id);
  }


  @Get('commonArea/allCommonAreas')
  allCommonAreas() {
    return this.appService.allCommonAreas();
  }


  @Get('commonArea/findCommonArea/:id')
  findCommonArea(
    @Param('id') paramCommonAreaId: string
  ) {
    return this.appService.findCommonArea(paramCommonAreaId);
  }


  //#API userService - create user
  @Post('guest/createGuest')
  createAGuest(
    @Body('name') name: string,
    @Body('last_name') last_name: string,
    @Body('dni') dni: string,
    @Body('number_plate') number_plate: string,
    @Body('phone') phone: number,
    @Body('status') status: string,
    @Body('date_entry') date_entry: Date,
  ) {
    return this.appService.createGuest(name, last_name, dni, number_plate, phone,  status, date_entry);
  }

  @Get('guest/allGuests')
  allGuests() {
    return this.appService.allGuests();
  }

  @Get('guest/find/:dni')
  findGuest(
    @Param('dni') paramGuestDNI: string
  ) {
    return this.appService.findGuest(paramGuestDNI);
  }
}