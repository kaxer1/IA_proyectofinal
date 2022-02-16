import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Luxand } from '../../interface/luxand';

@Component({
  selector: 'app-dialogresultado',
  templateUrl: './dialogresultado.component.html',
  styleUrls: ['./dialogresultado.component.css']
})
export class DialogresultadoComponent implements OnInit {

  generoMaping: any = {'Female': 'Mujer', 'Male': 'Hombre', 'other': 'No reconocido'};
  
  public data: Luxand[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public luxand: any[],
    public dialogRef: MatDialogRef<DialogresultadoComponent>,
  ) { }

  ngOnInit(): void {
    const [desestructurar] = this.luxand;
    if (desestructurar != undefined) {
      const [auxiliar] = desestructurar;
      if (auxiliar != undefined) { 
        this.data.push(auxiliar);
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
