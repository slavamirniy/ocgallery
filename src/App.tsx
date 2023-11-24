import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './LandingPage.css';
import { useEffect, useState } from "react";

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

async function checkResourceAvailability(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function findMaxExistingImageId(): Promise<number> {
  let left = 0;
  let right = 100;
  let maxExistingId = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const imageUrl = getImageUrlById(mid).original;

    const available = await checkResourceAvailability(imageUrl);
    if (available) {
      maxExistingId = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
      console.log("ERR")
    }
  }

  return maxExistingId;
}

function getImageUrlById(id: number) {
  // if (id > 5)
  //   return { original: `https://picsum.photos/iasdd/${id}/1000/600/` }
  // return { original: `https://picsum.photos/id/${id}/1000/600/` }
  return { original: `/getocfile?file=${id}` }
}

export default function App() {
  const [images, setImages] = useState<{ original: string }[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const max = await findMaxExistingImageId();
      console.log(max)
      const imageUrls = Array.from({ length: max }, (_, i) => getImageUrlById(i));
      setImages(imageUrls);
    };

    fetchImages();
  }, []);
  return <>
    <Landing />
    <div id="gallery" className="full-screen-div">
      <ImageGallery
        items={images}
        showPlayButton={false}
        lazyLoad={true}
        onImageError={(e) => {
          console.log(e)
        }}
      />
    </div>
  </>
}