import HMSAds, {
    HMSBanner
} from "@hmscore/react-native-hms-ads";
import React from "react";

const BannerComponent = () => (
    <HMSBanner
        style={{ height: 150, width: '100%' }} 
        bannerAdSize={HMSAds.BannerAdSizes.B_320_100} 
        adId={"testw6vs28auh3"}
        adParam={{
            adContentClassification:
                HMSAds.ContentClassification.AD_CONTENT_CLASSIFICATION_UNKNOWN,
            gender: HMSAds.Gender.UNKNOWN,
            nonPersonalizedAd: HMSAds.NonPersonalizedAd.ALLOW_ALL,
            tagForChildProtection:
                HMSAds.TagForChild.TAG_FOR_CHILD_PROTECTION_UNSPECIFIED,
            tagForUnderAgeOfPromise: HMSAds.UnderAge.PROMISE_UNSPECIFIED,
            location: {
                lat: 15,
                lng: 12
            }
        }}
        onAdLoaded={(_) => console.log("HMSBanner onAdLoaded")}
        onAdFailed={(e) => {
            console.log("HMSBanner onAdFailed", e.nativeEvent);
        }}
        onAdOpened={(_) => console.log("HMSBanner onAdOpened")}
        onAdClicked={(_) => console.log("HMSBanner onAdClicked")}
        onAdClosed={(_) => console.log("HMSBanner onAdClosed")}
        onAdImpression={(_) => console.log("HMSBanner onAdImpression")}
    />
);

export default BannerComponent;
