import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResult } from '../models/ApiResult';

declare var webkitSpeechRecognition: any;

@Injectable()
export class VoiceRecognitionService  {

recognition = new webkitSpeechRecognition();
isStoppedSpeechRecog = false;
public text = '';
tempWords: any;

constructor(private http: HttpClient) { }

interpretText(): Observable<ApiResult> {
  console.log('Interpretando texto...');
  console.log(this.text);
  
  const url = 'https://localhost:7235/interpret'; // Reemplaza con la URL real de tu endpoint en C#

  const requestBody = { query: this.text }; // Objeto que contiene el texto a enviar
  
  return this.http.post(url, requestBody).pipe(
    map((response: any) => response as ApiResult)
  );
}

init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e: any) => {
        const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
        this.tempWords = transcript;
        console.log(this.tempWords);
    }); 
}

    start(){
        this.isStoppedSpeechRecog = false;
        this.recognition.start();
        console.log('Speech recognition started');
        this.recognition.addEventListener('end', (condition: any) => {
            if (this.isStoppedSpeechRecog) {
                this.recognition.stop();
                console.log('End speech recognition');
            } else {
                this.wordConcat();
                this.recognition.start();
            }
        });
        this.text = '';
    }

    stop() {
        this.isStoppedSpeechRecog = true;
        this.wordConcat();
        this.recognition.stop();
        console.log('End speech recognition');
        
    }

    wordConcat() {
        this.text = this.text + ' ' + this.tempWords + '.';
        this.tempWords = '';
    }
}
   

