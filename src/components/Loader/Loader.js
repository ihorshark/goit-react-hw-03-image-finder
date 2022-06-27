import { Oval } from 'react-loader-spinner';
import './Loader.css';

export default function Loader() {
  return (
    <div className="Loader">
      <Oval height="200" width="200" color="grey" ariaLabel="loading" />
    </div>
  );
}
