import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  registrarConCorreo(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  iniciarSesion(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  cerrarSesion() {
    return this.afAuth.signOut();
  }
}
