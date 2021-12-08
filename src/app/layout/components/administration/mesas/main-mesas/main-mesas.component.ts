import { Component, OnInit } from '@angular/core';
import { MesaService } from 'src/app/Services/mesa.service';

@Component({
  selector: 'app-main-mesas',
  templateUrl: './main-mesas.component.html',
  styleUrls: ['./main-mesas.component.scss']
})
export class MainMesasComponent implements OnInit {

  constructor(private Mesa: MesaService) {

   }

  ngOnInit() {

  }

}
