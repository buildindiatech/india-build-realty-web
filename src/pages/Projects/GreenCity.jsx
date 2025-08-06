import React from "react";
import Nav from "../../components/Nav/Nav";
import ProjectHero from "../../components/ProjectHero/ProjectHero";
import ImpactSection from "../../components/ImpactSection/ImpactSection";
import VisionSection from "../../components/VisionSection/VisionSection";
import TabsSection from "../../components/TabsSection/TabsSection";
import FutureHomeSectionProject from "../../components/FutureHomeSectionProject/FutureHomeSectionProject";
import BigVideoSection from "../../components/BigVideoSection/BigVideoSection";
import DarkFooterSection from "../../components/DarkFooterSection/DarkFooterSection";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// Import JSON data
import projectHeroData from "../../data/GreenCity/projectHero.json";
import impactData from "../../data/GreenCity/impactSection.json";
import visionData from "../../data/GreenCity/visionSection.json";
import tabsData from "../../data/GreenCity/tabsSection.json";
import futureHomeData from "../../data/GreenCity/futureHomeSection.json";
import futureHomeData2 from "../../data/GreenCity/futureHomeSection2.json";
import bigVideoData from "../../data/GreenCity/bigVideoSection.json";
import navData from "../../data/shared/nav.json";
import AmenitiesSection from "../../components/AmenitiesSection";

const CAMPAIGN_ID = "689325dd1aac8cd621416efc";

function GreenCity() {
  return (
    <>
      <a
        href="https://wa.me/+919898339903"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon sx={{ fontSize: 28 }} />
      </a>
      <Nav data={navData} />
      <ProjectHero data={projectHeroData} />
      <ImpactSection data={impactData} />
      <VisionSection data={visionData} />
      <TabsSection data={tabsData} />
      <AmenitiesSection />
      <div className="lg:my-10">
        <FutureHomeSectionProject data={futureHomeData} />
      </div>
      <BigVideoSection data={bigVideoData} campaignId={CAMPAIGN_ID} />
      <section
        className="footer-wrapper lg:pt-20 dark-footer-wrapper   "
        id="contact"
      >
        <DarkFooterSection />
      </section>
    </>
  );
}

export default GreenCity;
