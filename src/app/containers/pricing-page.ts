import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Group Page's responsibility is to map router params
 * to a 'Select' group action. Actually showing the selected
 * group remains a responsibility of the
 * SelectedGroupPageComponent
 */
@Component({
  selector: 'bc-pricing-page',
  template: `
      <md-card>
        <md-card-title>Pricing</md-card-title>
        <md-card-content>
          <p>Here's how much this thing costs, yo!</p>
        </md-card-content>
      </md-card>
  `
})
export class PricingPageComponent {
}
