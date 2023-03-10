import styles from '@/styles/Panels.module.scss'
import Image from 'next/image'
import Phone5 from '@/components/phone_5.png'
import React from 'react'

export const HeadingPanel = () => {
  return (
    <div
      className={`${styles.Panel} ${styles.Panel__heading}`}
      style={{ padding: 0 }}
    >
      <Image
        src={Phone5}
        height={450}
        className={styles.Card__phone}
        style={{ objectFit: 'contain' }}
      ></Image>

      <div style={{ padding: '25px' }}>
        <h1
          style={{ fontWeight: 'bold', fontSize: '40px', marginBottom: '20px' }}
        >
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
    </div>
  )
}
