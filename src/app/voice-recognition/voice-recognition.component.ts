import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { ApiResult } from '../models/ApiResult';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';


@Component({
  selector: 'app-voice-recognition',
  templateUrl: './voice-recognition.component.html',
  styleUrls: ['./voice-recognition.component.css'],
  providers: [VoiceRecognitionService]
})

export class VoiceRecognitionComponent implements OnInit {

  text!: string;
  vuelos!: any[];

  constructor(public service:VoiceRecognitionService,private http:HttpClient) { 
      this.service.init();
  }

  ngOnInit(): void {
  }

  lugares: any[] = [];


  startVoiceRecognition() {
      this.service.start();
  }
  stopVoiceRecognition() {
    this.service.stop();
  this.service.interpretText()
    .subscribe(
      (response: ApiResult) => {
        console.log(response);
        const topIntent = response.result.prediction.topIntent;
  
          // Llamar a la función correspondiente según el valor de topIntent
          if (topIntent === 'FindRestaurant') {
            const entites = response.result.prediction.entities;
            const ciudad = entites.find(entity => entity.category === 'Location')?.text;
            const cantidad = entites.find(entity => entity.category === 'Quantity')?.text;
            const numero = cantidad ? this.convertirPalabraANumero(cantidad) : undefined;

            this.findRestaurantFunction(ciudad, numero);
          } else if (topIntent === 'FindHotel') {
            const entites = response.result.prediction.entities;
            const ciudad = entites.find(entity => entity.category === 'Location')?.text;
            const cantidad = entites.find(entity => entity.category === 'Quantity')?.text;
            const numero = cantidad ? this.convertirPalabraANumero(cantidad) : undefined;

            this.findHotelFunction(ciudad, numero);
          } else if (topIntent === 'FindSupermarket') {
            const entites = response.result.prediction.entities;
            const ciudad = entites.find(entity => entity.category === 'Location')?.text;
            const cantidad = entites.find(entity => entity.category === 'Quantity')?.text;
            const numero = cantidad ? this.convertirPalabraANumero(cantidad) : undefined;

            this.findSupermarketFunction(ciudad, numero);
          } else if (topIntent === 'FindFlight') {
            const entites = response.result.prediction.entities;
            const ciudadOrigen = entites.find(entity => entity.category === 'Origin')?.text;
            const ciudadDestino = entites.find(entity => entity.category === 'Destination')?.text;
            const flightDate = entites.find(entity => entity.category === 'Date')?.text;
            const flightNumber = entites.find(entity => entity.category === 'FlightNumber')?.text;
            console.log(ciudadOrigen);
            console.log(ciudadDestino);
            this.findFlightFunction(ciudadOrigen, ciudadDestino, flightDate, flightNumber);
          } else if (topIntent === 'SeeStatusFromFlight') {
            const entites = response.result.prediction.entities;
            const flightNumber = entites.find(entity => entity.category === 'FlightNumber')?.text;
            console.log(flightNumber);
            this.SeeStatusFromFlightFuntion(flightNumber);
          } else if (topIntent === 'BookFlight') {
            this.BookFlightFunction();
          } else {
            console.log('No se ha encontrado ninguna función para el intent: ' + topIntent);
          }
        },
          (error: any) => {
          console.log(error);
        }
      );
    }


      findRestaurantFunction(ciudad: string,numero: number | undefined) {
        if(numero === undefined){
          numero = 20;
        }
        if(numero > 0){
          console.log("entro");
          const url = `https://localhost:7235/Places/restaurantes/${ciudad}?limite=${numero}`; // Reemplaza con la URL real de tu endpoint en C#
          // Realiza la solicitud HTTP GET al backend
          this.http.get(url)
            .subscribe(
              response => {
                console.log(response);
                this.vuelos=[];
                this.lugares = response as any[];
                // Aquí puedes realizar el manejo de los datos de la respuesta del backend
              },
              error => {
                console.log(error);
                // Aquí puedes manejar el error en caso de que ocurra
              }
            );
        }else{
          const url = `https://localhost:7235/Places/restaurantes/${ciudad}`; // Reemplaza con la URL real de tu endpoint en C#
        // Realiza la solicitud HTTP GET al backend
        this.http.get(url)
          .subscribe(
            response => {
              console.log(response);
              this.vuelos=[];
              this.lugares = response as any[];
              // Aquí puedes realizar el manejo de los datos de la respuesta del backend
            },
            error => {
              console.log(error);
              // Aquí puedes manejar el error en caso de que ocurra
            }
          );
        }
      }
      findHotelFunction(ciudad: string,numero: number | undefined) {
        if(numero === undefined){
          numero = 20;
        }
        if(numero > 0){ 
        const url = `https://localhost:7235/Places/hoteles/${ciudad}?limite=${numero}`; // Reemplaza con la URL real de tu endpoint en C#
        // Realiza la solicitud HTTP GET al backend
        this.http.get(url)
          .subscribe(
            response => {
              console.log(response);
              this.vuelos=[];
              this.lugares = response as any[];
              // Aquí puedes realizar el manejo de los datos de la respuesta del backend
            },
            error => {
              console.log(error);
              // Aquí puedes manejar el error en caso de que ocurra
            }
          );
        }else{ 
        const url = `https://localhost:7235/Places/hoteles/${ciudad}`; // Reemplaza con la URL real de tu endpoint en C#
    
        // Realiza la solicitud HTTP GET al backend
        this.http.get(url)
          .subscribe(
            response => {
              console.log(response);
              this.vuelos=[];
              this.lugares = response as any[];
            },
            error => {
              console.log(error);
            }
          );
        }
      }
      findSupermarketFunction(ciudad: string,numero: number | undefined) {
        if(numero === undefined){
          numero = 20;
        }
        if(numero > 0){
          const url = `https://localhost:7235/Places/supermercados/${ciudad}?limite${numero}`; // Reemplaza con la URL real de tu endpoint en C#
          this.http.get(url)
            .subscribe(
              response => {
                console.log(response);
                this.vuelos=[];
                this.lugares = response as any[];
              },
              error => {
                console.log(error);
              }
            );
        }else{
          const url = `https://localhost:7235/Places/supermercados/${ciudad}`; // Reemplaza con la URL real de tu endpoint en C#
        // Realiza la solicitud HTTP GET al backend
        this.http.get(url)
          .subscribe(
            response => {
              console.log(response);
              this.vuelos=[];
              this.lugares = response as any[];
              // Aquí puedes realizar el manejo de los datos de la respuesta del backend
            },
            error => {
              console.log(error);
              // Aquí puedes manejar el error en caso de que ocurra
            }
          );
        }
        
      }
     findFlightFunction(origin: string | undefined, destination: string | undefined, flightNumber: string | undefined, flightDate: string | undefined) {
        let url = "https://localhost:7235/Flights";
      
        if (origin !== undefined || destination !== undefined || flightNumber !== undefined || flightDate !== undefined) {
          url += "?";
      
          if (origin !== undefined) {
            url += `departureAirport=${origin}&`;
          }
          if (destination !== undefined) {
            url += `arrivalAirport=${destination}&`;
          }
          if (flightNumber !== undefined) {
            url += `flightNumber=${flightNumber}&`;
          }
          if (flightDate !== undefined) {
            url += `flightDate=${flightDate}&`;
          }
      
          url = url.slice(0, -1); // Eliminar el último '&'
      
          this.http.get(url)
            .subscribe(
              response => {
                console.log(response);
                this.lugares=[];
                this.vuelos = response as any[];
              },
              error => {
                console.log(error);
              }
            );
        }
      }     
      SeeStatusFromFlightFuntion(FlightNumber:string|undefined) {
       if(FlightNumber === undefined){
        const url = `https://localhost:7235/Flights/`; // Reemplaza con la URL real de tu endpoint en C#
        this.http.get(url)

          .subscribe(
            response => {
              console.log(response);
              this.lugares=[];
              this.vuelos = response as any[];
            }
          );        
       }

        if(FlightNumber !== undefined){
          var flightNumber=this.eliminarEspacios(FlightNumber);
          console.log(flightNumber);
          const url = `https://localhost:7235/Flights?flightNumber=${flightNumber}`; // Reemplaza con la URL real de tu endpoint en C#
          this.http.get(url)
            .subscribe(
              response => {
                console.log(response);
                this.vuelos = response as any[];
              },
              error => {
                console.log("Vuelo no encontrado");
              }
            );
        }
      }


     BookFlightFunction() {
 
      }

      convertirPalabraANumero(palabra: string): number | undefined {
        const numeros: { [key: string]: number } = {
         
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5
        };
      
        palabra = palabra.toLowerCase();
      
        if (palabra in numeros) {
          return numeros[palabra];
        } else {
          return undefined;
        }
      }

      eliminarEspacios(flightNumber: string | undefined ): string {
        if(flightNumber!= undefined){ return flightNumber.replace(/\s/g, '');}
        else{return "";}
      }
      

      
}
  


