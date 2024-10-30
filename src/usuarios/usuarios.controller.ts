import { Controller, Get } from '@nestjs/common';
import { usuariosService } from './usuarios.service';

@Controller('/usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: usuariosService) {}
  @Get()
  async findAll() {
    const usuarios: string[] = await this.usuariosService.findAll();
    return usuarios;
  }
}
