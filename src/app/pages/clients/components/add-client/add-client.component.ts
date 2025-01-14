import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {ContractsService} from '../../../contracts/services/contracts.service';
import {ClientsService} from '../../services/clients.service';

@Component({
  selector: 'ngx-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {

  public readonly contractsOptions$ = new BehaviorSubject([]);
  public name = '';
  public email = '';
  public domain = '';
  public phone = '';
  public selectedContract;

  constructor(
    private readonly _navigate: Router,
    private _clientService: ClientsService,
    private readonly _contractsService: ContractsService,
  ) {
    this._contractsService.getAllContracts().then(contracts => {
      this.contractsOptions$.next(contracts);
    });
  }

  onSave($event: any) {
    $event.preventDefault();
    if (this.name && this.email && this.selectedContract && this.domain && this.phone) {
      const p = {
        name: this.name,
        email: this.email,
        domain: this.domain,
        phone: this.phone,
        contracts: [this.selectedContract],
      };
      this._clientService.save(p).then(r => {
        if (r) {
          this._navigate.navigate(['pages', 'clients']);
        }
      }).catch(e => {
        console.log(e);
        alert(e.error);
      });
    }
  }

  onBack() {
    window.history.back();
  }

}
