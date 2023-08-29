import {
  Compiler,
  Injectable,
  ModuleWithComponentFactories,
  NgModuleFactory,
} from '@angular/core';
import * as angularCore from '@angular/core';
import * as angularCommon from '@angular/common';
import * as angularCommonHttp from '@angular/common/http';
import * as angularCdkCollections from '@angular/cdk/collections';
import * as angularCdkTable from '@angular/cdk/table';
import * as angularCdkOverlay from '@angular/cdk/overlay';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';
import * as crossCuttingConcern from 'cross-cutting-concern';

export interface IModuleLoadOutput {
  ngModuleFactory: NgModuleFactory<any>;
  moduleAndComponentPkg: any;
}

@Injectable()
export class ModuleLoadService {
  constructor(private compiler: Compiler) {}

  loadModule(
    modulePath: string,
    moduleName: string
  ): Promise<IModuleLoadOutput> {
    return this.loadFromSystemJs(modulePath)
      .then((moduleAndComponentPkg: any) => moduleAndComponentPkg)
      .then((moduleAndComponentPkg: any) =>
        this.compile(moduleAndComponentPkg, moduleName)
      )
      .then((moduleRef: any) => moduleRef)
      .catch((e: any) => {
        console.log(e);
        throw e;
      });
  }

  private loadFromSystemJs(modulePath: string): any {
    const systemJs = (window as any).System;
    systemJs.set('app:@angular/core', angularCore);
    systemJs.set('app:@angular/common', angularCommon);
    systemJs.set('app:@angular/common/http', angularCommonHttp);
    systemJs.set('app:@angular/cdk/collections', angularCdkCollections);
    systemJs.set('app:@angular/cdk/table', angularCdkTable);
    systemJs.set('app:@angular/cdk/overlay', angularCdkOverlay);
    systemJs.set('app:rxjs', rxjs);
    systemJs.set('app:cross-cutting-concern', crossCuttingConcern);
    systemJs.set('app:rxjs/operators', rxjsOperators);
    return systemJs.import(modulePath);
  }

  private compile(
    moduleAndComponentPkg: any,
    moduleName: string
  ): Promise<IModuleLoadOutput> {
    return this.compiler
      .compileModuleAndAllComponentsAsync(moduleAndComponentPkg[moduleName])
      .then((factories: ModuleWithComponentFactories<any>) => {
        return {
          ngModuleFactory: factories.ngModuleFactory,
          moduleAndComponentPkg,
        } as IModuleLoadOutput;
      });
  }
}
