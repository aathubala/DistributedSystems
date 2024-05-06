import { Carousel } from "antd";

const CarouselView = () => (
  <Carousel autoplay effect="fade">
    <div>
      <img
        src="https://img.freepik.com/free-vector/e-learning-education-template-vector-technology-ad-banner_53876-125996.jpg?w=1060&t=st=1713853864~exp=1713854464~hmac=49738909d93423c84fcafa27fed8235f1081b85356043c2f08275e1ab38a423d"
        style={{ width: "100%", maxHeight: "500px",objectFit: "cover" }}
      />
    </div>
    <div>
      <img
        src="https://img.freepik.com/free-vector/e-learning-template-future-technology_53876-115374.jpg?w=900&t=st=1713853808~exp=1713854408~hmac=36a2672ce9d5c98adb094712eb4f0c832bf0828686f66ba68b0f4de733115250"
        style={{ width: "100%", maxHeight: "500px",objectFit: "cover" }}
      />
    </div>
    <div>
      <img
        src="https://img.freepik.com/free-photo/elevated-view-laptop-stationeries-yellow-backdrop_23-2147880496.jpg?t=st=1713853740~exp=1713857340~hmac=595b45805f28f52cce070ba84e617fb450426dacbdd9bdcb2ef3113e8321ed19&w=900"
        style={{ width: "100%", maxHeight: "500px",objectFit: "cover" }}
      />
    </div>
    <div>
      <img
        src="https://img.freepik.com/free-photo/workplace-arrangement-purple-background-with-copy-space_23-2148404536.jpg?w=900&t=st=1713853972~exp=1713854572~hmac=d62b8d43b5d982aecdcd07723ee43d8879af8689ce3c564ec4524301c0e385cc"
        style={{ width: "100%", maxHeight: "500px",objectFit: "cover" }}
      />
    </div>
  </Carousel>
);

export default CarouselView;
