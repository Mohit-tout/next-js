'use client'

import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import StartLook from "@/components/StarLook";
import Testimonials from "@/components/Testimonials";
import TrialSection from "@/components/TrialSection";
import TrustedSection from "@/components/TrustedSection";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const accessToken = localStorage.getItem("accessToken");

    if (role && accessToken) {
      router.push("/admin/dashboard");
    } else {
      setLoading(false); // Show the home page if role is not set
    }
  }, [router]);

  if (loading) {
    return null; // Prevents flashing of home page before redirection
  }

  return (
    <>
      <NavbarComponent />
      <StartLook />
      <FeatureSection />
      <TrustedSection />
      <Testimonials />
      <PricingSection />
      <TrialSection />
      <Footer />
    </>
  );
}
