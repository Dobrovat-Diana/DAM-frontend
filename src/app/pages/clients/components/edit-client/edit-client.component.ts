import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractsService} from '../../../contracts/services/contracts.service';
import {ClientsService} from '../../services/clients.service';

@Component({
  selector: 'ngx-add-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {

  public readonly contractsOptions$ = new BehaviorSubject([]);
  public id;
  public name = '';
  public email = '';
  public domain = '';
  public phone = '';
  public selectedContract;

  constructor(
    private readonly _navigate: Router,
    private readonly activeRoute: ActivatedRoute,
    private _clientService: ClientsService,
    private readonly _contractsService: ContractsService,
  ) {
    this._contractsService.getAllContracts().then(contracts => {
      this.contractsOptions$.next(contracts);
    });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.id = +params['id'];
      this._clientService.getClient(this.id).then(client => {
        const contracts = this.contractsOptions$.value;
        this.id = client.id;
        this.name = client.name;
        this.email = client.email;
        this.domain = client.domain;
        this.phone = client.phone;
        this.selectedContract = client.contracts.length ? contracts.find(c => c.id === client?.contracts[0].id) : null;
      }).catch(error => {

        console.error(error);
      });
    });
  }

  onSave($event: any) {
    $event.preventDefault();
    if (this.name && this.email && this.selectedContract && this.domain && this.phone) {
      const p = {
        id: this.id,
        name: this.name,
        email: this.email,
        domain: this.domain,
        phone: this.phone,
        contracts: [this.selectedContract],
      };
      this._clientService.edit(this.id, p).then(r => {
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
