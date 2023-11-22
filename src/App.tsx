import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './LandingPage.css';
import { useState } from "react";

// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//   },
// ];

const Landing = () => {
  const scrollToGallery = () => {
    const galleryElement = document.getElementById('gallery');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Преобразуйте ваши 3D модели в Unity и Unreal Engine</h1>
      <p className="landing-description">
        Откройте новые горизонты с нашими передовыми решениями для конвертации и рендеринга.
      </p>
      <div className="icon-container">
        {/* Тут можно добавить иконки для 3ds Max, Unity, Unreal Engine */}
      </div>
      <button className="gallery-button" onClick={scrollToGallery}>Посмотреть галерею работ</button>
    </div>
  );
};

function getImage(id: number) {
  return { original: `https://picsum.photos/id/${id}/1000/600/` }
}

const startSet = Array.from({ length: 10 }).map((v, i) => getImage(i + 1));

export default function App() {
  const [images, setImages] = useState(startSet);
  const [nowIndex, setIndex] = useState(0);
  const [stop, setStop] = useState(false);
  return <>
    <Landing />
    <div id="gallery" className="full-screen-div">
      <ImageGallery
        items={images}
        showPlayButton={false}
        lazyLoad={false}
        onSlide={(i) => {
          setIndex(i)
          if ((i + 2) > images.length) {
            setImages(imgs => [...imgs, ...(stop ? [] : Array.from({ length: 10 }).map((v, i) => getImage(imgs.length - 1 + i)))])
          }
        }}
        onImageError={() => {
          console.log("ERR")
          setImages(imgs => imgs.slice(0, nowIndex - 1));
          setStop(true);
        }}
      />
    </div>
  </>
}