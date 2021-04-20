import {CONFIG_OPTIONS} from './../common/common.constants';
import {JwtService} from './jwt.service';
import {JwtModuleOptions} from './jwt.interfaces';
import {Module, DynamicModule, Global} from '@nestjs/common';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
    };
  }
}
