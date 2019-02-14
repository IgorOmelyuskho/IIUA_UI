import { VendorCompany } from 'src/app/models';
import { FormGroup } from '@angular/forms';

export default class VendorProjectHelper {
  static readonly emptyAvatar = '../../../assets/img/empty-profile.jpg';

  static maxStepsCount = 15;
  static minStepsCount = 3;

  // static removeStepsItem(id, vendorCompasny: VendorCompany, vendorCompanyForm: FormGroup) {
  //   for (let i = 0; i < vendorCompany.steps.length; i++) {
  //     if (vendorCompany.steps[i].id === id) {
  //       vendorCompany.steps.splice(i, 1);

  //       const length = vendorCompany.steps.length;
  //       if (length <= this.maxStepsCount && length >= this.minStepsCount) {
  //         vendorCompanyForm.controls['forSteps'].setErrors(null);
  //       }
  //       if (length < this.minStepsCount) {
  //         vendorCompanyForm.controls['forSteps'].setErrors({ 'minCount': true });
  //       }

  //       return;
  //     }
  //   }
  // }
}
