import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { App } from './app';
import { AppModule } from './app-module';
import { serverRoutes } from './app.routes.server';
import { HttpClientModule } from '@angular/common/http'; }


@NgModule({
  declarations: [

  ],


  imports: [AppModule,HttpClientModule],
  providers: [
    
  ],
  bootstrap: [App],
})
export class AppServerModule {}
