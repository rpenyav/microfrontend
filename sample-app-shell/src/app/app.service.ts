import { ComponentRef, Injectable, Injector, NgModuleRef } from '@angular/core';
import {
  IModuleLoadOutput,
  ModuleLoadService,
} from './shared/services/module-load.service';

export interface ICompiledModules {
  [prop: string]: {
    moduleLoadOutput: IModuleLoadOutput;
    compiledModule?: NgModuleRef<any>;
  };
}
@Injectable()
export class AppService {
  compiledModules: ICompiledModules;
  rootInjector: Injector | null;

  dynamicModulesConfig: any = {
    Feature1Module: '/ui-modules/sample-feature1/sample-feature1.umd.min.js',
    Feature2Module: '/ui-modules/sample-feature2/sample-feature2.umd.min.js',
  };
  constructor(private moduleLoadService: ModuleLoadService) {
    this.compiledModules = {} as any;
    this.rootInjector = null;
  }

  getDynamicModule(moduleName: string): Promise<boolean> {
    const self = this;
    let dynamicModuleFetchPromise: Promise<any>;
    if (this.isCompileModuleAvailable(moduleName)) {
      dynamicModuleFetchPromise = new Promise<any>((resolve) => {
        resolve(true);
      });
    } else {
      dynamicModuleFetchPromise = new Promise<any>((resolve, reject) => {
        self
          .loadDynamicModule(self.dynamicModulesConfig[moduleName], moduleName)
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            reject(true);
          });
      });
    }
    return dynamicModuleFetchPromise;
  }

  isCompileModuleAvailable(moduleName: string): any {
    return this.compiledModules && this.compiledModules[moduleName];
  }

  getCompiledComponent(
    moduleName: string,
    componentName: string
  ): Promise<ComponentRef<any>> {
    if (
      !this.compiledModules ||
      !this.compiledModules[moduleName] ||
      !this.compiledModules[moduleName].moduleLoadOutput
    ) {
      return this.loadDynamicModule(
        this.dynamicModulesConfig[moduleName],
        moduleName
      ).then(() => {
        return new Promise<ComponentRef<any>>((resolve) => {
          resolve(this.getComponentRef(moduleName, componentName));
        });
      });
    } else {
      return new Promise<ComponentRef<any>>((resolve) => {
        resolve(this.getComponentRef(moduleName, componentName));
      });
    }
  }

  private getComponentRef(
    moduleName: string,
    componentName: string
  ): ComponentRef<any> | undefined {
    let cmpRef: ComponentRef<any> | undefined;
    let moduleRef: NgModuleRef<any> | undefined;
    let moduleLoadOutput: IModuleLoadOutput;

    moduleLoadOutput = this.compiledModules[moduleName].moduleLoadOutput;
    if (!this.compiledModules[moduleName].compiledModule) {
      moduleRef = moduleLoadOutput.ngModuleFactory.create(this.rootInjector);
      this.compiledModules[moduleName].compiledModule = moduleRef;
    } else {
      moduleRef = this.compiledModules[moduleName].compiledModule;
    }
    if (moduleRef) {
      const componentFactory =
        moduleRef.componentFactoryResolver.resolveComponentFactory<any>(
          moduleLoadOutput.moduleAndComponentPkg[componentName]
        );
      if (componentFactory) {
        cmpRef = componentFactory.create(
          moduleRef.injector,
          [],
          null,
          moduleRef
        );
      }
    }
    return cmpRef;
  }

  private loadDynamicModule(
    modulePath: string,
    moduleName: string
  ): Promise<void> {
    const self = this;
    return self.moduleLoadService
      .loadModule(modulePath, moduleName)
      .then((moduleLoadOutput: IModuleLoadOutput) => {
        self.compiledModules[moduleName] = { moduleLoadOutput };
      });
  }
}
