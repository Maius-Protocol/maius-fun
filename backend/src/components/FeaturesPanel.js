import styles from '@/styles/Panels.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import Phone1 from './phone_1.png'
import Phone2 from './phone_2.png'
import Phone3 from './phone_3.png'
import Phone4 from './phone_4.png'
import React from 'react'
export const FeaturesPanel = () => {
  return (
    <div className={`${styles.Panel} ${styles.Panel__features}`}>
      <div className={`${styles.Card} ${styles['Card--no-top-padding']}`}>
        <Image src={Phone1} height={500} className={styles.Card__phone}></Image>
        <div className={styles.Card__badge}>Capture & Mint</div>
        <h3 className={styles.Card__title}>
          Joins event you loved. Capture moments. And mint FREE memorable NFTs
        </h3>
        <h4 className={styles.Card__subtitle}>
          NFT Minting is 100% free for attendees. Your host will be the fee
          payer
        </h4>
      </div>
      <div className={`${styles.Card} ${styles['Card--no-bottom-padding']}`}>
        <div className={styles.Card__badge}>
          Seamless experience with Solana Pay
        </div>
        <h3 className={styles.Card__title}>
          Maius Fun leverages Solana Pay standard. We combined multiple
          instructions & presigned that required only single-tap approve from
          users
        </h3>
        <Image src={Phone2} height={500} className={styles.Card__phone}></Image>

        {/* <div className={styles['Card__logos--text']}>
                <span>+ Zalando, Nike, Adidas, Snipes, Asos, Eastend, Footshop, Zalando, WS2</span>
            </div> */}
      </div>
      <div className={styles.Card} style={{ padding: 0 }}>
        <Image src={Phone3} height={300} className={styles.Card__phone}></Image>
        <div className={styles.Card} style={{ border: 0 }}>
          <div className={styles.Card__badge}>
            Compatible with Solana Mobile Stack
          </div>
          <h3 className={styles.Card__title}>
            Get ready for your next Saga Mobile
          </h3>
          <h4 className={styles.Card__subtitle}>
            Connect wallet, Sign transaction, everything with only a fingerprint
            tap. Seamless to the core
          </h4>
        </div>
      </div>

      <div className={styles.Card}>
        <div className={styles.Card__badge}>Share With Anyone</div>
        <h3 className={styles.Card__title}>
          Got your friends in picture? Let's share with them and mint together
          via:
        </h3>
        <h3 className={styles.Card__title}>👉 Airdrop</h3>
        <h3 className={styles.Card__title}>👉 Scan QR Code</h3>
        <h3 className={styles.Card__title}>
          👉 Nearby share with Maius Fun's Users
        </h3>
      </div>

      <div className={styles.Card} style={{ padding: 0 }}>
        <Image src={Phone4} height={800} className={styles.Card__phone}></Image>
      </div>
      <div className={styles.Card} style={{ padding: 0 }}>
        <div
          style={{
            width: '100%',
            height: 450,
            // border: '1px solid #2b2b2b',
          }}
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://player.vimeo.com/video/804569135?h=09893ca336" width="100%" height="450" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="border-radius: 16px;" allowfullscreen></iframe>
      <p></p>`,
          }}
        ></div>
      </div>
      {/*<div*/}
      {/*  className={`${styles.Card}  ${styles['Card--no-padding']}  ${styles.Card__column}`}*/}
      {/*>*/}
      {/*  <div className={`${styles.Card__row}`}>*/}
      {/*    <div className={styles.Card__row__image}>*/}
      {/*      <img src="selection.svg" />*/}
      {/*    </div>*/}
      {/*    <div className={styles.Card__row__content}>*/}
      {/*      <h3 className={styles.Card__title}>Wysoka selekcja ofert</h3>*/}
      {/*      <h4 className={styles.Card__subtitle}>*/}
      {/*        W trosce o jakość promocji w aplikacji, wszystkie produkty są*/}
      {/*        analizowane i wybierane są te najbardziej okazyjne*/}
      {/*      </h4>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    className={`${styles.Card__row} ${styles['Card__row--reverse']} $`}*/}
      {/*  >*/}
      {/*    <div className={styles.Card__row__content}>*/}
      {/*      <h3 className={styles.Card__title}>Promocje na bieżąco</h3>*/}
      {/*      <h4 className={styles.Card__subtitle}>*/}
      {/*        Wszystkie sklepy są codziennie skanowane, aby dostarczyć jak*/}
      {/*        najbardziej świeże oferty*/}
      {/*      </h4>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className={`${styles.Card__row__image} ${styles['Card__row__image--reverse']}`}*/}
      {/*    >*/}
      {/*      <img src="flash.svg"></img>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={`${styles.Card__row}`}>*/}
      {/*    <div className={styles.Card__row__image}>*/}
      {/*      <img src="globe.svg" />*/}
      {/*    </div>*/}
      {/*    /!* <img rc='discount.svg' className={styles.Card__row__image} /> *!/*/}
      {/*    <div className={styles.Card__row__content}>*/}
      {/*      <h3 className={styles.Card__title}>Streetwearowy styl</h3>*/}
      {/*      <h4 className={styles.Card__subtitle}>*/}
      {/*        W Promly znajdują się m.in. promocje odzieży w stylu*/}
      {/*        streetwearowym*/}
      {/*      </h4>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <span className={styles.Footer}>
        <Link
          href="https://github.com/Maius-Protocol/maius-fun"
          alt="Github Maius Fun"
          style={{ marginRight: 10 }}
          target="_blank"
        >
          Github
        </Link>
        <Link
          href="https://twitter.com/MaiusFun"
          alt="Twitter Maius Fun"
          target="_blank"
          style={{ marginRight: 10 }}
        >
          Twitter
        </Link>
        <br />
        <br />
        Maius Team: @tuanpmhd - @thomas.ignore - @toilahuy7
      </span>
    </div>
  )
}
