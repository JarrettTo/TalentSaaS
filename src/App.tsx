import { AuthPage } from "@pages/auth-page";
import { AccountRoot } from "@pages/account-root";
import { Routes, Route } from "react-router-dom";
import { RosterPage } from "@pages/roster";
import { EstimatorPage } from "@pages/estimator";
import { InfluencerProfilePage } from "@pages/influencer/influencer-profile-page";
import { InfluencerCreatePage } from "@pages/influencer/influencer-create-page";
import { PrivacyPolicy } from "@pages/privacy-policy";
import { TermsOfServices } from "@pages/terms-of-services";
import { InfluencerInsightsPage } from "@pages/influencer-insights";
import { TotalInsightsPage } from "@pages/total-insights";
import {
  VerifyYoutubePage,
  VerifyInstagramPage,
  VerifyEmailPage,
  VerifyTikTokPage,
  ResetPasswordPage,
  VerifyTikTokBusinessPage,
} from "@pages/verification";
import { ShareInfluecerRoot } from "@pages/share-root";
import { InfluencerSingleInsightsPage } from "@pages/influencer-insights-single";
import { TotalInsightsShare } from "@pages/total-insights-share";
import { LandingPage } from "@pages/landing.page";
import {
  InfluencerYoutubeSingleInsights,
  InfluencerInstagramSingleInsights,
  InfluencerTikTokSingleInsights,
} from "@pages/influencer/single";
import {
  InfluencerYoutubePage,
  InfluencerInstagramPage,
  InfluencerTikTokPage,
} from "@pages/influencer/insights";
import { QuotingPage } from "@pages/quoting";
import { RatesPage } from "@pages/rates";
import { UpdateQuotePage } from "@pages/update-quote";
import { ShareQuotePage } from "@pages/share-quote";
import {
  ShareInfluencerInstagramInsightsPage,
  ShareInfluencerTikTokInsightsPage,
  ShareInfluencerYoutubeInsightsPage,
} from "@pages/share-influencer";
import { DiscoveryPage } from "@pages/discovery";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Private Routes */}
      <Route path="app" element={<AccountRoot />}>
        <Route index element={<TotalInsightsPage />} />
        <Route path="roster" element={<RosterPage />} />
        <Route path="discovery" element={<DiscoveryPage />} />
        <Route path="quoting" element={<QuotingPage />} />
        <Route path="quote/:quoteId" element={<UpdateQuotePage />} />
        
        <Route path="estimator" element={<EstimatorPage />} />
        <Route path="rates" element={<RatesPage />} />
        <Route path="create-influencer" element={<InfluencerCreatePage />} />
        <Route
          path="influencer/profile/:influencerId/"
          element={<InfluencerProfilePage />}
        />
  
        <Route
          path="influencer/insights/:influencerId/"
          element={<InfluencerInsightsPage />}
        >
          <Route index element={<InfluencerYoutubePage />} />
          <Route path="youtube" element={<InfluencerYoutubePage />} />
          <Route path="instagram" element={<InfluencerInstagramPage />} />
          <Route path="tiktok" element={<InfluencerTikTokPage />} />
        </Route>
        <Route
          path="influencer/insights/:influencerId/single/"
          element={<InfluencerSingleInsightsPage />}
        >
          <Route index element={<InfluencerYoutubeSingleInsights />} />
          <Route path="youtube" element={<InfluencerYoutubeSingleInsights />} />
          <Route path="instagram" element={<InfluencerInstagramSingleInsights />} />
          <Route path="tiktok" element={<InfluencerTikTokSingleInsights />} />
        </Route>
      </Route>
      {/* Private Routes */}

      {/* Authorization */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/confirm-email/:verificationCode" element={<VerifyEmailPage />} />
      <Route path="/reset-password/:verificationCode" element={<ResetPasswordPage />} />
      <Route path="/auth/google/*" element={<VerifyYoutubePage />} />
      <Route path="/auth/instagram/*" element={<VerifyInstagramPage />} />
      <Route path="/auth/tiktok/*" element={<VerifyTikTokPage />} />
      <Route path="/auth/business-tiktok/*" element={<VerifyTikTokBusinessPage />} />
      {/* Authorization */}

      {/* Shareable pages */}
      <Route path="/share/insights/:shareToken/" element={<TotalInsightsShare />} />
      <Route
        path="/share/influencer/:influencerIDAndToken/"
        element={<ShareInfluecerRoot />}
      >
        <Route index element={<ShareInfluencerYoutubeInsightsPage />} />
        <Route path="youtube" element={<ShareInfluencerYoutubeInsightsPage />} />
        <Route path="instagram" element={<ShareInfluencerInstagramInsightsPage />} />
        <Route path="tiktok" element={<ShareInfluencerTikTokInsightsPage />} />
      </Route>
      <Route path="/share/quote/:quoteVerificationCode" element={<ShareQuotePage />} />
      {/* Shareable pages */}

      {/* Terms and Privacy */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfServices />} />
      {/* Terms and Privacy */}

      {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
    </Routes>
  );
}

export default App;
