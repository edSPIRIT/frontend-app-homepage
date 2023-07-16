import { Spinner } from '@edx/paragon';

const Loading = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <Spinner
      animation="border"
      className="mie-3 "
      screenReaderText="loading"
    />
  </div>
);

export default Loading;
