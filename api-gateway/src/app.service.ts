import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs/operators";


@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICIO_USUARIOS') private readonly clientUserApp: ClientProxy,
    @Inject('SERVICIO_COMUNIDADES') private readonly clientCommunityApp: ClientProxy,
  ) { }

  // ====================== USERS =============================== 

  //POST parameter from API
  createUser(dni: string, name: string, last_name: string, email: string, phone: number
    , password: string, user_type: string, status: string, date_entry: Date, community_id: string) {
    const pattern = { cmd: 'createUser' };
    const payload = {
      dni: dni, name: name, last_name: last_name, email: email, phone: phone,
      password: password, user_type: user_type, status: status, date_entry: date_entry, 
      community_id: community_id
    };
    return this.clientUserApp
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message })),
      );
  }

  //POST parameter from API
  createAdminSystem(dni: string, name: string, last_name: string, email: string, phone: number
    , password: string, user_type: string, status: string, date_entry: Date) {
    const pattern = { cmd: 'createAdminSystem' };
    const payload = {
      dni: dni, name: name, last_name: last_name, email: email, phone: phone,
      password: password, user_type: user_type, status: status, date_entry: date_entry
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
      .pipe(
        map((message: string) => ({ message })),
      );
  }

  // ====================== COMMUNITIES =============================== 

  //POST parameter from API
  createCommunity(name: string, province: string, canton: string, district: string
    , num_houses: number, phone: number, quote: number, status: string, date_entry: Date, houses: {}) {
    const pattern = { cmd: 'createCommunity' };
    const payload = {
      name: name, province: province, canton: canton, district: district, num_houses: num_houses,
      phone: phone, quote: quote, status: status, date_entry: date_entry, houses
    };
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message })),
      );
  }

  allCommunities() {
    const pattern = { cmd: 'findAllCommunities' };
    const payload = {};
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message })),
      );
  }

  //GET parameter from API
  findCommunity(paramCommunityId: string) {
    const pattern = { cmd: 'findOneCommunity' };
    const payload = { id: paramCommunityId };
    return this.clientCommunityApp
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message })),
      );
  }
}