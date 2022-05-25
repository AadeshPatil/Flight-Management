import { Injectable } from '@angular/core';



function _window() {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  get  getNativeWindow():any {
    return window;
  }

  constructor() { }
}
