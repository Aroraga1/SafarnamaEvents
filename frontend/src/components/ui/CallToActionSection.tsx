import React from "react";
import { Button } from "@/components/ui/button";

const CallToActionSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#2c3e50] to-[#b85c38] text-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of adventurers who have already discovered incredible
          experiences with Safarnama. Your next unforgettable journey is just
          one click away!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="xl">
            View All Adventures
          </Button>
          <Button variant="outline" size="xl" className="border-orange">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
