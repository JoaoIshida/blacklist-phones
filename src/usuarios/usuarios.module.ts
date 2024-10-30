import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { usuariosService } from './usuarios.service';

@Module({
  imports: [],
  controllers: [UsuariosController],
  providers: [usuariosService],
  exports: [],
})
export class UsuariosModule {}
