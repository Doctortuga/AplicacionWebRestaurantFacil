import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { UsuarioService } from '../Services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { authService } from '../Services/auth.service';
import { TransitionCheckState } from '@angular/material/checkbox';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    clientes;
    loading = false;

    constructor(private router: Router ,
        private fb: FormBuilder,
        private login: LoginService,
        private usuario: UsuarioService,
        private SnackBar: MatSnackBar,
        private auth: authService

        )  { }


    ngOnInit() {
        this.crearForm();
    }

    crearForm() {
        this.form = this.fb.group({
          rut: [null, [Validators.required, Validators.minLength(9)]],
          clave: [null, Validators.required],
        });
      }

    onLogin() {
        console.log('login');
        console.log(this.form.value);

        localStorage.setItem('isLoggedin', 'true');
        this.login.Login(this.form.value.rut, this.form.value.clave)
        .subscribe(data => {
            console.log(data);
            console.log(data.rol);
            localStorage.setItem('puede ingresar', data.PuedeIngresar);
            localStorage.setItem('Rut', data.rut);
            localStorage.setItem('Nombre', data.Nombre);


            // screen1
            if (data.rol === 4 || data.rol === 2 ) {
                this.router.navigate(['/screen1']);
                // this.router.navigate(['/dashboard']);
                // this.GetCLientes();
                this.fakeloading();

            } else {
                this.SnackBar.open('Usuario y/o contraseña incorrecta', 'Cerrar', {
                    duration: 5000

                  });

                this.form.reset();
            }

        });


    }
    GetCLientes() {
     this.usuario.GetUsuarios().subscribe(data => {
     console.log(data);
     this.clientes = data;
     console.log(this.clientes);
        });



    }
    fakeloading() {
        this.loading = true;

    setTimeout(() => {
        this.loading = false;
    }, 1500);

    }
}
