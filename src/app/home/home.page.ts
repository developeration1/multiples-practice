import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonLabel, IonButton } from '@ionic/angular/standalone';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, DatabaseReference } from 'firebase/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, CommonModule],
})
export class HomePage {
  logs: DatabaseReference; // The logs database reference.
  userInput: number = 0; // The user input number.
  numbersArray: number[] = []; // The number array used to get the range of numbers from the user input.
  multiplesOf3: number[] = []; // The numbers multiples of 3.
  multiplesOf5: number[] = []; // The numbers multiples of 5.
  multiplesOf7: number[] = []; // The numbers multiples of 7.

  constructor() {
    const firebaseConfig = { // Configuration needed to connect to the Firebase Realtime Database.
      apiKey: "AIzaSyBseBKVIS4x7_zt4XQeOTwCsohxs6n8Stc",
      authDomain: "app-developer-exercise.firebaseapp.com",
      databaseURL: "https://app-developer-exercise-default-rtdb.firebaseio.com",
      projectId: "app-developer-exercise",
      storageBucket: "app-developer-exercise.appspot.com",
      messagingSenderId: "983946637099",
      appId: "1:983946637099:web:0006d3ee654aefb3af5f6e"
    };
    
    const app = initializeApp(firebaseConfig); // Initialize Firebase.
    const db = getDatabase(app); // Refrence to the database.
    this.logs = ref(db, 'logs'); // Refrence to the database element.
  }

  generateNumbers() {
    //Every time the function is called, the arrays are reseted to not append the new values.
    this.numbersArray = [];
    this.multiplesOf3 = [];
    this.multiplesOf5 = [];
    this.multiplesOf7 = [];
    // For each number in the range of the user input, I add it to the numbers array, but also
    // depending on the multiple, I add it too to the other arrays.
    // To check if a number x is multiple of a number y, you just have to get the modulus (residual)
    // of x % y, and if it's 0, it means it's x is a multiple of y.
    for (let i = 0; i <= this.userInput; i++) {
      this.numbersArray.push(i);
      if(i > 0){
        if(i % 3 === 0){
          this.multiplesOf3.push(i)
        }
        if(i % 5 === 0){
          this.multiplesOf5.push(i)
        }
        if(i % 7 === 0){
          this.multiplesOf7.push(i)
        }
      }
    }

    // This generates the new log, adding a timestamp, the user input, the numver array as data and the
    // other arrays of each multiple.
    const log = {
      timestamp: new Date(Date.now()).toString(),
      n: this.userInput,
      data: this.numbersArray,
      multiplesOf3: this.multiplesOf3,
      multiplesOf5: this.multiplesOf5,
      multiplesOf7: this.multiplesOf7,
    };
    push(this.logs, log); // push everything to the database and create an id for it.
  }
}
