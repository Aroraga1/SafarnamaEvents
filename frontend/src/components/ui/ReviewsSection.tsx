import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import google from "/other/google.png";
import { Button } from "@/components/ui/button"; // Button component import kiya
// import reviewBg from "../assets/review-bg.png"; // Assuming you save the generated image here

const ReviewsSection = ({ reviews }) => {
  const googleReviewsUrl = google;
  // "https://www.google.com/search?sca_esv=3b7e4dc23e2c7901&sxsrf=AE3TifNCmKmVsbhlJWxHg5gAhfixFfsUgw:1754178652813&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E9kWCvxC6ft2KTaUscJlp8xOssA2jkDTycOHQjArhvGSZasw8jSV0_BHe_D84PT-5f0ZPfy10fE9jRpCaObkuLxvLDCv1H5VO2NbPhetz0N7n8lvhA%3D%3D&q=SafarNama+Events+Reviews&sa=X&ved=2ahUKEwj12eTbqO2OAhUvSWwGHdGfLKsQ0bkNegQIMxAE&biw=1536&bih=838&dpr=1.25";

  return (
    <section className="relative min-w-[80vw] bg-gradient-to-br from-[#2c3e50]/10 to-[#f39c12]/10 p-0 m-0 overflow-hidden">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm" // Adjust opacity and blur as needed
        style={{
          backgroundImage: `url(https://tse2.mm.bing.net/th/id/OIP.jeLg61DVoRDVq5_-i-FyGQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3)`,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#2c3e50]">
            What Adventurers Say
          </h2>
          <p className="text-md text-muted-foreground">
            Real experiences from our amazing community
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center mt-6 mb-6">
          <h2 className="text-2xl font-extrabold text-[#2c3e50] mb-2">
            Share Your Experience with Us also!
          </h2>

          <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4 max-w-md">
            Did you enjoy your adventure with SafarNama Events? Your feedback is
            valuable to us and helps other explorers discover their next great
            journey.
          </p>

          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <a
              href="https://www.google.com/search?sca_esv=340802fe2459afeb&sxsrf=AE3TifPS-ep5P8Uc-pDen0lDVMJ3280QcA:1755333386425&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E9kWCvxC6ft2KTaUscJlp8xOssA2jkDTycOHQjArhvGSZasw8jSV0_BHe_D84PT-5f0ZPfy10fE9jRpCaObkuLxvLDCv1H5VO2NbPhetz0N7n8lvhA%3D%3D&q=SafarNama+Events+Reviews&sa=X&ved=2ahUKEwi6g9e39o6PAxXjTWcHHfFWOy4Q0bkNegQILBAE&biw=1536&bih=838&dpr=1.25"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="adventure" size="lg">
                Write a Review on Google
              </Button>
            </a>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
