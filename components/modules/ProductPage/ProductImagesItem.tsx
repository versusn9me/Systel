import { IProductImagesItemProps } from '@/types/product';
import useImagePreloader from '@/hooks/useImagePreloader';
import styles from '@/styles/product/index.module.scss';

const ProductImagesItem = ({ image, imgSize }: IProductImagesItemProps) => {
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader();

  return (
    <li
      className={`${styles.product__top__images__item} ${
        imgSpinner ? styles.img_loading : ''
      }`}
    >
      <img
        src={image.url}
        alt={image.desc}
        width={imgSize}
        height={imgSize}
        className={`transition-opacity opacity-0 duration ${
          !imgSpinner ? 'opacity-100' : ''
        }`}
        onLoad={handleLoadingImageComplete}
        loading="lazy"
        style={{ width: imgSize, height: imgSize, objectFit: 'cover' }}
      />
    </li>
  );
};

export default ProductImagesItem;