'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import {
  Coffee,
  Share2,
  MapPin,
  ArrowRight,
  Globe,
  Check,
  X,
  Link,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const socialLinks = [
  { icon: Globe, label: 'Portfolio', isComponent: true, href: 'https://mr-rohit-7903.github.io/Portfolio-Final/' },
  { icon: '/icons/github.svg', label: 'GitHub', isComponent: false, href: 'https://github.com/mr-rohit-7903' },
  { icon: '/icons/linkedin.png', label: 'LinkedIn', isComponent: false, href: 'https://www.linkedin.com/in/mr-rohit-/' },
  { icon: '/icons/instagram.svg', label: 'Instagram', isComponent: false, href: 'https://www.instagram.com/imrohitbej/' },
];

export default function Home() {
  const [amount, setAmount] = useState<string>('500');
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const upiId = 'rohit098bej-2@oksbi';
  const payeeName = 'Rohit Bej';

  const amt = parseFloat(amount);
  const validAmount = isNaN(amt) || amt <= 0 ? '' : `&am=${amt.toFixed(2)}`;
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR${validAmount}`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAmountClick = (val: string) => {
    setAmount(val);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const openUpiApp = (app?: 'gpay' | 'phonepe' | 'paytm') => {
    if (!isMobile) {
      scrollToQR();
      return;
    }

    const packages = {
      gpay: 'com.google.android.apps.nbu.paisa.user',
      phonepe: 'com.phonepe.app',
      paytm: 'net.one97.paytm'
    };

    const isAndroid = /Android/i.test(navigator.userAgent);

    if (app && isAndroid) {
      // Use Android Intent to target specific apps with Play Store fallback
      const packageName = packages[app];
      // Extract parameters from upiUrl starting after 'upi://pay'
      const params = upiUrl.split('upi://pay')[1];
      const intentUrl = `intent://pay${params}#Intent;scheme=upi;package=${packageName};S.browser_fallback_url=${encodeURIComponent('https://play.google.com/store/apps/details?id=' + packageName)};end`;

      window.location.assign(intentUrl);
    } else {
      // Generic deep link for iOS or when no specific app is selected
      // This will open the system's payment app chooser
      window.location.assign(upiUrl);
    }
  };

  const deploymentUrl = 'https://buy-me-a-coffee-peach.vercel.app/';
  const shareText = 'Support Rohit by buying him a coffee!';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Buy Rohit Bej a Coffee',
          text: shareText,
          url: deploymentUrl,
        });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }
    setShowShareMenu((prev) => !prev);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(deploymentUrl);
      setCopied(true);
      setTimeout(() => { setCopied(false); setShowShareMenu(false); }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target as Node)) {
        setShowShareMenu(false);
      }
    };
    if (showShareMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showShareMenu]);

  const sharePlatforms = [
    { name: 'WhatsApp', icon: '/icons/whatsapp.svg', url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + deploymentUrl)}` },
    { name: 'Twitter / X', icon: '/icons/x.svg', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(deploymentUrl)}` },
    { name: 'LinkedIn', icon: '/icons/linkedin.png', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(deploymentUrl)}` },
    { name: 'Facebook', icon: '/icons/facebook.svg', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(deploymentUrl)}` },
    { name: 'Telegram', icon: '/icons/telegram.svg', url: `https://t.me/share/url?url=${encodeURIComponent(deploymentUrl)}&text=${encodeURIComponent(shareText)}` },
  ];

  const scrollToQR = () => {
    qrRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        <header className="flex items-center justify-between px-6 py-4 md:px-40 border-b border-[#FFDD00]/20 bg-white/50 backdrop-blur-sm relative z-50">
          <div className="flex items-center gap-3">
            <Coffee className="w-6 h-6 text-[#FFDD00] fill-[#FFDD00]" />
            <h2 className="text-lg font-bold tracking-tight">Buy me a coffee</h2>
          </div>
          <div className="relative" ref={shareMenuRef}>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFDD00]/20 hover:bg-[#FFDD00]/30 transition-colors text-sm font-bold"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-black/10 overflow-hidden z-[100]"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-black/5">
                    <span className="text-sm font-bold">Share via</span>
                    <button onClick={() => setShowShareMenu(false)} className="p-1 rounded-full hover:bg-black/5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="py-1">
                    {sharePlatforms.map((platform) => (
                      <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowShareMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFDD00]/10 transition-colors text-sm"
                      >
                        <Image src={platform.icon} alt={platform.name} width={18} height={18} className="w-[18px] h-[18px] object-contain" />
                        <span className="font-medium">{platform.name}</span>
                      </a>
                    ))}
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFDD00]/10 transition-colors text-sm w-full border-t border-black/5"
                    >
                      {copied ? (
                        <><Check className="w-4 h-4 text-green-600" /><span className="font-medium text-green-600">Copied!</span></>
                      ) : (
                        <><Copy className="w-4 h-4 text-[#6B7280]" /><span className="font-medium">Copy link</span></>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex justify-center py-8 px-6">
          <div className="w-full max-w-[640px] flex flex-col gap-8">

            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-48 h-48 rounded-full border-4 border-white shadow-xl overflow-hidden relative"
                >
                  <Image
                    src="/images/profile/Hero.jpeg"
                    alt="Rohit Bej"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight">Rohit Bej</h1>
                <p className="text-[#6B7280] text-base max-w-md">
                  Mechanical Engineering undergraduate at IIT Kharagpur who enjoys building software. Exploring the intersection of full-stack development, AI, automation, and system design.
                </p>
                <div className="flex items-center gap-1.5 text-[#6B7280] text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>Based in Jamshedpur, India</span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="grid grid-cols-4 gap-4 py-6 border-y border-[#FFDD00]/20"
            >
              {socialLinks.map((social, idx) => {
                const IconComponent = social.isComponent ? social.icon as React.ElementType : null;
                return (
                  <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
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
            </motion.div>

            {/* Send Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-[#FFDD00]/20 p-6 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Coffee className="w-6 h-6 text-[#FFDD00] fill-[#FFDD00]" />
                  <h3 className="text-xl font-bold">Buy me a coffee</h3>
                </div>
                <p className="text-[#6B7280] text-sm">Choose an amount or enter your own.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[500, 1000, 1500].map((amt) => (
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

              <motion.button
                onClick={() => isMobile ? openUpiApp() : scrollToQR()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#FFDD00] hover:bg-[#F2D100] text-[#111111] font-extrabold py-4 rounded-xl shadow-lg shadow-[#FFDD00]/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>{isMobile ? 'Pay Now via UPI' : 'Proceed to Payment'}</span>
                <ArrowRight className="w-5 h-5 font-bold" />
              </motion.button>
            </motion.div>

            {/* QR Code & UPI Apps */}
            <motion.div
              ref={qrRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="bg-[#F5F5F5] rounded-2xl p-8 flex flex-col items-center gap-6 border border-dashed border-[#FFDD00]/40 scroll-mt-20"
            >
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
            </motion.div>

            <footer className="mt-8 pt-6 border-t border-black/5 text-center pb-8 flex flex-col gap-2">
              <p className="text-[#9CA3AF] text-xs">
                &copy; {new Date().getFullYear()} Rohit Bej. All rights reserved.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
