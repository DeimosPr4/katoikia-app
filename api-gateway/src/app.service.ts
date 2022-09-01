import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICIO_USUARIOS') private readonly clientUserApp: ClientProxy,
    @Inject('SERVICIO_COMUNIDADES')
    private readonly clientCommunityApp: ClientProxy,
    @Inject('SERVICIO_AREAS_COMUNES')
    private readonly clientCommonAreaApp: ClientProxy,
    @Inject('SERVICIO_INVITADOS') private readonly clientGuestApp: ClientProxy,
    @Inject('SERVICIO_PAGOS') private readonly clientPaymentApp: ClientProxy,
    @Inject('SERVICIO_RESERVACIONES')
    private readonly clientReservationApp: ClientProxy,
    @Inject('SERVICIO_POSTS') private readonly clientPostApp: ClientProxy,
    @Inject('SERVICIO_REPORTES') private readonly clientReportApp: ClientProxy,
    @Inject('SERVICIO_NOTIFICACIONES')
    private readonly clientNotificationtApp: ClientProxy,
  ) { }

  // ====================== USERS ===============================

  //POST parameter from API
  createUser(
    dni: string,
    name: string,
    last_name: string,
    email: string,
    phone: number,
    password: string,
    user_type: string,
    status: string,
    date_entry: Date,
    community_id: string,
    number_house: string,
  ) {
    const pattern = { cmd: 'createUser' };
    const payload = {
      dni: dni,
      name: name,
      last_name: last_name,
      email: email,
      phone: phone,
      password: password,
      user_type: user_type,
      status: status,
      date_entry: date_entry,
      community_id: community_id,
      number_house: number_house,
    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  createTenant(
    dni: string,
    name: string,
    last_name: string,
    email: string,
    phone: number,
    user_type: string,
    status: string,
    date_entry: Date,
    community_id: string,
    number_house: string,
  ) {
    const pattern = { cmd: 'createTenant' };
    const payload = {
      dni: dni,
      name: name,
      last_name: last_name,
      email: email,
      phone: phone,
      password: this.generatePassword(),
      user_type: user_type,
      status: status,
      date_entry: date_entry,
      community_id: community_id,
      number_house: number_house,
    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  updateUser(
    _id: string,
    dni: string,
    name: string,
    last_name: string,
    email: string,
    phone: number,
    community_id: string,
  ) {
    const pattern = { cmd: 'updateUser' };
    const payload = {
      id: _id,
      dni: dni,
      name: name,
      last_name: last_name,
      email: email,
      phone: phone,
      community_id: community_id,
    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  updateGuard(
    _id: string,
    dni: string,
    name: string,
    last_name: string,
    email: string,
    phone: number,
    password: string,
    user_type: string,
    status: string,
    date_entry: Date,
    community_id: string,
  ) {
    const pattern = { cmd: 'updateGuard' };
    const payload = {
      id: _id,
      dni: dni,
      name: name,
      last_name: last_name,
      email: email,
      phone: phone,
      password: password,
      user_type: user_type,
      status: status,
      date_entry: date_entry,
      community_id: community_id,
    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }
  updateAdminCommunity(
    id: string,
    dni: string,
    name: string,
    last_name: string,
    email: string,
    phone: number,
    community_id: string,
  ) {
    const pattern = { cmd: 'updateAdminCommunity' };
    const payload = {
      _id: id,
      dni: dni,
      name: name,
      last_name: last_name,
      email: email,
      phone: phone,
      community_id: community_id,
    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  
  async updateTenant(
    _id: string,
    dni: string,
    name: string,
    last_name: string,
    email: string,
    phone: number,
    community_id: string,
    number_house: string,
  ) {
    await this.saveTenant(community_id, number_house, _id);

    const pattern = { cmd: 'updateTenant' };
    const payload = {
      id: _id,
      dni: dni,
      name: name,
      last_name: last_name,
      email: email,
      phone: phone,
      community_id: community_id,
      number_house: number_house,
    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //POST parameter from API
  createAdminSystem(dni: string, name: string, last_name: string, email: string, phone: number
    , user_type: string, status: string, date_entry: Date) {
    const pattern = { cmd: 'createAdminSystem' };
    const payload = {
      dni: dni, name: name, last_name: last_name, email: email, phone: phone,
      password: this.generatePassword(), user_type: user_type, status: status, date_entry: date_entry
    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  createGuard(dni: string, name: string, last_name: string, email: string, phone: number
    , user_type: string, status: string, date_entry: Date, community_id: string) {
    const pattern = { cmd: 'createGuard' };
    const payload = {
      dni: dni, name: name, last_name: last_name, email: email, phone: phone,
      password: this.generatePassword(), user_type: user_type, status: status, date_entry: date_entry, community_id

    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }


  createAdminCommunity(dni: string, name: string, last_name: string, email: string, phone: number
    , user_type: string, status: string, date_entry: Date, community_id: string) {
    const pattern = { cmd: 'createAdminCommunity' };
    const payload = {
      dni: dni, name: name, last_name: last_name, email: email, phone: phone,
      password: this.generatePassword(), user_type: user_type, status: status, date_entry: date_entry, community_id

    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message })),
      );
  }

  allUsers() {
    const pattern = { cmd: 'findAllUsers' };
    const payload = {};
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  resetUserPassword(id: string, dni: string, name: string, last_name: string, email: string, phone: number
    , user_type: string, status: string, date_entry: Date, community_id: string) {
    const pattern = { cmd: 'resetUserPassword' };

    const payload = {
      id: id, dni: dni, name: name, last_name: last_name, email: email, phone: phone,
      password: this.generatePassword(), user_type: user_type, status: status, date_entry: date_entry, community_id

    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message })),
      );
  }

  allUsersAdminSistema() {
    const pattern = { cmd: 'findAdminSistema' };
    const payload = {};
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  allUsersAdminComunidad() {
    const pattern = { cmd: 'findAdminComunidad' };
    const payload = {};
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  allUsersTenants() {
    const pattern = { cmd: 'findTenants' };
    const payload = {};
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message })),
      );
  }


  //GET parameter from API
  findUser(paramUserDNI: string) {
    const pattern = { cmd: 'findUserDNI' };
    const payload = { dni: paramUserDNI };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  findGuardsCommunity(community_id: string) {
    const pattern = { cmd: 'findGuardsCommunity' };
    const payload = { community_id: community_id };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  findTenantsCommunity(community_id: string) {
    const pattern = { cmd: 'findTenantsCommunity' };
    const payload = { community_id: community_id };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  deleteAdminSystem(id: string) {
    const pattern = { cmd: 'deleteAdminSystem' };
    const payload = { id: id };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  deleteAdminCommunity(id: string) {
    const pattern = { cmd: 'deleteAdminCommunity' };
    const payload = { id: id };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  deleteTenant(id: string, community_id: string, number_house: string) {
    const pattern = { cmd: 'deleteTenant' };
    const payload = { _id: id, community_id: community_id, number_house: number_house };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  inicioSesion(pEmail: string, pPassword: string) {
    const pattern = { cmd: 'loginUser' };
    const payload = { email: pEmail, password: pPassword };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  updateAdminSystem(_id: string, dni: string, name: string,
    last_name: string, email: string, phone: number
  ) {
    const pattern = { cmd: 'updateAdminSystem' };
    const payload = {
      _id: _id, dni: dni, name: name, last_name: last_name,
      email: email, phone: phone
    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }


  //GET parameter from API
  findCommunityAdmin(community_id: string) {
    const pattern = { cmd: 'findCommunityAdmin' };
    const payload = { community_id: community_id };
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }


  //GET parameter from API
  findUserById(id: string) {
    const pattern = { cmd: 'findById' };
    const payload = { id: id };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  changeStatusUser(pId: string, pStatus: string) {
    const pattern = { cmd: 'changeStatus' };
    const payload = { id: pId, status: pStatus };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }


  changePassword(id: string, password: string) {
    const pattern = { cmd: 'changePassword' };
    const payload = { id: id, password: password };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  

  // ====================== COMMUNITIES ===============================
  changeStatusCommunity(pId: string, pStatus: string) {
    const pattern = { cmd: 'changeStatus' };
    const payload = { id: pId, status: pStatus };
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //POST parameter from API
  createCommunity(name: string, province: string, canton: string, district: string
    , num_houses: number, phone: string, status: string, date_entry: Date, houses: []) {
    const pattern = { cmd: 'createCommunity' };
    const payload = {
      name: name,
      province: province,
      canton: canton,
      district: district,
      num_houses: num_houses,
      phone: phone,
      status: status,
      date_entry: date_entry,
      houses: houses,
    };
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  updateCommunity(id: string, name: string, province: string, canton: string, district: string, num_houses: number, phone: string, status: string, date_entry: Date, houses: unknown) {
    const pattern = { cmd: 'updateCommunity' };
    const payload = {
      id: id,
      name: name,
      province: province,
      canton: canton,
      district: district,
      num_houses: num_houses,
      phone: phone,
      status: status,
      date_entry: date_entry,
      houses: houses,
    };
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  allCommunities() {
    const pattern = { cmd: 'findAllCommunities' };
    const payload = {};
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //GET parameter from API
  findCommunity(paramCommunityId: string) {
    const pattern = { cmd: 'findOneCommunity' };
    const payload = { id: paramCommunityId };
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  findCommunityName(paramCommunityId: string) {
    const pattern = { cmd: 'findCommunityName' };
    const payload = { id: paramCommunityId };
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }


  async findHousesCommunity(community_id: string) {
    const pattern = { cmd: 'findOneCommunity' }
    const payload = { _id: community_id }

    let callback = await this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(
        map((response: string) => ({ response }))
      )
    const finalValue = await lastValueFrom(callback);
    const response = finalValue['response'];
    const houses = response['houses'];

    return houses;
  }

  saveTenant(id: string, number_house: string, tenant_id: string) {
    const pattern = { cmd: 'saveTenant' };
    const payload = { _id: id, number_house: number_house, tenant_id: tenant_id };
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  deleteCommunity(id: string) {
    const pattern = { cmd: 'removeCommunity' };
    const payload = { _id: id };
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }


  // ====================== COMMON AREAS ===============================
  //POST parameter from API
  createCommonArea(
    name: string,
    hourMin: string,
    hourMax: string,
    bookable: number,
    community_id: string,
  ) {
    const pattern = { cmd: 'createCommonArea' };
    const payload = {
      name: name,
      hourMin: hourMin,
      hourMax: hourMax,
      bookable: bookable,
      community_id: community_id,
      status: '1'
    };
    return this.clientCommonAreaApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  allCommonAreas() {
    const pattern = { cmd: 'findAllCommonAreas' };
    const payload = {};
    return this.clientCommonAreaApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //GET parameter from API
  findCommonArea(paramCommonAreaId: string) {
    const pattern = { cmd: 'findOneCommonArea' };
    const payload = { id: paramCommonAreaId };
    return this.clientCommonAreaApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }


  //GET parameter from API
  findByCommunity(paramCommunityId: string) {
    const pattern = { cmd: 'findByCommunity' };
    const payload = { community_id: paramCommunityId };
    return this.clientCommonAreaApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }


  //DELETE parameter from API
  deleteCommonArea(paramCommonAreaId: string) {
    const pattern = { cmd: 'removeCommonArea' };
    const payload = { id: paramCommonAreaId };
    return this.clientCommonAreaApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  changeStatusCommonArea(pId: string, pStatus: string) {
    const pattern = { cmd: 'changeStatus' };
    const payload = { id: pId, status: pStatus };
    return this.clientCommonAreaApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  updateCommonArea(
    id: string,
    name: string,
    hourMin: string,
    hourMax: string,
    bookable: number,
    community_id: string,
  ) {
    const pattern = { cmd: 'updateCommonArea' };
    const payload = {
      id: id,
      name: name,
      hourMin: hourMin,
      hourMax: hourMax,
      bookable: bookable,
      community_id: community_id,
    };
    return this.clientCommonAreaApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }
  // ====================== GUESTS ===============================

  //POST parameter from API
  createGuest(
    name: string,
    last_name: string,
    dni: string,
    number_plate: string,
    phone: number,
    status: string,
    tenant_id: string,
    community_id: string,
    date_entry: Date,
    type_guest: string,
  ) {
    const pattern = { cmd: 'createGuest' };
    const payload = {
      name: name, last_name: last_name, dni: dni, number_plate: number_plate, phone: phone,
      status: status,tenant_id:tenant_id, community_id:community_id,date_entry: date_entry,type_guest:type_guest

    };
    return this.clientGuestApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  allGuests() {
    const pattern = { cmd: 'findAllGuests' };
    const payload = {};
    return this.clientGuestApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //GET parameter from API
  findGuest(paramGuestDNI: string) {
    const pattern = { cmd: 'findGuestDNI' };
    const payload = { dni: paramGuestDNI };
    return this.clientGuestApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }
  //GET parameter from API
  findGuestUser(paramGuestId: string) {
    const pattern = { cmd: 'findGuestUser' };
    const payload = { id: paramGuestId };
    return this.clientGuestApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  findGuestCommunityr(paramGuestId: string) {
    const pattern = { cmd: 'findGuestCommunity' };
    const payload = { id: paramGuestId };
    return this.clientGuestApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  updateGuest(_id: string
    ) {
    const pattern = { cmd: 'removeGuest' };
    const payload = {
      _id: _id
    };
    return this.clientGuestApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })))
  }
  // ====================== RESERVATIONS ===============================

  //POST parameter from API
  createReservation(date: string, time: string, status: string,
    date_entry: Date, user_id: string, common_area_id: string,
    common_area_name: string, community_id: string) {
    const pattern = { cmd: 'createReservation' };
    const payload = {
      date: date, time: time, status: status,
      date_entry: date_entry, user_id: user_id, common_area_id: common_area_id,
      common_area_name: common_area_name, community_id: community_id
    };
    return this.clientReservationApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  allReservations() {
    const pattern = { cmd: 'findAllReservations' };
    const payload = {};
    return this.clientReservationApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //GET parameter from API
  findReservation(paramReservationId: string) {
    const pattern = { cmd: 'findOneReservation' };
    const payload = { id: paramReservationId };
    return this.clientReservationApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  findReservations(community_id: string) {
    const pattern = { cmd: 'findReservationsByCommunity' };
    const payload = { community_id: community_id };
    return this.clientReservationApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //DELETE parameter from API
  deleteReservation(paramReservationId: string) {
    const pattern = { cmd: 'removeReservation' };
    const payload = { id: paramReservationId };
    return this.clientReservationApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  // ====================== POSTS ===============================

  //POST parameter from API
  createPost(post: string, date_entry: Date, user_id: string,
    community_id: string) {
    const pattern = { cmd: 'createPost' };
    const payload = {
      post: post, date_entry: date_entry, user_id: user_id,
      community_id: community_id
    };
    return this.clientPostApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  updatePost(id: string, post: string, user_id: string, community_id: string) {
    const pattern = { cmd: 'updatePost' };
    const payload = {
      post: post, id: id, user_id: user_id, community_id: community_id
    };
    return this.clientPostApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  allPosts() {
    const pattern = { cmd: 'findAllPosts' };
    const payload = {};
    return this.clientPostApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  findPostCommunity(paramGuestId: string) {
    const pattern = { cmd: 'findPostCommunity' };
    const payload = { id: paramGuestId };
    return this.clientPostApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //GET parameter from API
  findPost(paramPostId: string) {
    const pattern = { cmd: 'findOnePost' };
    const payload = { id: paramPostId };
    return this.clientPostApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //DELETE
  deletePost(paramPostId: string) {
    const pattern = { cmd: 'removePost' };
    const payload = { id: paramPostId };
    return this.clientPostApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  // ====================== COMMNENT POSTS ===============================

  //Comment parameter from API
  createComment(comment: string, date_entry: Date, user_id: string,
    post_id: string) {
    const pattern = { cmd: 'createComment' };
    const payload = {
      comment: comment, date_entry: date_entry, user_id: user_id,
      post_id: post_id
    };
    return this.clientPostApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  allComments() {
    const pattern = { cmd: 'findAllComments' };
    const payload = {};
    return this.clientPostApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //GET parameter from API
  findComment(paramCommentId: string) {
    const pattern = { cmd: 'findOneComment' };
    const payload = { id: paramCommentId };
    return this.clientPostApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  // ====================== REPORTS ===============================

  //Report parameter from API
  createReport(action: string, description: string, date_entry: Date,
    user_id: string) {
    const pattern = { cmd: 'createReport' };
    const payload = {
      action: action, description: description, date_entry: date_entry,
      user_id: user_id
    };
    return this.clientReportApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  allReports() {
    const pattern = { cmd: 'findAllReports' };
    const payload = {};
    return this.clientReportApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //GET parameter from API
  findReport(paramReportId: string) {
    const pattern = { cmd: 'findOneReport' };
    const payload = { id: paramReportId };
    return this.clientReportApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  sendMail(email: string) {
    const pattern = { cmd: 'sendMail' };
    const payload = { email: email };
    return this.clientNotificationtApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  html(email: string, name: string) {
    const pattern = { cmd: 'html' };
    const payload = { email: email, name: name };
    return this.clientNotificationtApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  /* Function to generate combination of password */
  generatePassword() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random()
        * str.length + 1);

      pass += str.charAt(char)
    }

    return pass;
  }

  async saveTenantNumHouse(community_id: string, number_house: string, tenant_id: string) {

    const pattern = { cmd: 'saveTenantNumHouse' }
    const payload = { _id: community_id, number_house: number_house, tenant_id: tenant_id }

    return await this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(
        map((response: string) => ({ response }))
      )
  }


  findReservationUser(paramGuestId: string) {
    const pattern = { cmd: 'findReservationUser' };
    const payload = { id: paramGuestId };
    return this.clientReservationApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

}
