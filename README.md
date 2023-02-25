# Getting Started

## Install packages
- React Native: `yarn install`
- Backend: `cd backend && yarn install`
- Program: `cd maius-event-manage && yarn install`

## Prepare environment variables
- All current values are stored in private repo `maius-airdrop-secrets`
- Copy `.env` from `maius-airdrop-secrets/backend` to `backend` folder
- Copy `.env` from `maius-airdrop-secrets/frontend` to root folder

## Prepare for Anchor Program
- Create file `keypair.secret.json` in `keypair` folder
- Copy deploy keypair to `maius-event-manage/target/deploy`
- All current values are stored in private repo `maius-airdrop-secrets`

## Run React Native
- Install pods: `cd ios && pod install`
- Open workspace in Xcode: `open ios/MaiusEventManage.xcworkspace`
- Run project in Xcode

### Notice for build fail on XCode
- Open file `ios/MaiusAirdrop.xcodeproj/project.pbxproj`
- **Using code editor remove 2 below line**: 
```
"${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/Assets.car",
"${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/Assets.car",
```
- Run app again & **do not try pod install**

Issue reference: https://github.com/mrousavy/react-native-google-nearby-messages

***
API URL, Solana Cluster configs are in `src/Config/index.ts` file. You can change them to your own.
