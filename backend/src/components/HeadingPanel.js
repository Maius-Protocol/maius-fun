import styles from '@/styles/Panels.module.scss'
import Image from 'next/image'

export const HeadingPanel = () => {
  return (
    <div className={`${styles.Panel} ${styles.Panel__heading}`}>
      <div
        style={{
          width: '90%',
          height: 450,
          // border: '1px solid #2b2b2b',
        }}
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://player.vimeo.com/video/804569135?h=09893ca336" width="100%" height="450" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="border-radius: 16px;" allowfullscreen></iframe>
<p></p>`,
        }}
      ></div>
      <h1 style={{ fontWeight: 'bold', fontSize: '40px' }}>
        Maius Fun - Sharing moments at your favorite events with NFTs
      </h1>
      <div className={styles.Panel__heading__buttons}>
        <a
          href="https://play.google.com/store/apps/details?id=com.megatunger.mairdrop"
          alt="Download Maius Fun on Android"
          target="_blank"
        >
          <img src="play-store-badge.svg" alt="Play Store" />
        </a>
        <a href="#" alt="Download Maius Fun on iOS" target="_blank">
          <img
            src="app-store-badge.svg"
            alt="App Store"
            className={styles['Panel__heading__buttons--disabled']}
          />
        </a>
      </div>
      <span
        style={{
          fontFamily: 'DM Sans',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '1rem',
          marginTop: -20,
        }}
      >
        *Coming soon to App Store
      </span>
      <br />
      {/*<div className={styles.Panel__heading__rating}>*/}
      {/*  <Image src="star.svg" width={16} height={16} />*/}
      {/*  <div>*/}
      {/*    <span className={styles.Panel__heading__rating__heading}>*/}
      {/*      1st Prize of Road to Grizzlython mini hackathon*/}
      {/*    </span>*/}
      {/*    <br />*/}
      {/*    <span className={styles.Panel__heading__rating__description}></span>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}
