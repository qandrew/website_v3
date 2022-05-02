import { useState } from "react";
import Image from "next/image";
import imageList from "../public/images.json"

export async function getStaticProps() {
  return {
    props: {
      images: imageList.images
    }
  };
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function BlurImage({ image }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href={image.href} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>
    </a>
  );
}

function Gallery({ images }) {
  return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images.map((image) => (
            <BlurImage key={image.id} image={image} />
          ))}
        </div>
      </div>
  );
}

export default Gallery

// function Photos () {
//   return (
//     <Image
//       src='https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/273735639_1928258397336422_5724303389524210458_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=ae9488&_nc_ohc=bjF2wIixhKUAX8t-NNn&_nc_ht=scontent-sjc3-1.xx&oh=03_AVILQD0_X25gWx5jPlS52iH91-JCkVKEuiGYFIK69_9WJw&oe=6295BDBF'
//       layout="fill"
//       objectFit="cover"
//     />
//   )
// }

// export default Photos;
