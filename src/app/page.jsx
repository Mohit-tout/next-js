'use client';

import { motion } from "framer-motion";
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
    const redirectUser = () => {
      const role = localStorage.getItem("role");
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken || !role) {
        setLoading(false);
        return;
      }

      const roleRoutes = {
        EMPLOYEE: "/employee/dashboard",
        TEAM_LEADER: "/team-leader/dashboard",
      };

      const targetRoute = roleRoutes[role];

      if (targetRoute) {
        router.replace(targetRoute); // `replace` avoids back-navigation to this page
      } else {
        setLoading(false);
      }
    };

    // Ensure localStorage is accessible
    if (typeof window !== "undefined") {
      redirectUser();
    }
  }, [router]);

  if (loading) return null;

  // 👇 Different animation variants
  const variants = {
    fadeSlideTop: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -80 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    },
    zoomIn: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 80 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    },
    rotateFade: {
      hidden: { opacity: 0, rotate: -10 },
      visible: { opacity: 1, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
    },
    simpleFade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    },
  };

  return (
    <>
      <NavbarComponent />

      <motion.div
        variants={variants.fadeSlideTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <StartLook />
      </motion.div>

      <motion.div
        variants={variants.slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FeatureSection />
      </motion.div>

      <motion.div
        variants={variants.zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <TrustedSection />
      </motion.div>

      <motion.div
        variants={variants.fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Testimonials />
      </motion.div>

      <motion.div
        variants={variants.slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <PricingSection />
      </motion.div>

      <motion.div
        variants={variants.rotateFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <TrialSection />
      </motion.div>

      <motion.div
        variants={variants.simpleFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Footer />
      </motion.div>
    </>
  );
}
