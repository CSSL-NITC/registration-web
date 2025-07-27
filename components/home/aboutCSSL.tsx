import React from 'react';
import Image from 'next/image';

const AboutCSSL = () => {
  return (
    <section 
      className="relative pt-16 sm:py-16 px-4 sm:px-6 lg:px-8"
    >
        <div className="absolute inset-0 -z-10">
        <Image
          src="/About_CSSL- BG.png"
          alt="CSSL Awards Background"
          fill
          className="object-cover object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left side - Logo */}
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-64 relative">
              <Image 
                src="/CSSL_logo.png" 
                alt="CSSL Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="md:w-2/3 p-8">
            <h2 className="text-3xl font-bold mb-6 text-[#232c7c]">About CSSL</h2>
            <div className="prose text-gray-700">
              <p className="mb-4 text-[15px]">
                The Computer Society of Sri Lanka (CSSL) is the premier professional association for individuals and Organisations leading the Information Communication Technology (ICT) industry in Sri Lanka.
              </p>
              <p className="mb-4 text-[15px]">
                It is a raining point for ICT professionals throughout the country and espouses the shared vision of over the thousand individuals ranging from over 300 CNOS/ICT practitioners, academics and policy makers to other professionals in diverse fields and members of the business community. Today, the CSSL is widely regarded as both the "voice" of this influential industry segment and a "key player" in ICT development, nationally.
              </p>
              <p className="mb-4 text-[15px]">
                The passion, vision and commitment of the CSSL founders, who foresaw the pivotal role ICT would eventually have in shaping and advancing human life, has left a lasting impression on the minds of Sri Lankan ICT professionals. This has also led to the broad basing of the society's scope and activities, which has enabled CSSL to become the fully-fledged and dynamic professional association that it is today.
              </p>
              <p className="text-[15px]">
                It is also an active member of the South East Asia Regional Computer Confederation (SEAOCP) and the International Federation for Information Processing (IPIP). CSSL is a provisional signatory to the Seoul Accord an internationally acclaimed degree accreditation program through which CSSL brings international standards on ICT related degrees to Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCSSL;