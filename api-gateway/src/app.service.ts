import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

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

  inicioSesion(pEmail: string, pPassword: string) {
    const pattern = { cmd: 'loginUser' };
    const payload = { email: pEmail, password: pPassword };
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

  // ====================== GUESTS ===============================

  //POST parameter from API
  createGuest(
    name: string,
    last_name: string,
    dni: string,
    number_plate: string,
    phone: number,
    status: string,
    date_entry: Date,
  ) {
    const pattern = { cmd: 'createGuest' };
    const payload = {
      name: name, last_name: last_name, dni: dni, number_plate: number_plate, phone: phone,
      status: status, date_entry: date_entry
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

  // ====================== PAYMENTS =============================== 

  //POST parameter from API
  createPayment(
    date_payment: Date,
    mount: number,
    description: string,
    period: string,
    status: string,
    user_id: string,
    communty_id: string,
  ) {
    const pattern = { cmd: 'createPayment' };
    const payload = {
      date_payment: date_payment, mount: mount, description: description,
      period: period, status: status, user_id: user_id, communty_id: communty_id
    };
    return this.clientPaymentApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  allPayments() {
    const pattern = { cmd: 'findAllPayments' };
    const payload = {};
    return this.clientPaymentApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  //GET parameter from API
  findPayment(paramPaymentId: string) {
    const pattern = { cmd: 'findOnePayment' };
    const payload = { id: paramPaymentId };
    return this.clientPaymentApp
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  // ====================== RESERVATIONS ===============================

  //POST parameter from API
  createReservation(start_time: string, finish_time: string, status: string,
    date_entry: Date, user_id: string, common_area_id: string) {
    const pattern = { cmd: 'createReservation' };
    const payload = {
      start_time: start_time, finish_time: finish_time, status: status,
      date_entry: date_entry, user_id: user_id, common_area_id: common_area_id
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

  allPosts() {
    const pattern = { cmd: 'findAllPosts' };
    const payload = {};
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
}
