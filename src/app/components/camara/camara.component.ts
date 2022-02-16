import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Luxand } from 'src/app/interface/luxand';
import { LuxandService } from '../../services/luxand.service';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {MatDialog} from '@angular/material/dialog';
import { DialogresultadoComponent } from '../dialogresultado/dialogresultado.component';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})
export class CamaraComponent implements OnInit {


  // varibales para activar/desactivar la cámara web
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {};
  public errors: WebcamInitError[] = [];

  // última instantánea
  public webcamImage: WebcamImage = null;

  // disparador de instantáneas de la cámara web
  private trigger: Subject<void> = new Subject<void>();
  // cambia a la camara
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  // datos resultantes del envio de la imagen
  public dataLuxand: Luxand[] = [];

  constructor(private luxand: LuxandService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

  }

  openDialog(data: any) {
    this.dialog.open(DialogresultadoComponent, {data, width: '500px'}).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  LimpiarFotos() {
    this.webcamImage = null;
    this.dataLuxand = [];
  }

  enviarFoto() {

    if (this.webcamImage === null) {
      return this.toastr.error("NO A ENVIADO NINGUAN IMAGEN");
    }
    
    this.dataLuxand = [];

    const blob =this. dataURItoBlob(this.webcamImage.imageAsDataUrl);
    let photo = new FormData();
    photo.append("photo", blob);
    
    this.luxand.postReconocimientoEdadGenero(photo).subscribe((resp: Luxand) => {
      this.dataLuxand.push(resp);
      this.openDialog(this.dataLuxand);
      this.toastr.success('Transaccion exitosa')
    }, err => {
      this.toastr.error('Error en la transaccion.')
    })
    return null;
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
