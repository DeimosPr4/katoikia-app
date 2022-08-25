import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User, UserDocument } from '../schemas/user.schema';
import { UsersService } from './users.service';
import { MongoExceptionFilter } from 'src/MongoExceptionFilter';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() user: UserDocument) {
    return this.userService.create(user);
  }

  @MessagePattern({ cmd: 'createAdminSystem' })
  @UseFilters(MongoExceptionFilter)
  createUserAdmin(@Payload() user: UserDocument) {
    return this.userService.create(user);
  }

  @MessagePattern({ cmd: 'createGuard' })
  createGuard(@Payload() user: UserDocument) {
    return this.userService.create(user);
  }

  @MessagePattern({ cmd: 'createAdminCommunity' })
  createAdminCommunity(@Payload() user: UserDocument) {
    return this.userService.createAdminCommunity(user);
  }

  @MessagePattern({ cmd: 'createTenant' })
  createTenant(@Payload() user: UserDocument) {
    return this.userService.createTenant(user);
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

  @MessagePattern({ cmd: 'findById' })
  findById(@Payload() id: string) {
    let _id = id['id'];
    return this.userService.findOne(_id);
  }

  @MessagePattern({ cmd: 'findGuardsCommunity' })
  findGuardsCommunity(@Payload() community_id: string) {
    let pcommunity_id = community_id['community_id'];
    return this.userService.findGuardsCommunity(pcommunity_id);
  }

  @MessagePattern({ cmd: 'findTenantsCommunity' })
  findTenantsCommunity(@Payload() community_id: string) {
    let pcommunity_id = community_id['community_id'];
    return this.userService.findTenantsCommunity(pcommunity_id);
  }

  @MessagePattern({ cmd: 'findTenants' })
  findTenants() {
    return this.userService.findTenants();
  }


  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload() user: UserDocument) {
    return this.userService.update(user._id, user);
  }

  @MessagePattern({ cmd: 'updateGuard' })
  updateGuard(@Payload() guard: UserDocument) {
    return this.userService.update(guard.id, guard);
  }

  @MessagePattern({ cmd: 'updateAdminCommunity' })
  updateAdminCommunity(@Payload() user: UserDocument) {
    return this.userService.update(user._id, user);
  }

  @MessagePattern({ cmd: 'removeUser' })
  remove(@Payload() id: string) {
    let dni = id['dni'];
    return this.userService.remove(dni);
  }
  @MessagePattern({ cmd: 'updateAdminSystem' })
  updateAdminSystem(@Payload() user: UserDocument) {
    return this.userService.updateAdminSystem(user._id, user);
  }
  //inicio de sesion
  @MessagePattern({ cmd: 'loginUser' })
  findLogin(@Payload() body: string) {
    let pemail = body['email'];
    let ppassword = body['password'];
    return this.userService.findLogin(pemail, ppassword);
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

  //Prueba de envio de correo despues de registro, llamando a microservicio notificaciones
  @MessagePattern({ cmd: 'testSendMail' })
  testSendMail(@Payload() user: UserDocument) {
    return this.userService.testSendMail(user);
  }

  //buscar usuario de una comunidad
  @MessagePattern({ cmd: 'findOneCommunityUser' })
  findCommunityUser(@Payload() user: any) {
    return this.userService.findCommunityUser(
      user['community_id'],
      user['user_type'],
    );
  }

  @MessagePattern({ cmd: 'deleteAdminSystem' })
  deleteAdminSystem(@Payload() user: any) {
    return this.userService.deleteAdminSystem(user['id']);
  }

  @MessagePattern({ cmd: 'deleteAdminCommunity' })
  deleteAdminCommunity(@Payload() user: any) {
    return this.userService.deleteAdminCommunity(user['id']);
  }

  @MessagePattern({ cmd: 'deleteTenant' })
  deleteTenant(@Payload() user: any) {
    let tenant_id =  user['_id'];
    return this.userService.deleteTenant(tenant_id, 
    user['community_id'], 
    user['number_house']);
  }

  @MessagePattern({ cmd: 'removeIdCommunity' })
  removeIdCommunity(@Payload() user: any) {
    let community_id =  user['community_id'];
    return this.userService.removeIdCommunity(community_id);
  }

  
  @MessagePattern({ cmd: 'changeStatus' })
  changeStatus(@Payload() body: string) {
    let pid = body['id'];
    let pstatus = body['status'];
    return this.userService.changeStatus(pid, pstatus);
  }
}
