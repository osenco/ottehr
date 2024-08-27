import { CustomContainerFactory } from 'ottehr-components';
import { IntakeFlowPageRoute } from '../../App';
import { bg1, ottehrLogo } from '../../assets';
import Footer from '../../components/Footer';

const imageForBackground = (page: string): string => {
  switch (page) {
    case IntakeFlowPageRoute.PatientPortal.path:
      return bg1;
    default:
      return bg1;
  }
};

export const CustomContainer = CustomContainerFactory(
  imageForBackground,
  ottehrLogo,
  'DermRX Telemedicine',
  <Footer />,
);
