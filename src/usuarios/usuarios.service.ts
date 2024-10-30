import { Injectable } from '@nestjs/common';

@Injectable()
export class usuariosService {
  async findAll() {
    return ['joao', 'felipe', '12'];
  }
}
