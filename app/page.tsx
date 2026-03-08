'use client';

import { useState } from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import {
  Coffee,
  Share2,
  MapPin,
  Camera,
  ArrowRight,
  Globe
} from 'lucide-react';

const socialLinks = [
  { icon: Globe, label: 'Portfolio', isComponent: true },
  { icon: '/icons/github.svg', label: 'GitHub', isComponent: false },
  { icon: '/icons/linkedin.png', label: 'LinkedIn', isComponent: false },
  { icon: '/icons/instagram.svg', label: 'Instagram', isComponent: false },
];

export default function Home() {
  const [amount, setAmount] = useState<string>('15');

  const upiId = 'userupi@upi';
  const payeeName = 'Alex Rivers';

  const amt = parseFloat(amount);
  const validAmount = isNaN(amt) || amt <= 0 ? '' : `&am=${amt.toFixed(2)}`;
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR${validAmount}`;

  const handleAmountClick = (val: string) => {
    setAmount(val);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const openUpiApp = (app: string) => {
    let url = '';
    // For demonstration purposes, using placeholder links to their respective websites
    // In a real mobile environment, these would be deep links (e.g., tez://, phonepe://)
    if (app === 'gpay') {
      url = `https://pay.google.com/about/?amount=${amount}`;
    } else if (app === 'phonepe') {
      url = `https://www.phonepe.com/?amount=${amount}`;
    } else if (app === 'paytm') {
      url = `https://paytm.com/?amount=${amount}`;
    }

    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen relative text-[#111111] selection:bg-[#FFDD00]/30 bg-[#FFFAEB]">
      {/* Background Image Layer with Opacity */}
      <div
        className="absolute inset-0 z-0 bg-[url('/images/bg/bg.svg')] bg-cover bg-fixed bg-center opacity-15"
      ></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 md:px-40 border-b border-[#FFDD00]/20 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Coffee className="w-6 h-6 text-[#FFDD00] fill-[#FFDD00]" />
            <h2 className="text-lg font-bold tracking-tight">Buy me a coffee</h2>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFDD00]/20 hover:bg-[#FFDD00]/30 transition-colors text-sm font-bold">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex justify-center py-8 px-6">
          <div className="w-full max-w-[640px] flex flex-col gap-8">

            {/* Profile Section */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-4 border-white shadow-xl overflow-hidden relative">
                  <Image
                    src="/images/profile/Hero.jpeg"
                    alt="Alex Rivers"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight">Alex Rivers</h1>
                <p className="text-[#6B7280] text-base max-w-md">
                  Crafting meaningful digital experiences through open-source software. Every coffee fuels the next big update.
                </p>
                <div className="flex items-center gap-1.5 text-[#6B7280] text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>Based in Seattle, WA</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-4 gap-4 py-6 border-y border-[#FFDD00]/20">
              {socialLinks.map((social, idx) => {
                const IconComponent = social.isComponent ? social.icon as React.ElementType : null;
                return (
                  <a key={idx} href="#" className="flex flex-col items-center gap-2 group">
                    <div className="p-3 rounded-full bg-[#FFDD00]/10 group-hover:bg-[#FFDD00] transition-colors duration-300 flex items-center justify-center w-12 h-12">
                      {social.isComponent && IconComponent ? (
                        <IconComponent className="w-5 h-5 text-[#111111]" />
                      ) : (
                        <Image src={social.icon as string} alt={social.label} width={20} height={20} className="w-5 h-5 object-contain" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#6B7280]">{social.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Send Support Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#FFDD00]/20 p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Coffee className="w-6 h-6 text-[#FFDD00] fill-[#FFDD00]" />
                  <h3 className="text-xl font-bold">Buy me a coffee</h3>
                </div>
                <p className="text-[#6B7280] text-sm">Choose an amount or enter your own.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[5, 15, 25].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleAmountClick(amt.toString())}
                    className={`py-3 rounded-xl border-2 font-bold transition-all ${amount === amt.toString()
                      ? 'border-[#FFDD00] bg-[#FFDD00] shadow-md shadow-[#FFDD00]/30'
                      : 'border-[#FFDD00]/30 hover:bg-[#FFDD00]/10'
                      }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg text-[#111111]">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter custom amount"
                  className="w-full pl-8 pr-4 py-4 bg-[#F5F5F5] rounded-xl focus:ring-2 focus:ring-[#FFDD00] focus:border-[#FFDD00] font-bold text-lg border-transparent hover:border-[#FFDD00] transition-all outline-none"
                />
              </div>

              <button className="w-full bg-[#FFDD00] hover:bg-[#F2D100] text-[#111111] font-extrabold py-4 rounded-xl shadow-lg shadow-[#FFDD00]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                <span>Proceed to Payment</span>
                <ArrowRight className="w-5 h-5 font-bold" />
              </button>
            </div>

            {/* QR Code & UPI Apps */}
            <div className="bg-[#F5F5F5] rounded-2xl p-8 flex flex-col items-center gap-6 border border-dashed border-[#FFDD00]/40">
              <div className="text-center space-y-4">
                <p className="text-xs font-black uppercase tracking-widest">Scan to Pay</p>
                <div className="bg-white p-4 rounded-xl inline-block shadow-sm">
                  <QRCodeSVG
                    value={upiUrl}
                    size={160}
                    level="H"
                    includeMargin={false}
                    className="rounded-lg"
                  />
                </div>
                {amount && parseFloat(amount) > 0 && (
                  <p className="text-sm font-bold text-[#6B7280]">
                    Amount: ₹{amount}
                  </p>
                )}
              </div>

              <div className="w-full space-y-4">
                <p className="text-[10px] text-center font-bold text-[#6B7280] uppercase tracking-widest">
                  Or use a UPI App
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => openUpiApp('gpay')}
                    className="flex items-center justify-center bg-white px-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-[#E5E5E5] h-12 min-w-[110px]"
                  >
                    <Image src="/icons/gpay.svg" alt="Google Pay" width={80} height={24} className="h-5 w-auto object-contain" />
                  </button>
                  <button
                    onClick={() => openUpiApp('phonepe')}
                    className="flex items-center justify-center bg-white px-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-[#E5E5E5] h-12 min-w-[110px]"
                  >
                    <Image src="/icons/phonepe.svg" alt="PhonePe" width={80} height={24} className="h-5 w-auto object-contain" />
                  </button>
                  <button
                    onClick={() => openUpiApp('paytm')}
                    className="flex items-center justify-center bg-white px-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-[#E5E5E5] h-12 min-w-[110px]"
                  >
                    <Image src="/icons/paytm.svg" alt="Paytm" width={80} height={24} className="h-4 w-auto object-contain" />
                  </button>
                </div>
              </div>
            </div>

            <footer className="mt-8 pt-6 border-t border-black/5 text-center pb-8 flex flex-col gap-2">
              <p className="text-[#9CA3AF] text-xs">
                &copy; {new Date().getFullYear()} Alex Rivers. All rights reserved.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
