import { Icon } from '@edx/paragon';
import { WarningAmber } from '@edx/paragon/icons';

const Requirements = () => (
  <div className="requirements-wrapper mb-5" id="requirement">
    <h2 className="mb-3">Requirements</h2>
    <ul className="pl-3.5 mb-4.5">
      <li>
        <p>
          Only basic arithmetic skills are needed, we&apos;ll teach you the rest
        </p>
      </li>
      <li>
        <p>Professional Certificate in Blockchain Essentials</p>
      </li>
    </ul>
    <h3 className="mb-3">Prerequisite Courses</h3>
    <div className="attention-wrapper">
      <div className="d-flex align-items-center mb-2">
        <Icon className="mr-1" src={WarningAmber} />
        <h4>Attention!</h4>
      </div>
      <p className="font-sm">
        Lorem Ipsum er ganske enkelt fyldtekst fra print- og
        typografiindustrien. Lorem Ipsum har været standard fyldtekst siden
        1500-tallet.
      </p>
    </div>
  </div>
);

export default Requirements;
