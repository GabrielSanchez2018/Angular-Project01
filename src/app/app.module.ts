import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppRoutes } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { SessionGuard } from './shared/guards/session.guard';
import { RoleGuard } from './shared/guards/role-guard';
import { AutofocusModule } from 'angular-autofocus-fix';


// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartModule } from 'primeng/chart';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ObserversModule} from '@angular/cdk/observers';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {NgxPrintModule} from 'ngx-print';
//import { MatAnimatedIconComponent } from './mat-animated-icon/mat-animated-icon.component';


// Components
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { UserDeleteDialogComponent } from './dialogs/user-delete-dialog/user-delete-dialog.component';
import { SecurityQuestionDeleteDialogComponent } from './dialogs/security-question-delete-dialog/security-question-delete-dialog.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InternalServerComponent } from './pages/internal-server/internal-server.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AccountRegistrationComponent } from './pages/account-registration/account-registration.component';
import { PurchasesByServiceComponent } from './pages/purchases-by-service/purchases-by-service.component';
import { InvoiceSummaryDialogComponent } from './dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ServiceRepairComponent } from './pages/service-repair/service-repair.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { SecurityQuestionAskComponent } from './pages/security-question-ask/security-question-ask.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { ServiceCreateComponent } from './pages/service-create/service-create.component';
import { ServiceCreateDeleteDialogComponent } from './dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { ServiceCreateEditComponent } from './pages/service-create-edit/service-create-edit.component';
import { ServiceManagementComponent } from './pages/service-management/service-management.component';
import { AuthService } from './shared/guards/auth.service';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { SellComponent } from './pages/sell/sell.component';
import { AllOrdersComponent } from './pages/all-orders/all-orders.component';
import { BarcodeInfoComponent } from './pages/barcode-info/barcode-info.component';
import { SignInEmployeeeComponent } from './pages/sign-in-employeee/sign-in-employeee.component';
import { SellReportComponent } from './pages/sell-report/sell-report.component';
import { ExporterComponent } from './services/exporter/exporter.component';
import { ExporterService } from './services/exporter/exporter.service';
import { FindEmployeeComponent } from './pages/find-employee/find-employee.component';
import { PaySessionGuard } from './shared/guards/paysession';
import { BarcodeInfo01Component } from './pages/barcode-info01/barcode-info01.component';
import { RoleEmpGuard } from './shared/guards/role-emp-gurd';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { DatabaseManagementComponent } from './pages/database-management/database-management.component';
import { PrintDialogComponent } from './dialogs/print-dialog/print-dialog.component';
import { OrderVerifyComponent } from './pages/order-verify/order-verify.component';
import { PrintComponent } from './dialogs/print/print.component';
import { LeftoverProductComponent } from './pages/leftover-product/leftover-product.component';
import { LeftoverProduct01Component } from './pages/leftover-product01/leftover-product01.component';
import { EmployeeCreateComponent } from './pages/employee-create/employee-create.component';
import { OrderVerify01Component } from './pages/order-verify01/order-verify01.component';
import { TimerComponent } from './pages/timer/timer.component';
//import { TimeEditComponent } from './pages/time-edit/time-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionListComponent,
    SigninComponent,
    UserDetailsComponent,
    UserListComponent,
    SecurityQuestionDetailsComponent,
    UserDeleteDialogComponent,
    SecurityQuestionDeleteDialogComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    InternalServerComponent,
    ForgotPasswordComponent,
    AccountRegistrationComponent,
    PurchasesByServiceComponent,
    InvoiceSummaryDialogComponent,
    AdminComponent,
    ServiceRepairComponent,
    RoleCreateComponent,
    SecurityQuestionAskComponent,
    PasswordResetComponent,
    ServiceCreateComponent,
    ServiceCreateDeleteDialogComponent,
    ServiceCreateEditComponent,
    ServiceManagementComponent,
    MyOrdersComponent,
    SellComponent,
    AllOrdersComponent,
    BarcodeInfoComponent,
    SignInEmployeeeComponent,
    SellReportComponent,
    ExporterComponent,
    FindEmployeeComponent,
    BarcodeInfo01Component,
    InvoiceComponent,
    DatabaseManagementComponent,
    PrintDialogComponent,
    OrderVerifyComponent,
    PrintComponent,
    LeftoverProductComponent,
    LeftoverProduct01Component,
   EmployeeCreateComponent,
   OrderVerify01Component,
   TimerComponent,
  // TimeEditComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'}),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    MatStepperModule,
    MatGridListModule,
    ChartModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule,
    ObserversModule,
    MatTabsModule,
    MatPaginatorModule,
    AutofocusModule,
    MatBadgeModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPrintModule,
    //MatAnimatedIconComponent


  ],
  entryComponents: [
    SecurityQuestionDeleteDialogComponent,
    UserDeleteDialogComponent,
    InvoiceSummaryDialogComponent,
    ServiceCreateDeleteDialogComponent

  ],
  providers: [
    CookieService,
    SessionGuard,
    RoleGuard,
    AuthService,
    ExporterService,
    PaySessionGuard,
    RoleEmpGuard,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
