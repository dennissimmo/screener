import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TokenComponent } from "./components/token/token.component";
import { authGuard } from "./guards/auth.guard";

export const ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'token', component: TokenComponent},
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {}