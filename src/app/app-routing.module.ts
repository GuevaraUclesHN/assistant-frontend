import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { VoiceRecognitionComponent } from './voice-recognition/voice-recognition.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'calendario', component: CalendarioComponent},
  {path: 'voice', component: VoiceRecognitionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
