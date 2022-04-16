import { Component, OnInit } from '@angular/core';
import { CnabDTO } from 'src/app/models/cnab-dto';
import { CnabResumoDTO } from 'src/app/models/cnab-resumo-dto';
import { CnabService } from 'src/app/services/cnab.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  cnabs:CnabDTO[] = [];
  cnabsResumo:CnabResumoDTO[] = [];
  valorTotal:number = 0;
  invalidEntries = 0;
  constructor(private cnabService: CnabService) { }

  ngOnInit(){
    this.cnabService.buscarTodosRegistosCNAB()
      .subscribe(retorno => {
        // this.cnabs = retorno;
        this.cnabs = retorno;
        console.log(this.cnabs);
        // this.cnabsLabels = this.cnabs.filter(c => filterByNomeLoja(c));
        console.log(this.cnabsResumo);
        // this.cnabs.forEach(cnab => {
        //   if(this.cnabsLabels.length == 0){
        //     this.cnabsLabels.push({nomeLoja: cnab.nomeLoja, representanteLoja: cnab.representanteLoja});
        //   }
        //   this.cnabsLabels.forEach(label => {
        //     if(cnab.nomeLoja !== label.nomeLoja){
        //       this.cnabsLabels.push({nomeLoja: cnab.nomeLoja, representanteLoja: cnab.representanteLoja});
        //     }

        //   });
        // }
      // );
        
    }, (error) => {
      console.log(error)
    });

  }


  calcularSaldo(nomeLoja:string){
    const cnabsFilter = this.cnabs.filter(c => c.nomeLoja == nomeLoja);
    this.valorTotal = 0;
    cnabsFilter.forEach(cnab => {
      if(cnab.tipo.sinal == '+'){
        this.valorTotal =+ cnab.valor;
      }else{
        this.valorTotal =- cnab.valor;
      }
    });
  }
}
