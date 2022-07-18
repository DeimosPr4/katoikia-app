import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User, UserDocument } from '../schemas/user.schema';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() user: UserDocument) {
    return this.userService.create(user);
  }

  @MessagePattern({ cmd: 'createAdminSystem' })
  createUserAdmin(@Payload() user: UserDocument) {
    return this.userService.create(user);
  }

  @MessagePattern({ cmd: 'findAllUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'findUserDNI' })
  findOne(@Payload() id: string) {
    let dni = id['dni'];
    return this.userService.findOneByDNI(dni);
  }
  
  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload() user: UserDocument) {
    return this.userService.update(user.id, user);
  }

  @MessagePattern({ cmd: 'removeUser' })
  remove(@Payload() id: string) {
    let dni = id['dni'];
    return this.userService.remove(dni);
  }

  //inicio de sesion
  @MessagePattern({ cmd: 'loginUser' })
  findLogin(@Payload() body:string) {
    let pemail= body['email'];
    let ppassword= body['password'];
    return this.userService.findLogin(pemail,ppassword);
  }

  //buscar solo admins del sistema
  @MessagePattern({ cmd: 'findAdminSistema' })
  allUsersAdminSistema() {
    return this.userService.allUsersAdminSistema();
  }

    //buscar solo admins de comunidad
    @MessagePattern({ cmd: 'findAdminComunidad' })
    allUsersAdminComunidad() {
      return this.userService.allUsersAdminComunidad();
    }
}
