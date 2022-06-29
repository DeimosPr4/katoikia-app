import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs/operators";


@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICIO_USUARIOS') private readonly clientUserApp: ClientProxy,
  ) {}
  
  //POST parameter from API
  createUser(dni: string, name: string, last_name: string, email: string, phone: number
    , password: string , user_type: string, status: string, date_entry: Date){
    const pattern = { cmd: 'createUser' };
    const payload = {dni: dni, name: name, last_name: last_name, email: email, phone: phone,
    password: password, user_type: user_type, status: status, date_entry: date_entry};
    return this.clientUserApp
    .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message})),
      );
  }

  allUsers(){
    const pattern = { cmd: 'findAllUsers' };
    const payload = {};
    return this.clientUserApp
    .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message})),
      );
  }
  
}