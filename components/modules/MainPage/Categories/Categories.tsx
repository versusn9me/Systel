'use client';
import Link from 'next/link';
import AllLink from '@/components/elements/AllLink/AllLink';
import useImagePreloader from '@/hooks/useImagePreloader';
import { useLang } from '@/hooks/useLang';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import img1 from '@/public/img/categories-img-1.png';
import img2 from '@/public/img/categories-img-2.png';
import img3 from '@/public/img/categories-img-3.png';
import img4 from '@/public/img/categories-img-4.png';
import styles from '@/styles/main-page/index.module.scss';
import MainSlider from '../MainSlider';

const Categories = () => {
  const { lang, translations } = useLang();
  const isMedia490 = useMediaQuery(490);
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader();
  const imgSpinnerClass = imgSpinner ? styles.img_loading : '';

  const images = [
    { src: img1, id: 1, title: translations[lang].main_page.category_cloth },
    {
      src: img2,
      id: 2,
      title: translations[lang].main_page.category_accessories,
    },
    {
      src: img3,
      id: 3,
      title: translations[lang].main_page.category_souvenirs,
    },
    { src: img4, id: 4, title: translations[lang].main_page.category_office },
  ];

  return (
    <section className={styles.categories}>
      <div className={`container ${styles.categories__container}`}>
        <h2 className={`site-title ${styles.categories__title}`}>
          {translations[lang].main_page.category_title}
        </h2>
        <div className={styles.categories__inner}>
          <AllLink />
          {!isMedia490 && (
            <>
              <Link
                href="/catalog/cloth"
                className={`${styles.categories__right} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <img
                  src={img1.src}
                  alt="Cloth"
                  className={`transition-opacity opacity-0 duration ${
                    !imgSpinner ? 'opacity-100' : ''
                  }`}
                  onLoad={handleLoadingImageComplete}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span>{translations[lang].main_page.category_cloth}</span>
              </Link>
              <div className={styles.categories__left}>
                <div className={styles.categories__left__top}>
                  <Link
                    href="/catalog/accessories"
                    className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <img
                      src={img2.src}
                      alt="Accessories"
                      className={`transition-opacity opacity-0 duration ${
                        !imgSpinner ? 'opacity-100' : ''
                      }`}
                      onLoad={handleLoadingImageComplete}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      loading="lazy"
                    />
                    <span>
                      {translations[lang].main_page.category_accessories}
                    </span>
                  </Link>
                  <Link
                    href="/catalog/souvenirs"
                    className={`${styles.categories__left__top__left} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <img
                      src={img3.src}
                      alt="Souvenirs"
                      className={`transition-opacity opacity-0 duration ${
                        !imgSpinner ? 'opacity-100' : ''
                      }`}
                      onLoad={handleLoadingImageComplete}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      loading="lazy"
                    />
                    <span>
                      {translations[lang].main_page.category_souvenirs}
                    </span>
                  </Link>
                </div>
                <Link
                  href="/catalog/office"
                  className={`${styles.categories__left__bottom} ${styles.categories__img} ${imgSpinnerClass}`}
                >
                  <img
                    src={img4.src}
                    alt="Office"
                    className={`transition-opacity opacity-0 duration ${
                      !imgSpinner ? 'opacity-100' : ''
                    }`}
                    onLoad={handleLoadingImageComplete}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <span>{translations[lang].main_page.category_office}</span>
                </Link>
              </div>
            </>
          )}
          {isMedia490 && <MainSlider images={images} />}
        </div>
      </div>
    </section>
  );
};

export default Categories;