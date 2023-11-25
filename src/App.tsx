import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './LandingPage.css';
import { useEffect, useState } from "react";
import { model, oneclick, renderfin, shop } from "./images";

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
    <h1 className="landing-title" style={{textAlign:'center'}}>Как это работает?</h1>
    <div className="infos-container">
        <InfoBlock image={model} title="Ваши 3D модели" description="Мы получаем ваши 3D модели и автоматически загружаем их на веб-сайт стоковых 3D-моделей, где они будут доступны для покупки." />
        <InfoBlock image={oneclick} title="OneClick Converter" description="Мы используем OneClick Converter для преобразования 3D-моделей из формата 3ds max в форматы, подходящие для Unity и Unreal Engine. Это быстрый и качественный процесс." />
        <InfoBlock image={renderfin} title="Распределенный рендер" description="Мы используем децентрализованную систему компьютеров для рендеринга ваших 3D-моделей с высоким качеством и эффективно используем ресурсы нескольких компьютеров." />
        <InfoBlock image={shop} title="Автозагрузка на стоки" description="Ваши 3D-модели автоматически загружаются на стоки, каждая модель получит описание и галерею изображений. Мы также можем продавать рендеры отдельно как картинки на фотостоках." />
      </div>
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

function InfoBlock({ image, title, description }: { image: string, title: string, description: string }) {
  return <div className="info-block">
    <img style={{width: '120px'}} src={"data:image/png;base64, " + image} />
    <h1 className="info-block_text">{title}</h1>
    <p className="info-block_description">{description}</p>
  </div>
}