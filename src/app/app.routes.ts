import { Routes } from '@angular/router';
import {HomeScreenComponent} from "./View/home-screen/home-screen.component";
import {BabelsChoiceScreenComponent} from "./View/babels-choice-screen/babels-choice-screen.component";
import {ArticleScreenComponent} from "./View/article-screen/article-screen.component";
import {StarsComponent} from "./View/stars/stars.component";
import { ProfileComponent } from './View/profile/profile.component';
import {AuthenticationComponent} from "./View/authentication/authentication.component";
import {OfficialSelectionComponent} from "./View/official-selection/official-selection.component";
import {SandboxComponent} from "./View/sandbox/sandbox.component";
import {SubmitContentComponent} from "./View/submit-content/submit-content.component";
import { ProfileSettingsComponent } from './View/profile-settings/profile-settings.component';
import {ContactUsComponent} from "./View/contact-us/contact-us.component";
import {AboutSComponent} from "./View/about-s/about-s.component";
import {SubmissionOverviewComponent} from "./View/submission-overview/submission-overview.component";
import { FeedbackWithTextComponent } from "./View/feedback-with-text/feedback-with-text.component";
import {SearchResultsComponent} from "./View/search-results/search-results.component";
import {isUserLoggedInGuard} from "./guards/isUserLoggedIn.guard";
import {canUserEditUsers} from "./guards/canUserEditUsers.guard";
import {RolesComponent} from "./View/roles/roles.component";
import {RoleRightsComponent} from "./View/role-rights/role-rights.component";
import {canUserEditRoles} from "./guards/canUserEditRoles.guard";
import {canUserSeeSubmissions} from "./guards/canUserSeeSubmissions.guard";
import {NotificationComponent} from "./View/notifications/notification.component";
import {canUserSeeNotifications} from "./guards/canUserSeeNotifications";
import {MakePostComponent} from "./View/make-post/make-post.component";
import {canUserMakePostFromSubmissionGuard} from "./guards/canUserMakePostFromSubmission.guard";

export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path:'home', component:HomeScreenComponent},
  { path:'article', component:ArticleScreenComponent},
  { path:'babels_choice', component:BabelsChoiceScreenComponent},
  { path:'official_selection', component:OfficialSelectionComponent},
  { path:'sandbox', component:SandboxComponent},
  { path:'star', component:StarsComponent},
  { path:'profile', component:ProfileComponent},
  { path:'submit_content', component:SubmitContentComponent},
  { path:'sign-in', component:AuthenticationComponent},
  { path:'profile_settings', component:ProfileSettingsComponent, canActivate: [isUserLoggedInGuard]},
  { path:'contact-us', component:ContactUsComponent},
  { path:'about-us', component:AboutSComponent},
  { path:'submissions', component:SubmissionOverviewComponent, canActivate: [isUserLoggedInGuard, canUserSeeSubmissions]},
  { path:'feedback_with_text', component:FeedbackWithTextComponent, canActivate: [isUserLoggedInGuard]},
  { path:'roles', component:RolesComponent, canActivate: [isUserLoggedInGuard, canUserEditUsers]},
  { path:'roles_rights', component:RoleRightsComponent, canActivate: [isUserLoggedInGuard, canUserEditRoles]},
  { path:'search-results', component: SearchResultsComponent },
  { path:'notifications', component: NotificationComponent , canActivate: [isUserLoggedInGuard, canUserSeeNotifications]},
  { path:'makePost', component: MakePostComponent , canActivate: [isUserLoggedInGuard, canUserMakePostFromSubmissionGuard]},
];
