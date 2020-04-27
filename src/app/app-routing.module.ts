import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { MenuComponent } from "./menu/menu.component";
import { AgencyComponent } from "./agency/agency.component";
import { CustomerComponent } from "./customer/customer.component";

import { AuthGuard } from "./_guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "menu",
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "agency/:agencyId",
    component: AgencyComponent,
  },
  {
    path: "agency/:agencyId/customer/:customerId",
    component: CustomerComponent,
  },
  { path: "*", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
