import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // #==== API Users
  @Post('user/createAdminSystem')
  createAdminSystem(
    @Body('dni') dni: string,
    @Body('name') name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('user_type') user_type: string,
    @Body('status') status: string,
    @Body('date_entry') date_entry: Date,
  ) {
    return this.appService.createAdminSystem(dni, name, last_name, email, phone, 
            user_type, status, date_entry);
  }

  @Post('user/createGuard')
  createGuard(
    //Nombre, Apellidos, Correo electrónico, Cédula, Teléfono, Contraseña
    @Body('dni') dni: string,
    @Body('name') name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('user_type') user_type: string,
    @Body('status') status: string,
    @Body('date_entry') date_entry: Date,
    @Body('community_id') community_id: string,
  ) {
    return this.appService.createGuard(dni, name, last_name, email, phone,
      user_type, status, date_entry,community_id);
  }

  @Post('user/createAdminCommunity')
  createAdminCommunity(
    //Nombre, Apellidos, Correo electrónico, Cédula, Teléfono, Contraseña
    @Body('dni') dni: string,
    @Body('name') name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('user_type') user_type: string,
    @Body('status') status: string,
    @Body('date_entry') date_entry: Date,
    @Body('community_id') community_id:string
  ) {
    return this.appService.createAdminCommunity(dni, name, last_name, email, phone,
      user_type, status, date_entry,community_id);
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
    return this.appService.createUser(
      dni,
      name,
      last_name,
      email,
      phone,
      password,
      user_type,
      status,
      date_entry,
      community_id,
    );
  }

  @Get('user/allUsers')
  allUsers() {
    return this.appService.allUsers();
  }

  @Post('user/loginUser')
  inicioSesion(
    @Body('email') pEmail: string,
    @Body('password') pPassword: string,
  ) {
    return this.appService.inicioSesion(pEmail, pPassword);
  }

  @Get('user/findAdminSistema')
  allUsersAdminSistema() {
    return this.appService.allUsersAdminSistema();
  }

  @Get('user/findAdminComunidad')
  allUsersAdminComunidad() {
    return this.appService.allUsersAdminComunidad();
  }

  @Get('user/findGuards/:community')
  findGuardsCommunity(@Param('community_id') community_id: string) {
    return this.appService.findGuardsCommunity(community_id);
  }

  @Get('user/findTenants/:community_id')
  allUsersTenants(@Param('community_id') paramCommunity_id: string) {
    return this.appService.findTenantsCommunity(paramCommunity_id);
  }
  
  @Get('user/find/:dni')
  findUser(@Param('dni') paramUserDNI: string) {
    return this.appService.findUser(paramUserDNI);
  }

  @Get('user/findUserById/:id')
  findUserById(@Param('id') id: string) {
    return this.appService.findUserById(id);
  }

  @Delete('user/deleteAdminSystem/:id')
  deleteAdminSystem(@Param('id') id: string) {
    return this.appService.deleteAdminSystem(id);
  }

  @Post('user/changeStatus')
  changeStatusUser(
    @Body('id') pId: string,
    @Body('status') pStatus: string,
  ) {
    return this.appService.changeStatusUser(pId, pStatus);
  }

  // #==== API Communities
  @Post('community/createCommunity')
  createCommunity(
    @Body('name') name: string,
    @Body('province') province: string,
    @Body('canton') canton: string,
    @Body('district') district: string,
    @Body('num_houses') num_houses: number,
    @Body('phone') phone: string,
    @Body('status') status: string,
    @Body('date_entry') date_entry: Date,
    @Body('houses') houses: [],
  ) {
    return this.appService.createCommunity(
      name,
      province,
      canton,
      district,
      num_houses,
      phone,
      status,
      date_entry,
      houses,
    );
  }

  @Get('community/allCommunities')
  allcommunities() {
    return this.appService.allCommunities();
  }

  @Get('community/findCommunity/:id')
  findCommunity(@Param('id') paramCommunityId: string) {
    return this.appService.findCommunity(paramCommunityId);
  }

  @Get('community/findCommunityName/:id')
  findCommunityName(@Param('id') paramCommunityId: string) {
    return this.appService.findCommunityName(paramCommunityId);
  }

  @Post('community/findCommunityAdmin')
  findCommunityAdmin(@Body('community_id') community_id: string) {
    return this.appService.findCommunityAdmin(community_id);
  }
  @Post('community/changeStatus')
  changeStatusCommunity(
    @Body('id') pId: string,
    @Body('status') pStatus: string,
  ) {
    return this.appService.changeStatusCommunity(pId, pStatus);
  }
  // #==== API Common Areas
  @Post('commonArea/createCommonArea')
  createCommonArea(
    @Body('name') name: string,
    @Body('hourMin') hourMin: string,
    @Body('hourMax') hourMax: string,
    @Body('bookable') bookable: number,
    @Body('community_id') community_id: string,
  ) {
    return this.appService.createCommonArea(
      name,
      hourMin,
      hourMax,
      bookable,
      community_id,
    );
  }

  @Get('commonArea/allCommonAreas')
  allCommonAreas() {
    return this.appService.allCommonAreas();
  }

  @Get('commonArea/findCommonArea/:id')
  findCommonArea(@Param('id') paramCommonAreaId: string) {
    return this.appService.findCommonArea(paramCommonAreaId);
  }

  @Get('commonArea/findByCommunity/:community_id')
  findByCommunity(@Param('community_id') paramCommunityId: string) {
    return this.appService.findByCommunity(paramCommunityId);
  }


  @Delete('commonArea/deleteCommonArea/:id')
  deleteCommonArea(@Param('id') id: string) {
    return this.appService.deleteCommonArea(id);
  }

  // #==== API GUEST
  //#API userService - create user
  @Post('guest/createGuest')
  createGuest(
    @Body('name') name: string,
    @Body('last_name') last_name: string,
    @Body('dni') dni: string,
    @Body('number_plate') number_plate: string,
    @Body('phone') phone: number,
    @Body('status') status: string,
    @Body('date_entry') date_entry: Date,
  ) {
    return this.appService.createGuest(
      name,
      last_name,
      dni,
      number_plate,
      phone,
      status,
      date_entry,
    );
  }

  @Get('guest/allGuests')
  allGuests() {
    return this.appService.allGuests();
  }

  @Get('guest/find/:dni')
  findGuest(@Param('dni') paramGuestDNI: string) {
    return this.appService.findGuest(paramGuestDNI);
  }

  // #==== API Payment

  @Post('payment/createPayment')
  createPayment(
    @Body('date_payment') date_payment: Date,
    @Body('mount') mount: number,
    @Body('description') description: string,
    @Body('period') period: string,
    @Body('status') status: string,
    @Body('user_id') user_id: string,
    @Body('communty_id') communty_id: string,
  ) {
    return this.appService.createPayment(
      date_payment,
      mount,
      description,
      period,
      status,
      user_id,
      communty_id,
    );
  }

  @Get('payment/allPayments')
  allPayments() {
    return this.appService.allPayments();
  }

  @Get('payment/find/:dni')
  findPayment(@Param('dni') paramPaymentDNI: string) {
    return this.appService.findPayment(paramPaymentDNI);
  }

  // #==== API Reservation

  @Post('reservation/createReservation')
  createReservation(
    @Body('start_time') start_time: string,
    @Body('finish_time') finish_time: string,
    @Body('status') status: string,
    @Body('date_entry') date_entry: Date,
    @Body('user_id') user_id: string,
    @Body('common_area_id') common_area_id: string,
  ) {
    return this.appService.createReservation(
      start_time,
      finish_time,
      status,
      date_entry,
      user_id,
      common_area_id,
    );
  }

  @Get('reservation/allReservations')
  allReservations() {
    return this.appService.allReservations();
  }

  @Get('reservation/find/:id')
  findReservation(@Param('id') paramReservation: string) {
    return this.appService.findReservation(paramReservation);
  }

  // #==== API Post

  @Post('post/createPost')
  createPost(
    @Body('post') post: string,
    @Body('date_entry') date_entry: Date,
    @Body('user_id') user_id: string,
    @Body('community_id') community_id: string,
  ) {
    return this.appService.createPost(post, date_entry, user_id, community_id);
  }

  @Get('post/allPosts')
  allPosts() {
    return this.appService.allPosts();
  }

  @Get('post/find/:id')
  findPost(@Param('id') paramPost: string) {
    return this.appService.findPost(paramPost);
  }

  // #==== API Comment

  @Post('post/createComment')
  createComment(
    @Body('comment') comment: string,
    @Body('date_entry') date_entry: Date,
    @Body('user_id') user_id: string,
    @Body('post_id') post_id: string,
  ) {
    return this.appService.createComment(comment, date_entry, user_id, post_id);
  }

  @Get('post/allComments')
  allComments() {
    return this.appService.allComments();
  }

  @Get('post/findComment/:id')
  findComment(@Param('id') paramComment: string) {
    return this.appService.findComment(paramComment);
  }

  // #==== API Report

  @Post('report/createReport')
  createReport(
    @Body('action') action: string,
    @Body('description') description: string,
    @Body('date_entry') date_entry: Date,
    @Body('user_id') user_id: string,
  ) {
    return this.appService.createReport(
      action,
      description,
      date_entry,
      user_id,
    );
  }

  @Get('report/allReports')
  allReports() {
    return this.appService.allReports();
  }

  @Get('report/find/:id')
  findReport(@Param('id') paramReport: string) {
    return this.appService.findReport(paramReport);
  }

  @Post('email/sendMail')
  senMail(@Body('email') email: string) {
    return this.appService.sendMail(email);
  }
  @Post('email/html')
  html(@Body('email') email: string, @Body('name') name: string) {
    return this.appService.html(email, name);
  }
}
