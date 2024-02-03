import { TypographyStylesProvider } from "@mantine/core";

export const TermsOfServices = () => {
  return (
    <TypographyStylesProvider className="bg-white">
      <div className="container py-20">
        <h1>Terms of Service for Jnr by Neuralle Pty Ltd</h1>
        <p>Last Updated: 24/08/2023</p>
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using the Jnr web application ("App") provided by
          Neuralle Pty Ltd ("Neuralle," "we," "us," or "our"), you agree to
          comply with and be bound by these Terms of Service ("Terms"). If you
          do not agree to these Terms, please do not use the App.
        </p>
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to change, modify, or revise these Terms at any
          time. Any changes will be effective immediately upon posting, and you
          waive any right you may have to receive specific notice of such
          changes. We will notify our registered users of any changes by email.
          Your continued use of this App will confirm your acceptance of the
          revised Terms.
        </p>
        <h2>Use of the App</h2>
        <h3>Eligibility</h3>
        <p>
          This App is intended solely for users who are Neuralle employees or
          affiliates authorized by Neuralle. Unauthorized access to the App is
          prohibited.
        </p>
        <h3>Your Responsibilities</h3>
        <p>
          You are responsible for maintaining the confidentiality of your login
          credentials. Any unauthorized use of your account will be your
          responsibility until you notify us at talent@neuralle.com.
        </p>
        <h3>Third-Party Services</h3>
        <p>
          Our App interfaces with various third-party platforms including
          TikTok, Instagram, and YouTube via APIs. By using our App, you
          authorize us to access and use your data from these platforms in
          accordance with their respective terms of service and privacy
          policies.
        </p>
        <h3>Intellectual Property</h3>
        <p>
          All intellectual property rights in the App are owned by Neuralle. You
          are granted a limited, non-exclusive, revocable license to access and
          use the App in accordance with these Terms.
        </p>
        <h3>Data Retention and Termination</h3>
        <p>
          Data collected through the App is deleted upon archiving. We may
          terminate or suspend your access to the App if you violate these
          Terms, misuse the App, or at our sole discretion.
        </p>
        <h3>Dispute Resolution and Governing Law</h3>
        <p>
          Any disputes arising out of these Terms will be resolved through
          arbitration in New South Wales. These Terms will be governed by and
          construed in accordance with the laws of New South Wales, Australia.
        </p>
        <h3>Contact Information</h3>
        <p>
          For any questions regarding these Terms, you may contact us at
          talent@neuralle.com.
        </p>
      </div>
    </TypographyStylesProvider>
  );
};
