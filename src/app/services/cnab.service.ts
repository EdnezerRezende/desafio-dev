import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SnackBarComponent } from "../pages/cnab/upload/snack-bar/snack-bar.component";
import { CnabDTO } from "../models/cnab-dto";
import { HttpClient } from "@angular/common/http";
import { CnabResumoDTO } from "../models/cnab-resumo-dto";

@Injectable()
export class CnabService {
  uploadProgress:number;
  durationInSeconds = 10;

  constructor(public http: HttpClient, private snackBar: MatSnackBar){}

  buscarRegistrosCNABPorNomeLoja(nomeLoja: string):Observable<CnabDTO[]>{
    return this.http.get<CnabDTO[]>(`${environment.baseURL}/cnab/${nomeLoja}`);
  }

  buscarTodosRegistosCNAB():Observable<CnabDTO[]>{
    return this.http.get<CnabDTO[]>(`${environment.baseURL}/cnab`);
  }

  buscarTodosRegistosCNABResumo():Observable<CnabResumoDTO[]>{
    return this.http.get<CnabResumoDTO[]>(`${environment.baseURL}/cnab/consulta/cnabs/resumo`);
  }

  uploadArquivoCNAB(formData: FormData){
    return this.http.post(`${environment.baseURL}/cnab/upload`, formData, {
        reportProgress: true,
        observe: "response",
        responseType: "text"
      }).pipe(map(event => {
          // if (event.type == HttpEventType.UploadProgress) {
          //     this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          //   }
          if(this.uploadProgress == 100){
            this.snackBar.openFromComponent(SnackBarComponent, {
              duration: this.durationInSeconds * 1000,
            });
          }
      })
    )
  }
}